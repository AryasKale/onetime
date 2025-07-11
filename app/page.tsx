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
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Hero Section */}
          <header className="text-center mb-12 md:mb-20">
            <div className="mb-8 md:mb-10">
              <div className="text-4xl md:text-8xl mb-4 md:mb-6" role="img" aria-label="Email icon">📧</div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                OneTimeEmail - Free Temporary Email Service
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 px-4">
                Generate secure temporary email addresses that self-destruct automatically
              </p>
            </div>

            {/* Main CTA */}
            <InboxGenerator />
          </header>

          {/* Features Section */}
          <section className="mb-12 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12">
              Why Choose OneTimeEmail?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <article className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="text-3xl md:text-5xl mb-4 md:mb-6" role="img" aria-label="User icon">👤</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Smart Identity</h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">Same inbox across all your browser tabs. No confusion, no multiple emails.</p>
              </article>
              
              <article className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="text-3xl md:text-5xl mb-4 md:mb-6" role="img" aria-label="Delete icon">🗑️</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Auto-Delete</h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">Emails automatically expire and delete after 10 minutes, keeping your privacy intact.</p>
              </article>
              
              <article className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <div className="text-3xl md:text-5xl mb-4 md:mb-6" role="img" aria-label="Lock icon">🔒</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">100% Private</h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">No tracking, no data collection. Your temporary emails are completely anonymous and secure.</p>
              </article>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="mb-12 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12">
              How It Works
            </h2>
            <div className="max-w-4xl mx-auto">
              <ol className="space-y-6 md:space-y-8">
                <li className="flex items-start gap-4 md:gap-6">
                  <div className="bg-blue-500 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-xl font-bold shrink-0">1</div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Generate Email</h3>
                    <p className="text-gray-600 text-base md:text-lg">Click "Generate Your Inbox" to create a temporary email address instantly.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 md:gap-6">
                  <div className="bg-blue-500 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-xl font-bold shrink-0">2</div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Use for Registrations</h3>
                    <p className="text-gray-600 text-base md:text-lg">Use the temporary email for signups, verifications, or any service requiring an email address.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 md:gap-6">
                  <div className="bg-blue-500 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-xl font-bold shrink-0">3</div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Receive Emails</h3>
                    <p className="text-gray-600 text-base md:text-lg">Emails sent to your temporary address appear instantly in your inbox.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 md:gap-6">
                  <div className="bg-blue-500 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-lg md:text-xl font-bold shrink-0">4</div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Auto-Expire</h3>
                    <p className="text-gray-600 text-base md:text-lg">Your temporary email and all received messages are automatically deleted after 10 minutes.</p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* Benefits Section - Enhanced Design */}
          <section className="mb-12 md:mb-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                  Benefits of Temporary Email
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Protect your privacy and avoid spam with our free temporary email service. Perfect for online safety and digital privacy.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-800 font-medium text-sm md:text-base">Online registrations and signups</span>
                  </div>
                  <p className="text-gray-600 text-sm pl-11">Sign up for services without revealing your real email</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-800 font-medium text-sm md:text-base">Free trials and software downloads</span>
                  </div>
                  <p className="text-gray-600 text-sm pl-11">Test services without committing your personal email</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-800 font-medium text-sm md:text-base">Testing applications and services</span>
                  </div>
                  <p className="text-gray-600 text-sm pl-11">Perfect for developers and QA testing</p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-800 font-medium text-sm md:text-base">Avoiding spam and marketing emails</span>
                  </div>
                  <p className="text-gray-600 text-sm pl-11">Keep your inbox clean and spam-free</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-800 font-medium text-sm md:text-base">Protecting your real email address</span>
                  </div>
                  <p className="text-gray-600 text-sm pl-11">Maintain complete privacy and anonymity</p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border border-teal-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-800 font-medium text-sm md:text-base">Email verification processes</span>
                  </div>
                  <p className="text-gray-600 text-sm pl-11">Verify accounts without long-term commitment</p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-8 md:mt-12">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Ready to Protect Your Privacy?</h3>
                  <p className="text-blue-100 mb-6 text-sm md:text-base">Join thousands of users who trust OneTimeEmail for their online privacy needs</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <div className="flex items-center gap-2 text-blue-100 text-sm">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>100% Free Forever</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-100 text-sm">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>No Registration Required</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-100 text-sm">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>Instant Access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
