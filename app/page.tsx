import { Metadata } from 'next'
import InboxGeneratorWrapper from './components/InboxGeneratorWrapper'
import StructuredData, { ServiceStructuredData } from './components/StructuredData'
import { StatCard, BenefitCard, ProcessStep } from './components/VisualElements'

export const metadata: Metadata = {
  title: 'Free Email Generator - OneTimeEmail | Temporary & Disposable Emails',
  description: 'Generate temporary and disposable email addresses instantly. Perfect for online registrations, privacy protection, and spam prevention. No registration required, 100% free, 10-minute expiration.',
  keywords: [
    'temporary email',
    'disposable email',
    'fake email generator',
    'temp mail',
    'anonymous email',
    'privacy email',
    'spam protection',
    'email verification',
    'temporary mailbox',
    'throwaway email',
    'secure email',
    'privacy-focused email',
    'no-registration email',
    'instant email'
  ],
  openGraph: {
    title: 'Free Email Generator - OneTimeEmail | Temporary & Disposable Emails',
    description: 'Generate temporary and disposable email addresses instantly. Perfect for online registrations, privacy protection, and spam prevention. No registration required!',
    url: 'https://onetimeemail.net',
    siteName: 'OneTimeEmail',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OneTimeEmail - Free Temporary Email Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Email Generator - OneTimeEmail',
    description: 'Generate temporary and disposable email addresses instantly. Perfect for online registrations, privacy protection, and spam prevention.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://onetimeemail.net',
  },
}

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData type="website" data={{}} />
      <ServiceStructuredData />

    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <header className="mb-12 md:mb-20">
          <div className="text-center mb-8 md:mb-10">
            <div className="text-4xl md:text-8xl mb-4 md:mb-6 h-16 md:h-24 flex items-center justify-center" role="img" aria-label="Email icon">📧</div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              Free Email Generator - OneTimeEmail
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 px-4">
              Create temporary & disposable email addresses instantly. Perfect for verification, privacy protection, and spam prevention.
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
            Why Choose OneTimeEmail?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <article className="ios-safe-card bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="text-3xl md:text-5xl mb-4 md:mb-6 h-12 md:h-16 flex items-center justify-start" role="img" aria-label="User icon">👤</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Smart Identity Management</h3>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">Experience seamless identity management with our intelligent system that maintains the same inbox across all your browser tabs. This eliminates confusion and prevents the need to manage multiple temporary email addresses simultaneously, streamlining your online registration process.</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Consistent inbox experience across tabs</li>
                <li>• No need to remember multiple addresses</li>
                <li>• Simplified workflow for multiple signups</li>
              </ul>
            </article>
            
            <article className="ios-safe-card bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="text-3xl md:text-5xl mb-4 md:mb-6 h-12 md:h-16 flex items-center justify-start" role="img" aria-label="Delete icon">🗑️</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Automatic Data Protection</h3>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">Our advanced auto-delete feature ensures that all emails and associated data are automatically removed from our servers after exactly 10 minutes. This comprehensive approach to data protection guarantees that no residual information remains, providing you with complete peace of mind regarding your digital footprint.</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• 10-minute automatic expiration</li>
                <li>• Complete data removal from servers</li>
                <li>• No manual cleanup required</li>
              </ul>
            </article>
            
            <article className="ios-safe-card bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
              <div className="text-3xl md:text-5xl mb-4 md:mb-6 h-12 md:h-16 flex items-center justify-start" role="img" aria-label="Lock icon">🔒</div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Enterprise-Grade Privacy</h3>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">We employ a zero-tracking, zero-data-collection policy that ensures your temporary email usage remains completely anonymous. Unlike traditional email services that track user behavior and sell data to third parties, OneTimeEmail operates on a privacy-first model that protects your digital identity.</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• No user tracking or analytics</li>
                <li>• No data collection or profiling</li>
                <li>• Complete anonymity guaranteed</li>
              </ul>
            </article>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mb-12 md:mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                OneTimeEmail by the Numbers
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Trusted by users worldwide for secure, private email communication
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                number="10"
                label="Minute Expiration"
                icon="⏰"
                color="blue"
              />
              <StatCard
                number="100%"
                label="Anonymous"
                icon="👤"
                color="green"
              />
              <StatCard
                number="0"
                label="Data Stored"
                icon="🗑️"
                color="purple"
              />
              <StatCard
                number="24/7"
                label="Available"
                icon="🌍"
                color="orange"
              />
            </div>
          </div>
        </section>

        {/* Email Privacy Guide Section */}
        <section className="mb-12 md:mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Understanding Email Privacy in the Digital Age
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                In today's interconnected world, your email address serves as a digital key that unlocks access to countless online services. However, this convenience comes with significant privacy risks that most users are unaware of.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Privacy Threats */}
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">🚨</span> Common Privacy Threats
                </h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-red-400 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Email Address Harvesting</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Websites and services collect email addresses during registration and often sell this data to marketing companies. Your email becomes part of massive databases used for targeted advertising and spam campaigns.
                    </p>
                  </div>

                  <div className="border-l-4 border-red-400 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Data Broker Exploitation</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Email addresses are frequently traded between data brokers who compile detailed profiles about individuals. This information can include your browsing habits, purchase history, and personal preferences.
                    </p>
                  </div>

                  <div className="border-l-4 border-red-400 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Spam and Phishing Attacks</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Once your email address is compromised, it becomes a target for spam emails, phishing attempts, and malware distribution. Cybercriminals use various techniques to obtain and exploit email databases.
                    </p>
                  </div>

                  <div className="border-l-4 border-red-400 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Identity Correlation</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Using the same email address across multiple services creates a digital footprint that can be correlated to build comprehensive profiles of your online activities and personal information.
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy Solutions */}
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">🛡️</span> How Temporary Emails Protect You
                </h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-green-400 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Isolation of Personal Data</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Temporary emails create a barrier between your real identity and online services. Each temporary address serves as a disposable shield that protects your primary email from data collection and spam.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-400 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Controlled Data Exposure</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      You maintain complete control over which services receive access to temporary email addresses. This selective exposure prevents widespread data harvesting and reduces your digital footprint.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-400 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Automatic Cleanup</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      The self-destructing nature of temporary emails ensures that any data associated with them is automatically removed. This eliminates long-term data storage risks and prevents future exploitation.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-400 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Spam Prevention</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      By using temporary emails for non-essential services, you prevent spam from accumulating in your primary inbox. This keeps your main email address clean and focused on important communications.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Privacy Features */}
            <div className="mt-8 md:mt-12">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 md:p-8 border border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Advanced Privacy Features of OneTimeEmail
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl mb-3">🔐</div>
                    <h4 className="font-semibold text-gray-900 mb-2">End-to-End Encryption</h4>
                    <p className="text-gray-600 text-sm">All email data is encrypted during transmission and storage, ensuring that even if intercepted, the content remains unreadable to unauthorized parties.</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl mb-3">🕒</div>
                    <h4 className="font-semibold text-gray-900 mb-2">Time-Based Expiration</h4>
                    <p className="text-gray-600 text-sm">Emails automatically expire after exactly 10 minutes, preventing long-term data retention and reducing the window for potential data breaches.</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl mb-3">🕵️</div>
                    <h4 className="font-semibold text-gray-900 mb-2">Privacy-Safe Analytics</h4>
                    <p className="text-gray-600 text-sm">We use Google Analytics with IP anonymization and Consent Mode v2. Ads are non-personalized and respect your consent choices.</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl mb-3">🔀</div>
                    <h4 className="font-semibold text-gray-900 mb-2">Anonymous Generation</h4>
                    <p className="text-gray-600 text-sm">Temporary email addresses are generated using random algorithms, making them impossible to trace back to individual users or predict patterns.</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl mb-3">🗂️</div>
                    <h4 className="font-semibold text-gray-900 mb-2">Isolated Storage</h4>
                    <p className="text-gray-600 text-sm">Each temporary inbox is completely isolated, preventing cross-contamination of data between different temporary email addresses.</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-2xl mb-3">⚡</div>
                    <h4 className="font-semibold text-gray-900 mb-2">Instant Cleanup</h4>
                    <p className="text-gray-600 text-sm">Upon expiration, all email content, metadata, and associated data are permanently deleted using secure deletion protocols.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-12 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 md:mb-12">
            How It Works
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <ProcessStep
                step={1}
                title="Generate Email"
                description="Click 'Generate Your Inbox' to create a temporary email address instantly. No registration required, completely anonymous."
                icon="🚀"
              />
              <ProcessStep
                step={2}
                title="Use for Registrations"
                description="Use the temporary email for signups, verifications, or any service requiring an email address. Perfect for online shopping, newsletters, or app registrations."
                icon="📝"
              />
              <ProcessStep
                step={3}
                title="Receive Emails"
                description="Emails sent to your temporary address appear instantly in your inbox. Real-time delivery with no delays or filtering."
                icon="📨"
              />
              <ProcessStep
                step={4}
                title="Auto-Expire"
                description="Your temporary email and all received messages are automatically deleted after 10 minutes. Complete privacy with zero data retention."
                icon="🗑️"
              />
            </div>
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
              <BenefitCard
                title="Online Registrations & Signups"
                description="Safely register for websites, forums, and online services without exposing your primary email address to potential data collection and marketing campaigns."
                icon="📝"
                benefits={[
                  "Anonymous account creation",
                  "Spam-free registration",
                  "Data protection guaranteed"
                ]}
                color="blue"
              />

              <BenefitCard
                title="Free Trials & Software Downloads"
                description="Access software trials, demo versions, and download services without the risk of your email being added to marketing lists or sold to third parties."
                icon="🆓"
                benefits={[
                  "Risk-free software testing",
                  "No marketing spam",
                  "Secure download access"
                ]}
                color="green"
              />

              <BenefitCard
                title="Testing Applications & Services"
                description="Perfect for developers, QA testers, and IT professionals who need to verify email functionality without using personal or company email addresses."
                icon="🧪"
                benefits={[
                  "Professional testing tools",
                  "Secure QA environments",
                  "Developer-friendly features"
                ]}
                color="purple"
              />

              <div className="ios-safe-benefit bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
            </div>
                  <span className="text-gray-800 font-medium text-sm md:text-base">Spam Prevention & Inbox Protection</span>
          </div>
                <p className="text-gray-600 text-sm pl-11 leading-relaxed">Shield your primary inbox from unwanted marketing emails, promotional content, and potential spam that could compromise your productivity and email management.</p>
        </div>

              <div className="ios-safe-benefit bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-800 font-medium text-sm md:text-base">Identity Protection & Anonymity</span>
                </div>
                <p className="text-gray-600 text-sm pl-11 leading-relaxed">Maintain complete control over your digital identity by selectively sharing temporary email addresses, preventing unwanted tracking and profiling by online services.</p>
          </div>
          
              <div className="ios-safe-benefit bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border border-teal-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-800 font-medium text-sm md:text-base">One-Time Verification Processes</span>
                </div>
                <p className="text-gray-600 text-sm pl-11 leading-relaxed">Complete account verification processes for services you may only use briefly, ensuring you receive necessary confirmation emails without long-term data exposure.</p>
              </div>
            </div>

            {/* Advanced Benefits Section */}
            <div className="mt-8 md:mt-12">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-gray-200 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Advanced Benefits for Power Users
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                      <span className="text-2xl">🔬</span> Research & Journalism
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Investigate companies and services anonymously without revealing professional identity</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Conduct consumer research without accumulating marketing emails</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Access gated content for research purposes with temporary credentials</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                      <span className="text-2xl">💼</span> Business & Professional Use
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Test marketing campaigns and email sequences without affecting company metrics</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Verify vendor services and supplier communications securely</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Maintain separation between personal and professional email communications</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                      <span className="text-2xl">🎓</span> Educational & Academic Use
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Access academic resources and research materials anonymously</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Register for educational webinars and online courses securely</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Conduct surveys and studies without compromising participant privacy</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                      <span className="text-2xl">🛡️</span> Privacy-Conscious Individuals
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Shop online without creating permanent marketing profiles</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Sign up for social media accounts with controlled data exposure</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Access news and content without being tracked across websites</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
          </div>
          
            {/* Call to Action */}
            <div className="text-center mt-8 md:mt-12">
              <div className="ios-safe-cta bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white">
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
