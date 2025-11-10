import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import InboxGeneratorWrapper from '../components/InboxGeneratorWrapper'
import StructuredData, { ServiceStructuredData } from '../components/StructuredData'
import { StatCard, BenefitCard, ProcessStep } from '../components/VisualElements'

export const metadata: Metadata = {
  title: 'Générateur d\'Email Gratuit - OneTimeEmail | Adresses Email Temporaires et Jetables',
  description: 'Créez instantanément des adresses email temporaires et jetables. Parfait pour les inscriptions en ligne, la protection de la vie privée et la prévention du spam. Aucune inscription requise.',
  keywords: [
    'email temporaire',
    'email jetable',
    'générateur email',
    'mail temporaire',
    'email anonyme',
    'confidentialité email',
    'protection spam',
    'vérification email',
    'boîte temporaire',
    'email usage unique'
  ],
  alternates: {
    canonical: 'https://onetimeemail.net/fr/',
    languages: {
      'fr': 'https://onetimeemail.net/fr/',
      'en': 'https://onetimeemail.net/',
    },
  },
  openGraph: {
    title: 'Générateur d\'Email Gratuit - OneTimeEmail',
    description: 'Créez instantanément des adresses email temporaires et jetables. Parfait pour les inscriptions en ligne, la protection de la vie privée et la prévention du spam.',
    url: 'https://onetimeemail.net/fr/',
    siteName: 'OneTimeEmail',
    type: 'website',
    locale: 'fr_FR',
    images: [
      {
        url: 'https://onetimeemail.net/og-image-fr.jpg',
        width: 1200,
        height: 630,
        alt: 'OneTimeEmail - Générateur d\'Email Temporaire Gratuit',
      },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3B82F6',
}

export default function FrenchHomePage() {
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
              <Link href="/es" className="text-sm text-gray-600 hover:text-blue-600 px-2 py-1 rounded">ES</Link>
              <span className="text-sm text-blue-600 font-semibold px-2 py-1 bg-blue-100 rounded">FR</span>
            </div>
          </div>

          {/* Hero Section */}
          <header className="mb-12 md:mb-20">
            <div className="text-center mb-8 md:mb-10">
              <div className="text-4xl md:text-8xl mb-4 md:mb-6 h-16 md:h-24 flex items-center justify-center" role="img" aria-label="Icône email">📧</div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Générateur d'Email Gratuit - OneTimeEmail
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 px-4">
                Créez instantanément des adresses email temporaires et jetables. Parfait pour la vérification, la protection de la vie privée et la prévention du spam.
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
              Pourquoi choisir OneTimeEmail?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <article className="ios-safe-card bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="text-3xl md:text-5xl mb-4 md:mb-6 h-12 md:h-16 flex items-center justify-start" role="img" aria-label="Icône utilisateur">👤</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Gestion Intelligente d'Identité</h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">Découvrez une gestion d'identité transparente avec notre système intelligent qui maintient la même boîte de réception dans tous vos onglets de navigateur. Cela élimine la confusion et évite le besoin de gérer plusieurs adresses email temporaires simultanément.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Expérience cohérente de boîte de réception</li>
                  <li>• Pas besoin de mémoriser plusieurs adresses</li>
                  <li>• Flux de travail simplifié</li>
                </ul>
              </article>
              
              <article className="ios-safe-card bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="text-3xl md:text-5xl mb-4 md:mb-6 h-12 md:h-16 flex items-center justify-start" role="img" aria-label="Icône supprimer">🗑️</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Protection Automatique des Données</h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">Notre fonction avancée de suppression automatique garantit que tous les emails et données associées sont automatiquement supprimés de nos serveurs après exactement 10 minutes. Cette approche complète de protection des données garantit qu'aucune information résiduelle ne subsiste.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Expiration automatique de 10 minutes</li>
                  <li>• Suppression complète des données du serveur</li>
                  <li>• Aucun nettoyage manuel requis</li>
                </ul>
              </article>
              
              <article className="ios-safe-card bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="text-3xl md:text-5xl mb-4 md:mb-6 h-12 md:h-16 flex items-center justify-start" role="img" aria-label="Icône cadenas">🔒</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Confidentialité de Niveau Entreprise</h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">Nous employons une politique de zéro suivi et zéro collecte de données qui garantit que votre utilisation d'email temporaire reste complètement anonyme. Contrairement aux services email traditionnels, OneTimeEmail fonctionne avec un modèle axé sur la confidentialité.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Aucun suivi d'utilisateur ou analyse</li>
                  <li>• Aucune collecte de données ou profilage</li>
                  <li>• Anonymat complet garanti</li>
                </ul>
              </article>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Prêt à Protéger votre Vie Privée?</h3>
              <p className="text-blue-100 mb-6 text-sm md:text-base">Rejoignez des milliers d'utilisateurs qui font confiance à OneTimeEmail pour leurs besoins de confidentialité en ligne</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>100% Gratuit pour Toujours</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Aucune Inscription Requise</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Accès Instantané</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
