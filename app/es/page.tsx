import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import InboxGeneratorWrapper from '../components/InboxGeneratorWrapper'
import StructuredData, { ServiceStructuredData } from '../components/StructuredData'
import { StatCard, BenefitCard, ProcessStep } from '../components/VisualElements'

export const metadata: Metadata = {
  title: 'Generador de Email Gratuito - OneTimeEmail | Direcciones de Email Temporales y Desechables',
  description: 'Crea direcciones de email temporales y desechables al instante. Perfecto para registros en línea, protección de privacidad y prevención de spam. Sin registro requerido.',
  keywords: [
    'email temporal',
    'email desechable',
    'generador de email',
    'correo temporal',
    'email anónimo',
    'privacidad email',
    'protección spam',
    'verificación email',
    'buzón temporal',
    'email de un solo uso'
  ],
  alternates: {
    canonical: 'https://onetimeemail.net/es/',
    languages: {
      'es': 'https://onetimeemail.net/es/',
      'en': 'https://onetimeemail.net/',
    },
  },
  openGraph: {
    title: 'Generador de Email Gratuito - OneTimeEmail',
    description: 'Crea direcciones de email temporales y desechables al instante. Perfecto para registros en línea, protección de privacidad y prevención de spam.',
    url: 'https://onetimeemail.net/es/',
    siteName: 'OneTimeEmail',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: 'https://onetimeemail.net/og-image-es.jpg',
        width: 1200,
        height: 630,
        alt: 'OneTimeEmail - Generador de Email Temporal Gratuito',
      },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3B82F6',
}

export default function SpanishHomePage() {
  return (
    <>
      <StructuredData type="website" data={{}} />
      <ServiceStructuredData />

      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Language Switcher */}
          <div className="flex justify-end mb-4">
            <div className="flex gap-2">
              <Link href="/" className="text-sm text-gray-600 hover:text-blue-600 px-2 py-1 rounded">EN</Link>
              <Link href="/de" className="text-sm text-gray-600 hover:text-blue-600 px-2 py-1 rounded">DE</Link>
              <span className="text-sm text-blue-600 font-semibold px-2 py-1 bg-blue-100 rounded">ES</span>
              <Link href="/fr" className="text-sm text-gray-600 hover:text-blue-600 px-2 py-1 rounded">FR</Link>
            </div>
          </div>

          {/* Hero Section */}
          <header className="mb-12 md:mb-20">
            <div className="text-center mb-8 md:mb-10">
              <div className="text-4xl md:text-8xl mb-4 md:mb-6 h-16 md:h-24 flex items-center justify-center" role="img" aria-label="Icono de email">📧</div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Generador de Email Gratuito - OneTimeEmail
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 px-4">
                Crea direcciones de email temporales y desechables al instante. Perfecto para verificación, protección de privacidad y prevención de spam.
              </p>
            </div>

            {/* Main CTA */}
            <div className="flex justify-center">
              <InboxGeneratorWrapper />
            </div>
          </header>

          {/* Features Section */}
          <section className="mb-12 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12">
              ¿Por qué elegir OneTimeEmail?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <article className="ios-safe-card bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="text-3xl md:text-5xl mb-4 md:mb-6 h-12 md:h-16 flex items-center justify-start" role="img" aria-label="Icono de usuario">👤</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Gestión Inteligente de Identidad</h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">Experimenta una gestión de identidad perfecta con nuestro sistema inteligente que mantiene la misma bandeja de entrada en todas las pestañas de tu navegador. Esto elimina la confusión y evita la necesidad de gestionar múltiples direcciones de email temporales simultáneamente.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Experiencia consistente de bandeja de entrada</li>
                  <li>• No necesitas recordar múltiples direcciones</li>
                  <li>• Flujo de trabajo simplificado</li>
                </ul>
              </article>
              
              <article className="ios-safe-card bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="text-3xl md:text-5xl mb-4 md:mb-6 h-12 md:h-16 flex items-center justify-start" role="img" aria-label="Icono de eliminar">🗑️</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Protección Automática de Datos</h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">Nuestra función avanzada de auto-eliminación asegura que todos los emails y datos asociados sean automáticamente removidos de nuestros servidores después de exactamente 10 minutos. Este enfoque integral de protección de datos garantiza que no quede información residual.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Expiración automática de 10 minutos</li>
                  <li>• Eliminación completa de datos del servidor</li>
                  <li>• No se requiere limpieza manual</li>
                </ul>
              </article>
              
              <article className="ios-safe-card bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="text-3xl md:text-5xl mb-4 md:mb-6 h-12 md:h-16 flex items-center justify-start" role="img" aria-label="Icono de candado">🔒</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Privacidad de Nivel Empresarial</h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">Empleamos una política de cero seguimiento y cero recopilación de datos que asegura que tu uso de email temporal permanezca completamente anónimo. A diferencia de los servicios de email tradicionales, OneTimeEmail opera con un modelo que prioriza la privacidad.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Sin seguimiento de usuarios o análisis</li>
                  <li>• Sin recopilación de datos o perfiles</li>
                  <li>• Anonimato completo garantizado</li>
                </ul>
              </article>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">¿Listo para Proteger tu Privacidad?</h3>
              <p className="text-blue-100 mb-6 text-sm md:text-base">Únete a miles de usuarios que confían en OneTimeEmail para sus necesidades de privacidad en línea</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>100% Gratuito para Siempre</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Sin Registro Requerido</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Acceso Instantáneo</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
