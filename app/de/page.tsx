import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import InboxGeneratorWrapper from '../components/InboxGeneratorWrapper'
import StructuredData, { ServiceStructuredData } from '../components/StructuredData'
import { StatCard, BenefitCard, ProcessStep } from '../components/VisualElements'

export const metadata: Metadata = {
  title: 'Kostenloser E-Mail Generator - OneTimeEmail | Temporäre & Wegwerf-E-Mail-Adressen',
  description: 'Erstellen Sie sofort temporäre und Wegwerf-E-Mail-Adressen. Perfekt für Online-Registrierungen, Datenschutz und Spam-Schutz. Keine Registrierung erforderlich.',
  keywords: [
    'temporäre E-Mail',
    'Wegwerf-E-Mail',
    'E-Mail Generator',
    'Temp Mail',
    'anonyme E-Mail',
    'Datenschutz E-Mail',
    'Spam-Schutz',
    'E-Mail Verifizierung',
    'temporäres Postfach',
    'Einweg-E-Mail'
  ],
  alternates: {
    canonical: 'https://onetimeemail.net/de/',
    languages: {
      'de': 'https://onetimeemail.net/de/',
      'en': 'https://onetimeemail.net/',
    },
  },
  openGraph: {
    title: 'Kostenloser E-Mail Generator - OneTimeEmail',
    description: 'Erstellen Sie sofort temporäre und Wegwerf-E-Mail-Adressen. Perfekt für Online-Registrierungen, Datenschutz und Spam-Schutz.',
    url: 'https://onetimeemail.net/de/',
    siteName: 'OneTimeEmail',
    type: 'website',
    locale: 'de_DE',
    images: [
      {
        url: 'https://onetimeemail.net/og-image-de.jpg',
        width: 1200,
        height: 630,
        alt: 'OneTimeEmail - Kostenloser temporärer E-Mail Generator',
      },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3B82F6',
}

export default function GermanHomePage() {
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
              <span className="text-sm text-blue-600 font-semibold px-2 py-1 bg-blue-100 rounded">DE</span>
              <Link href="/es" className="text-sm text-gray-600 hover:text-blue-600 px-2 py-1 rounded">ES</Link>
              <Link href="/fr" className="text-sm text-gray-600 hover:text-blue-600 px-2 py-1 rounded">FR</Link>
            </div>
          </div>

          {/* Hero Section */}
          <header className="mb-12 md:mb-20">
            <div className="text-center mb-8 md:mb-10">
              {/* Main Header Content */}
              <div className="relative mb-8">
                {/* Blog Button */}
                <div className="absolute top-0 right-0 hidden md:block">
                  <Link 
                    href="/de/blog"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    <span className="text-lg">📚</span>
                    <span>Datenschutz Blog</span>
                  </Link>
                </div>
                
                {/* Main Content Row */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                  <div className="text-6xl md:text-8xl" role="img" aria-label="E-Mail Symbol">📧</div>
                  <div className="text-center md:text-left">
                    <p className="text-lg md:text-xl text-blue-600 font-semibold">
                      Experteneinblicke in E-Mail-Datenschutz und Sicherheit
                    </p>
                    {/* Mobile Blog Button */}
                    <div className="md:hidden mt-4">
                      <Link 
                        href="/de/blog"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        <span className="text-lg">📚</span>
                        <span>Datenschutz Blog</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Kostenloser E-Mail Generator - OneTimeEmail
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 px-4">
                Erstellen Sie sofort temporäre & Wegwerf-E-Mail-Adressen. Perfekt für Verifizierung, Datenschutz und Spam-Schutz.
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
              Warum OneTimeEmail wählen?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <article className="ios-safe-card bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="text-3xl md:text-5xl mb-4 md:mb-6 h-12 md:h-16 flex items-center justify-start" role="img" aria-label="Benutzer Symbol">👤</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Intelligente Identitätsverwaltung</h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">Erleben Sie nahtlose Identitätsverwaltung mit unserem intelligenten System, das dasselbe Postfach in allen Ihren Browser-Tabs aufrechterhält. Dies eliminiert Verwirrung und verhindert die Notwendigkeit, mehrere temporäre E-Mail-Adressen gleichzeitig zu verwalten.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Konsistente Postfach-Erfahrung über Tabs hinweg</li>
                  <li>• Keine Notwendigkeit, mehrere Adressen zu merken</li>
                  <li>• Vereinfachter Workflow für mehrere Anmeldungen</li>
                </ul>
              </article>
              
              <article className="ios-safe-card bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="text-3xl md:text-5xl mb-4 md:mb-6 h-12 md:h-16 flex items-center justify-start" role="img" aria-label="Löschen Symbol">🗑️</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Automatischer Datenschutz</h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">Unsere erweiterte Auto-Lösch-Funktion stellt sicher, dass alle E-Mails und zugehörigen Daten nach genau 10 Minuten automatisch von unseren Servern entfernt werden. Dieser umfassende Ansatz zum Datenschutz garantiert, dass keine Restinformationen verbleiben.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• 10-minütiges automatisches Ablaufen</li>
                  <li>• Vollständige Datenentfernung von Servern</li>
                  <li>• Keine manuelle Bereinigung erforderlich</li>
                </ul>
              </article>
              
              <article className="ios-safe-card bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="text-3xl md:text-5xl mb-4 md:mb-6 h-12 md:h-16 flex items-center justify-start" role="img" aria-label="Schloss Symbol">🔒</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Unternehmensklasse Datenschutz</h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">Wir verwenden eine Zero-Tracking-, Zero-Data-Collection-Richtlinie, die sicherstellt, dass Ihre temporäre E-Mail-Nutzung vollständig anonym bleibt. Im Gegensatz zu herkömmlichen E-Mail-Diensten arbeitet OneTimeEmail mit einem datenschutzorientierten Modell.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Keine Benutzerverfolgung oder Analyse</li>
                  <li>• Keine Datensammlung oder Profilerstellung</li>
                  <li>• Vollständige Anonymität garantiert</li>
                </ul>
              </article>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Bereit, Ihre Privatsphäre zu schützen?</h3>
              <p className="text-blue-100 mb-6 text-sm md:text-base">Schließen Sie sich Tausenden von Benutzern an, die OneTimeEmail für ihre Online-Datenschutzbedürfnisse vertrauen</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>100% Kostenlos für immer</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Keine Registrierung erforderlich</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Sofortiger Zugang</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
