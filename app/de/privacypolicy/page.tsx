import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { generateAdvancedViewport } from '../../components/AdvancedSEO'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung - OneTimeEmail',
  description: 'Datenschutzerklärung für OneTimeEmail temporäre E-Mail-Service. Verstehen Sie, wie wir Ihre Privatsphäre schützen und Ihre Daten verwalten.',
  alternates: {
    canonical: 'https://onetimeemail.net/de/privacypolicy',
    languages: {
      'de': 'https://onetimeemail.net/de/privacypolicy',
      'en': 'https://onetimeemail.net/privacy',
    },
  },
}

export const viewport: Viewport = generateAdvancedViewport()

export default function GermanPrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <div className="flex gap-2">
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 px-2 py-1 rounded">EN</Link>
            <span className="text-sm text-blue-600 font-semibold px-2 py-1 bg-blue-100 rounded">DE</span>
            <Link href="/es/privacypolicy" className="text-sm text-gray-600 hover:text-blue-600 px-2 py-1 rounded">ES</Link>
            <Link href="/fr/privacypolicy" className="text-sm text-gray-600 hover:text-blue-600 px-2 py-1 rounded">FR</Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Datenschutzerklärung
            </h1>
            <p className="text-gray-600">Letzte Aktualisierung: Januar 2025</p>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Einführung</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Bei OneTimeEmail nehmen wir Ihre Privatsphäre sehr ernst. Diese Datenschutzerklärung erklärt, wie wir Informationen sammeln, verwenden und schützen, wenn Sie unseren temporären E-Mail-Service nutzen.
              </p>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-green-800 font-medium">
                  🔒 Unser Grundsatz: Wir sammeln keine persönlichen Daten und verfolgen keine Benutzeraktivitäten.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Datensammlung</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Was wir NICHT sammeln:</h3>
                  <ul className="text-blue-800 space-y-1 text-sm">
                    <li>• Persönliche Identifikationsinformationen</li>
                    <li>• IP-Adressen oder Standortdaten</li>
                    <li>• Browser-Fingerprints oder Tracking-Cookies</li>
                    <li>• E-Mail-Inhalte nach Ablauf</li>
                    <li>• Nutzungsstatistiken oder Verhaltensdaten</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-2">Temporäre Daten (10 Minuten):</h3>
                  <ul className="text-yellow-800 space-y-1 text-sm">
                    <li>• Temporäre E-Mail-Adressen (automatisch gelöscht)</li>
                    <li>• Eingehende E-Mail-Inhalte (automatisch gelöscht)</li>
                    <li>• Session-Daten für Funktionalität (automatisch gelöscht)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. DSGVO-Compliance</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Als europäischer Service sind wir vollständig DSGVO-konform. Unsere Datenschutz-durch-Design-Architektur stellt sicher, dass Ihre Rechte automatisch geschützt werden.
              </p>
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2">Ihre DSGVO-Rechte:</h3>
                <ul className="text-purple-800 space-y-1 text-sm">
                  <li>• Recht auf Information (automatisch erfüllt)</li>
                  <li>• Recht auf Löschung (automatisch nach 10 Minuten)</li>
                  <li>• Recht auf Datenübertragbarkeit (nicht anwendbar)</li>
                  <li>• Recht auf Widerspruch (jederzeit möglich)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Kontakt</h2>
              <p className="text-gray-700 leading-relaxed">
                Bei Fragen zu dieser Datenschutzerklärung kontaktieren Sie uns über unsere <Link href="/de/contact" className="text-blue-600 hover:text-blue-800 underline">Kontaktseite</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
