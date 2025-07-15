import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { generateAdvancedMetadata, generateAdvancedViewport } from '../components/AdvancedSEO'

export const metadata: Metadata = generateAdvancedMetadata({
  title: 'About OneTimeEmail - Our Mission & Values',
  description: 'Learn about OneTimeEmail\'s mission to protect privacy through secure temporary email services. Discover our commitment to user privacy and data protection.',
  canonical: 'https://onetimeemail.net/about'
})

export const viewport: Viewport = generateAdvancedViewport()

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About OneTimeEmail
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We're on a mission to protect your privacy and keep your inbox clean through secure, 
            reliable temporary email services.
          </p>
        </header>

        <main>
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                In today's digital world, your email address is your digital identity. Every website, 
                service, and app wants it, but not all deserve it. OneTimeEmail was created to give you 
                control over your digital privacy.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We believe privacy is a fundamental right, not a luxury. Our temporary email service 
                empowers you to interact with the digital world on your terms, without compromising 
                your personal information or cluttering your primary inbox.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Privacy First</h3>
                  <p className="text-gray-600">Your privacy is our top priority. We don't track, store, or sell your data.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Access</h3>
                  <p className="text-gray-600">Get temporary emails instantly without registration or personal information.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🛡️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure by Design</h3>
                  <p className="text-gray-600">Built with security in mind, using industry-standard encryption and protection.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why We Built OneTimeEmail</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Problem</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">❌</span>
                      <span>Email addresses collected for marketing spam</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">❌</span>
                      <span>Personal data sold to third parties</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">❌</span>
                      <span>Cluttered inboxes from unwanted subscriptions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">❌</span>
                      <span>Identity theft and privacy breaches</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">❌</span>
                      <span>Forced registrations for simple downloads</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Solution</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✅</span>
                      <span>Temporary emails that self-destruct</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✅</span>
                      <span>No personal data collection or tracking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✅</span>
                      <span>Keep your real inbox clean and organized</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✅</span>
                      <span>Protect your identity and privacy online</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✅</span>
                      <span>Access services without commitment</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Commitment</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <span>🔐</span> Data Protection
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    We employ industry-standard security measures including HTTPS encryption, 
                    secure servers, and automatic data deletion. Your temporary emails and any 
                    content are automatically purged after expiration.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <span>🚫</span> No Tracking
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    We don't use cookies for tracking, don't store IP addresses, and don't 
                    create user profiles. Your usage of OneTimeEmail is completely anonymous 
                    and private.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <span>🌍</span> Always Free
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Privacy protection shouldn't come at a cost. OneTimeEmail will always be 
                    free to use, with no hidden fees, premium tiers, or subscription plans.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <span>⚡</span> Continuous Innovation
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    We're constantly improving our service with better security, enhanced features, 
                    and improved user experience while maintaining our core privacy principles.
                  </p>
                </div>
              </div>
            </div>
          </section>



          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Get Started Today</h2>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Protect Your Privacy?</h3>
              <p className="text-xl mb-6 opacity-90">
                Start using OneTimeEmail today and take control of your digital privacy.
              </p>
              <Link 
                href="/"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Generate Your First Temporary Email
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
} 