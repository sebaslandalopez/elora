/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ContactForm } from './ContactForm'
import './styles.css'

const toasts = [
  ['Títulos sin optimizar', 'Sin keywords ni jerarquías comerciales visibles'],
  ['Optimización pobre', 'Tu tienda no es posicionada entre los buscadores'],
  ['Errores frecuentes en marketplace', 'Baja conversión, productos invisibles'],
  ['Imágenes que no convierten', 'Sin estructura visual ni criterios técnicos'],
  ['Textos incongruentes', 'Títulos sin redacción estratégica ni keywords'],
  ['Inconsistencia entre canales', 'Información diferente en cada canal'],
]
const defaultVideoUrl = 'https://www.youtube.com/embed/d020hcWA_Wg?si=1fJ_qUsLsEH4Hwjt'
const problemIconUrl =
  'https://www.figma.com/api/mcp/asset/583ce012-d782-4cbc-8590-f9ba94b0d033.svg'
const socialIconUrls = {
  whatsapp: 'https://www.figma.com/api/mcp/asset/f1ab431e-c79e-43a6-ba3e-fa53997b4d4c.svg',
  linkedin: 'https://www.figma.com/api/mcp/asset/6163fffc-71a7-4deb-8361-f6251e67fa59.svg',
  email: 'https://www.figma.com/api/mcp/asset/cb7b3fb9-9021-4c68-9e92-b419415cfd12.svg',
}
const themeIconUrl = 'https://www.figma.com/api/mcp/asset/0d11d30d-b85c-4085-bb9b-3d63695f09cd.png'
const brandBadges = [
  {
    name: 'Falabella',
    src: 'https://www.figma.com/api/mcp/asset/07650ac9-b2d1-4893-ab34-a5d5ac48b768.png',
    className: 'brand-badge falabella',
  },
  {
    name: 'Shopify',
    src: 'https://www.figma.com/api/mcp/asset/41c90134-24ae-4d48-8361-a2e2cc2f76f2.png',
    className: 'brand-badge shopify',
  },
  {
    name: 'WooCommerce',
    src: 'https://www.figma.com/api/mcp/asset/b0a25de0-3b4c-4cec-9ffd-dcb59005c938.png',
    className: 'brand-badge woocommerce',
  },
  {
    name: 'Mercado Libre',
    src: 'https://www.figma.com/api/mcp/asset/fff6ef8e-91fc-4a0c-bcaf-f0c1c40f579b.png',
    className: 'brand-badge mercado-libre',
  },
]

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const home = await payload.findGlobal({ slug: 'home', depth: 1 })

  const phoneImages =
    home.phoneImages
      ?.map((row) => {
        if (typeof row.image !== 'object' || !row.image?.url) return null

        return {
          src: row.image.url,
          alt: row.image.alt,
        }
      })
      .filter((item): item is { src: string; alt: string } => item !== null) ?? []

  const heroTitle = home.heroTitle?.trim() || 'Optimizamos tus'
  const heroTitleAccent = home.heroTitleAccent?.trim() || 'catálogos'
  const heroTitleSecondLine = home.heroTitleSecondLine?.trim() || 'para escalar tus ventas'
  const heroSubtitle =
    home.heroSubtitle?.trim() ||
    'Elevamos tus productos a estándares competitivos y los preparamos para escalar con éxito en Shopify y en los principales marketplaces de la región. De un catálogo desordenado, a un activo estratégico.'
  const videoUrl = home.videoUrl?.trim() || defaultVideoUrl
  return (
    <main>
      <section className="hero" id="inicio">
        <nav className="nav container">
          <a className="brand" href="#inicio">
            Elora
          </a>
          <div className="nav-links">
            <a href="#inicio">Inicio</a>
            <a href="#servicios">Servicios</a>
            <a href="#contacto">Contacto</a>
            <a className="nav-cta" href="#contacto">
              Agendar una llamada
            </a>
          </div>
          <div aria-label="Selector de tema" className="theme-toggle">
            <span className="theme-toggle-thumb">
              <Image src={themeIconUrl} alt="" width={18} height={18} unoptimized />
            </span>
          </div>
        </nav>
        <div className="hero-content container">
          <div>
            <h1>
              {heroTitle} <em>{heroTitleAccent}</em>
              <br />
              {heroTitleSecondLine}
            </h1>
            <p>{heroSubtitle}</p>
            <a className="button primary" href="#contacto">
              ¡Agendar diagnóstico!
            </a>
          </div>
        </div>
      </section>
      <section className="phone-strip" aria-label="Catálogos optimizados">
        {phoneImages.map(({ src, alt }) => (
          <div className="phone" key={src}>
            <Image alt={alt} src={src} width={210} height={425} />
          </div>
        ))}
        {brandBadges.map(({ name, src, className }) => (
          <div className={className} key={name}>
            <Image alt={name} src={src} width={168} height={168} unoptimized />
          </div>
        ))}
      </section>
      <section className="problem section container">
        <div className="toast-cloud">
          {toasts.map(([title, message]) => (
            <div className="toast" key={title}>
              <Image alt="" height={24} src={problemIconUrl} unoptimized width={24} />
              <span>
                <strong>{title}</strong>
                {message}
              </span>
            </div>
          ))}
        </div>
        <div className="section-heading">
          <h2>
            La mayoría de los catálogos
            <br />
            <em>no están preparados para vender</em>
          </h2>
          <p>
            Por eso existe <strong>ELORA</strong>.
          </p>
        </div>
      </section>
      <section className="video-section section" aria-label="Video de Elora">
        <div className="video-placeholder">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            src={videoUrl}
            title="Video de Elora"
          />
        </div>
      </section>
      <section className="services section container" id="servicios">
        <div className="section-copy">
          <span className="eyebrow">Servicios</span>
          <h2>Convertimos tu catálogo en un activo que genera ventas.</h2>
          <p>
            Estructuramos tu producto para que se entienda rápido, se compare fácil y se venda mejor
            en cualquier canal.
          </p>
        </div>
        <div className="service-cards">
          <article className="service-card vertical">
            <span>Diagnóstico profundo de catálogo</span>
          </article>
          <article className="service-card featured">
            <span className="eyebrow light">Servicio completo</span>
            <h3>Upgrade de Catálogo</h3>
            <p>
              Rediseñamos todas tus fichas con estructura técnica, copy estratégico y lógica
              comercial detrás de cada elemento.
            </p>
            <strong>Precio: Por volumen de SKU</strong>
            <a className="button light-button" href="#contacto">
              Solicitar propuesta
            </a>
          </article>
          <article className="service-card vertical second">
            <span>Imágenes que convierten</span>
          </article>
        </div>
      </section>
      <section className="calendar-section section container">
        <div className="calendar-brand">Elora</div>
        <div className="calendar-copy">
          <span className="eyebrow light">Agenda</span>
          <h2>Evalúa si tu catálogo está listo para escalar</h2>
          <p>
            Revisamos cómo están construidos tus productos, detectamos los puntos críticos y te
            explicamos cómo mejorarlos.
          </p>
          <a className="button light-button" href="#contacto">
            Solicita tu diagnóstico gratuito
          </a>
          <small>Resultados en 48 horas</small>
        </div>
      </section>
      <section className="contact section container" id="contacto">
        <div className="section-copy">
          <span className="eyebrow">Contacto</span>
          <h2>Cuéntanos sobre tu proyecto</h2>
          <p>
            Si estás listo para dejar de simplemente “cargar productos” y empezar a “lanzar con
            estrategia”, llena este formulario. Nuestro equipo se pondrá en contacto para explorar
            cómo podemos ayudarte a competir.
          </p>
        </div>
        <ContactForm />
      </section>
      <footer>
        <a className="brand" href="#inicio">
          Elora
        </a>
        <div className="social-links" aria-label="Redes sociales">
          <button type="button" aria-label="WhatsApp">
            <img src={socialIconUrls.whatsapp} alt="" />
          </button>
          <button type="button" aria-label="LinkedIn">
            <img src={socialIconUrls.linkedin} alt="" />
          </button>
          <button type="button" aria-label="Correo electrónico">
            <img src={socialIconUrls.email} alt="" />
          </button>
        </div>
        <p>©2026 Elora. Todos los derechos reservados.</p>
      </footer>
    </main>
  )
}
