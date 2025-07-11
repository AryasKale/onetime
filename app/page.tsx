import { Metadata } from 'next'
import InboxGenerator from './components/InboxGenerator'
import StructuredData from './components/StructuredData'

export const metadata: Metadata = {
  title: 'OneTimeEmail - Free Temporary Email Service',
  description: 'Generate temporary email addresses instantly. Secure, private, and free disposable email service for online registrations, testing, and privacy protection.',
  keywords: ['temporary email', 'disposable email', 'fake email', 'email generator', 'private email', 'temp email', 'anonymous email', 'secure email', 'email privacy'],
  openGraph: {
    title: 'OneTimeEmail - Free Temporary Email Service',
    description: 'Generate temporary email addresses instantly. Secure, private, and free disposable email service.',
    url: 'https://onetimeemail.net',
    images: [
      {
        url: 'https://onetimeemail.net/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OneTimeEmail - Temporary Email Service',
      },
    ],
  },
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <header className="text-center mb-20">
            <div className="mb-10">
              <div className="text-8xl mb-6" role="img" aria-label="Email icon">📧</div>
              <h1 className="text-6xl font-bold text-gray-900 mb-6">
                OneTimeEmail - Free Temporary Email Service
              </h1>
              <p className="text-2xl text-gray-600 mb-8">
                Generate secure temporary email addresses that self-destruct automatically
              </p>
            </div>

            {/* Main CTA */}
            <InboxGenerator />
          </header>

          {/* Features Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              Why Choose OneTimeEmail?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <article className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="text-5xl mb-6" role="img" aria-label="User icon">👤</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Identity</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Same inbox across all your browser tabs. No confusion, no multiple emails.</p>
              </article>
              
              <article className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="text-5xl mb-6" role="img" aria-label="Delete icon">🗑️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Auto-Delete</h3>
                <p className="text-gray-600 text-lg leading-relaxed">Emails automatically expire and delete after 10 minutes, keeping your privacy intact.</p>
              </article>
              
              <article className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="text-5xl mb-6" role="img" aria-label="Lock icon">🔒</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">100% Private</h3>
                <p className="text-gray-600 text-lg leading-relaxed">No tracking, no data collection. Your temporary emails are completely anonymous and secure.</p>
              </article>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              How It Works
            </h2>
            <div className="max-w-4xl mx-auto">
              <ol className="space-y-8">
                <li className="flex items-start gap-6">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shrink-0">1</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Generate Email</h3>
                    <p className="text-gray-600 text-lg">Click "Generate Your Inbox" to create a temporary email address instantly.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shrink-0">2</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Use for Registrations</h3>
                    <p className="text-gray-600 text-lg">Use the temporary email for signups, verifications, or any service requiring an email address.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shrink-0">3</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Receive Emails</h3>
                    <p className="text-gray-600 text-lg">Emails sent to your temporary address appear instantly in your inbox.</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shrink-0">4</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Auto-Expire</h3>
                    <p className="text-gray-600 text-lg">Your temporary email and all received messages are automatically deleted after 10 minutes.</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              Benefits of Temporary Email
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-600 text-center mb-8">
                Protect your privacy and avoid spam with our free temporary email service. Perfect for:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span>Online registrations and signups</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span>Free trials and software downloads</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span>Testing applications and services</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span>Avoiding spam and marketing emails</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span>Protecting your real email address</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  <span>Email verification processes</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
