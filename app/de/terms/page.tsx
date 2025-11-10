import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { generateAdvancedMetadata, generateAdvancedViewport } from '../../components/AdvancedSEO'

export const metadata: Metadata = {
  title: 'Nutzungsbedingungen - OneTimeEmail',
  description: 'Nutzungsbedingungen für OneTimeEmail temporäre E-Mail-Service. Verstehen Sie unsere Richtlinien und Bestimmungen für die Nutzung unseres Dienstes.',
  alternates: {
    canonical: 'https://onetimeemail.net/de/terms',
    languages: {
      'de': 'https://onetimeemail.net/de/terms',
      'en': 'https://onetimeemail.net/terms',
    },
  },
}

export const viewport: Viewport = generateAdvancedViewport()

export default function GermanTermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <div className="flex gap-2">
            <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600 px-2 py-1 rounded">EN</Link>
            <span className="text-sm text-blue-600 font-semibold px-2 py-1 bg-blue-100 rounded">DE</span>
            <Link href="/es/terms" className="text-sm text-gray-600 hover:text-blue-600 px-2 py-1 rounded">ES</Link>
            <Link href="/fr/terms" className="text-sm text-gray-600 hover:text-blue-600 px-2 py-1 rounded">FR</Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nutzungsbedingungen
            </h1>
            <p className="text-gray-600">Letzte Aktualisierung: Januar 2025</p>
          </header>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Akzeptanz der Bedingungen</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Durch den Zugriff auf und die Nutzung von OneTimeEmail ("der Dienst") stimmen Sie zu, an diese Nutzungsbedingungen gebunden zu sein. Wenn Sie mit einem Teil dieser Bedingungen nicht einverstanden sind, dürfen Sie den Dienst nicht nutzen.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Beschreibung des Dienstes</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                OneTimeEmail bietet temporäre, Wegwerf-E-Mail-Adressen, die automatisch nach 10 Minuten ablaufen. Der Dienst ist darauf ausgelegt, Ihre Privatsphäre zu schützen und Spam zu verhindern, indem er eine Barriere zwischen Ihrer echten Identität und Online-Diensten schafft.
              </p>
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Hauptmerkmale:</h3>
                <ul className="text-blue-800 space-y-1 text-sm">
                  <li>• 10-minütige automatische E-Mail-Löschung</li>
                  <li>• Keine Registrierung oder persönliche Daten erforderlich</li>
                  <li>• Vollständige Anonymität und Datenschutz</li>
                  <li>• Echtzeit-E-Mail-Empfang und -Anzeige</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Akzeptable Nutzung</h2>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">✅ Erlaubte Nutzung:</h3>
                  <ul className="text-green-800 space-y-1 text-sm">
                    <li>• Online-Registrierungen und Kontoerstellungen</li>
                    <li>• Software-Tests und Demos</li>
                    <li>• Newsletter-Abonnements und Inhalts-Downloads</li>
                    <li>• E-Mail-Verifizierung für einmalige Nutzung</li>
                    <li>• Datenschutz und Anonymitätsschutz</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2">❌ Verbotene Nutzung:</h3>
                  <ul className="text-red-800 space-y-1 text-sm">
                    <li>• Illegale Aktivitäten oder Betrug</li>
                    <li>• Spam-Versendung oder Massenmarketing</li>
                    <li>• Belästigung oder missbräuchliches Verhalten</li>
                    <li>• Umgehung von Sicherheitsmaßnahmen</li>
                    <li>• Verletzung der Rechte Dritter</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Datenschutz und Sicherheit</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Wir verpflichten uns zu Ihrem Datenschutz und Ihrer Sicherheit. Alle temporären E-Mail-Adressen und deren Inhalte werden nach 10 Minuten automatisch und dauerhaft gelöscht. Wir sammeln keine persönlichen Daten und verfolgen keine Benutzeraktivitäten.
              </p>
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2">🔒 Sicherheitsmaßnahmen:</h3>
                <ul className="text-purple-800 space-y-1 text-sm">
                  <li>• Ende-zu-Ende-Verschlüsselung aller E-Mail-Daten</li>
                  <li>• Sichere Löschprotokolle nach Ablauf</li>
                  <li>• Keine Protokollierung oder Datenspeicherung</li>
                  <li>• Schutz vor unbefugtem Zugriff</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Haftungsausschluss</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Der Dienst wird "wie besehen" bereitgestellt. Wir übernehmen keine Gewähr für die Verfügbarkeit, Zuverlässigkeit oder Eignung des Dienstes für bestimmte Zwecke. Die Nutzung erfolgt auf eigenes Risiko.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Kontakt</h2>
              <p className="text-gray-700 leading-relaxed">
                Bei Fragen zu diesen Nutzungsbedingungen kontaktieren Sie uns über unsere <Link href="/de/contact" className="text-blue-600 hover:text-blue-800 underline">Kontaktseite</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
