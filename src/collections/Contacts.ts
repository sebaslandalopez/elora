import type { CollectionConfig, PayloadRequest } from 'payload'

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const MAX_TRACKED_CLIENTS = 10_000

const contactAttempts = new Map<string, number[]>()

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ||
      character,
  )
}

setInterval(() => {
  const now = Date.now()

  for (const [key, timestamps] of contactAttempts) {
    const recentTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
    )

    if (recentTimestamps.length === 0) {
      contactAttempts.delete(key)
    } else {
      contactAttempts.set(key, recentTimestamps)
    }
  }
}, RATE_LIMIT_WINDOW_MS).unref()

function clientAddress(req: PayloadRequest) {
  const forwardedFor = req.headers.get('x-forwarded-for')
  const forwarded = forwardedFor?.split(',')[0]?.trim()

  if (forwarded) return forwarded

  return req.headers.get('x-real-ip')?.trim() || 'unknown'
}

function allowContactSubmission(req: PayloadRequest) {
  const requestKey = clientAddress(req)
  const now = Date.now()
  const recentAttempts = (contactAttempts.get(requestKey) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  )

  if (recentAttempts.length >= RATE_LIMIT_MAX) {
    return false
  }

  if (contactAttempts.size >= MAX_TRACKED_CLIENTS && !contactAttempts.has(requestKey)) {
    const oldestKey = contactAttempts.keys().next().value

    if (oldestKey !== undefined) {
      contactAttempts.delete(oldestKey)
    }
  }

  recentAttempts.push(now)
  contactAttempts.set(requestKey, recentAttempts)
  return true
}

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation !== 'create') return doc

        try {
          await req.payload.sendEmail({
            to: doc.email,
            subject: 'Recibimos tu consulta en Elora',
            html: `
              <h1>Gracias por contactarnos, ${escapeHtml(doc.name)}.</h1>
              <p>Recibimos correctamente tu consulta sobre: <strong>${escapeHtml(doc.subject)}</strong>.</p>
              <p>Nuestro equipo revisará tu mensaje y se pondrá en contacto contigo pronto.</p>
              <p>Elora</p>
            `,
            text: `Gracias por contactarnos, ${doc.name}. Recibimos correctamente tu consulta sobre: ${doc.subject}. Nuestro equipo revisará tu mensaje y se pondrá en contacto contigo pronto. Elora`,
          })
        } catch (error) {
          req.payload.logger.error({ err: error, msg: 'Could not send contact confirmation email' })
        }

        return doc
      },
    ],
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'subject', 'createdAt'],
  },
  access: {
    create: ({ req }) => allowContactSubmission(req),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'subject', type: 'text', required: true },
    { name: 'message', type: 'textarea', required: true },
    { name: 'consent', type: 'checkbox', required: true },
  ],
}
