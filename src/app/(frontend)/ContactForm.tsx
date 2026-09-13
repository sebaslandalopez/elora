'use client'

import { FormEvent, useState } from 'react'

type FormState = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormState('sending')
    const form = event.currentTarget
    const formData = new FormData(form)
    const response = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        consent: formData.get('consent') === 'on',
      }),
    })

    if (!response.ok) {
      setFormState('error')
      return
    }

    form.reset()
    setFormState('success')
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Nombre y apellido
        <input name="name" placeholder="Ej. Juan Pérez" required />
      </label>
      <label>
        Email
        <input name="email" type="email" placeholder="Ej. juan@mail.com" required />
      </label>
      <label>
        Asunto
        <input name="subject" placeholder="Ej. Necesito ayuda" required />
      </label>
      <label>
        Mensaje
        <textarea name="message" placeholder="Escribe tu mensaje" required />
      </label>
      <label className="consent">
        <input name="consent" type="checkbox" required />
        <span>
          He leído y acepto la <a href="#privacy">Política de Privacidad</a> y autorizo el
          tratamiento de mis datos personales para gestionar mi consulta.
        </span>
      </label>
      <button disabled={formState === 'sending'} type="submit">
        {formState === 'sending' ? 'Enviando...' : '¡Quiero empezar!'}
      </button>
      {formState === 'success' && (
        <p className="form-message success">Gracias. Te contactaremos pronto.</p>
      )}
      {formState === 'error' && (
        <p className="form-message error">No pudimos guardar tu mensaje. Inténtalo de nuevo.</p>
      )}
    </form>
  )
}
