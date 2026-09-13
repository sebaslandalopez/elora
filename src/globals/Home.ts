import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  admin: {
    group: 'Contenido',
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      label: 'Título principal',
      defaultValue: 'Optimizamos tus',
    },
    {
      name: 'heroTitleAccent',
      type: 'text',
      label: 'Palabra destacada del título',
      defaultValue: 'catálogos',
    },
    {
      name: 'heroTitleSecondLine',
      type: 'text',
      label: 'Segunda línea del título',
      defaultValue: 'para escalar tus ventas',
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      label: 'Subtítulo principal',
      defaultValue:
        'Elevamos tus productos a estándares competitivos y los preparamos para escalar con éxito en Shopify y en los principales marketplaces de la región. De un catálogo desordenado, a un activo estratégico.',
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'URL del video',
      admin: {
        description: 'Link de embed del video de YouTube mostrado en la página principal.',
      },
    },
    {
      name: 'phoneImages',
      type: 'array',
      label: 'Imágenes de teléfonos',
      admin: {
        description:
          'Imágenes de catálogos mostradas en la franja de teléfonos de la página principal.',
      },
      minRows: 0,
      maxRows: 10,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
