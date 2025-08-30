import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { generateAdvancedMetadata, generateAdvancedViewport } from '../components/AdvancedSEO'

export const metadata: Metadata = generateAdvancedMetadata({
  title: 'Complete Guide to Temporary Emails - Types, Benefits & Best Practices',
  description: 'Master temporary email services with our comprehensive guide. Learn about different types of disposable emails, their benefits, use cases, and how to choose the right solution for your privacy needs.',
  canonical: 'https://onetimeemail.net/guide'
})

export const viewport: Viewport = generateAdvancedViewport()

export default function TempEmailGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            The Complete Guide to Temporary Emails
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Everything you need to know about temporary and disposable email services.
            From understanding the basics to mastering advanced privacy protection techniques.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            Updated January 2024 • 18 min read
          </div>
        </header>

        <main>
          {/* Introduction */}
          <section className="mb-16">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Are Temporary Emails?</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Concept</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Temporary emails, also known as disposable emails or throwaway emails, are short-lived email addresses
                    that are created for temporary use. Unlike traditional email accounts that are designed for long-term
                    communication, temporary emails serve specific, limited purposes and automatically self-destruct after
                    a predetermined period.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    The core principle behind temporary emails is simple yet powerful: provide users with the communication
                    tools they need while ensuring that their personal data isn't permanently stored or exploited by third parties.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-blue-700 mb-4">Why They Matter</h3>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                    <ul className="space-y-3 text-blue-800">
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Protect your primary email from spam</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Prevent data collection and profiling</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Maintain privacy during online activities</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Reduce digital footprint and tracking</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Types of Temporary Emails */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Types of Temporary Email Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-xl">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant Temporary Emails</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Services that generate email addresses instantly without any registration or setup.
                  Perfect for quick, one-time use scenarios where you need immediate access.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Best For:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Quick registrations</li>
                    <li>• One-time downloads</li>
                    <li>• Instant verifications</li>
                    <li>• Emergency communications</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-xl">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Time-Limited Services</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Email addresses with predetermined expiration times, typically ranging from minutes to hours.
                  These services automatically delete all data once the time limit is reached.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Common Durations:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 10 minutes (most common)</li>
                    <li>• 1 hour for extended use</li>
                    <li>• 24 hours for longer tasks</li>
                    <li>• Custom time limits</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-xl">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Alias-Based Systems</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Services that create aliases or forwarding addresses for your primary email.
                  All messages are forwarded to your real inbox while maintaining separation.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Advantages:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Keep using your main email</li>
                    <li>• Easy to disable aliases</li>
                    <li>• Organized inbox management</li>
                    <li>• Gradual privacy adoption</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How Temporary Emails Work */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How Temporary Email Services Work</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">The Technical Process</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-blue-700 mb-4">Email Generation</h4>
                    <ol className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</span>
                        <span>User requests a temporary email address</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</span>
                        <span>Service generates a unique, random email address</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</span>
                        <span>Address is temporarily stored in the system</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">4</span>
                        <span>User receives the temporary address for immediate use</span>
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-green-700 mb-4">Email Processing</h4>
                    <ol className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</span>
                        <span>Incoming emails are received by the service</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</span>
                        <span>Messages are routed to the correct temporary inbox</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</span>
                        <span>Content is displayed to the user in real-time</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">4</span>
                        <span>All data is automatically deleted after expiration</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Technical Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🔐</div>
                    <h4 className="font-semibold text-gray-900 mb-1">Encryption</h4>
                    <p className="text-sm text-gray-600">HTTPS/TLS encryption for secure data transmission</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🗑️</div>
                    <h4 className="font-semibold text-gray-900 mb-1">Auto-Delete</h4>
                    <p className="text-sm text-gray-600">Automatic cleanup prevents data accumulation</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🚫</div>
                    <h4 className="font-semibold text-gray-900 mb-1">No Tracking</h4>
                    <p className="text-sm text-gray-600">Zero user tracking or behavioral analysis</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">⚡</div>
                    <h4 className="font-semibold text-gray-900 mb-1">Real-Time</h4>
                    <p className="text-sm text-gray-600">Instant email delivery and display</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Practical Use Cases for Temporary Emails</h2>
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-purple-700 mb-4 flex items-center gap-3">
                      <span className="text-3xl">🛒</span> E-commerce & Online Shopping
                    </h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-purple-400 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Free Trials & Samples</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Access product trials, free samples, and promotional offers without providing your primary email address.
                          Perfect for testing services before committing to long-term subscriptions.
                        </p>
                      </div>
                      <div className="border-l-4 border-purple-400 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Price Comparison Shopping</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Sign up for multiple retailer accounts to compare prices, track deals, and access exclusive discounts
                          without cluttering your main inbox with marketing emails.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-3">
                      <span className="text-3xl">📱</span> App & Service Registrations
                    </h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-green-400 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Mobile Applications</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Register for mobile apps, games, and digital services that require email verification.
                          Keep your personal email separate from app-related communications.
                        </p>
                      </div>
                      <div className="border-l-4 border-green-400 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Software Downloads</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Download software, tools, and applications that require registration without exposing your
                          primary email to potential security risks or marketing campaigns.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-3">
                      <span className="text-3xl">🔬</span> Professional & Research Use
                    </h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-400 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Market Research</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Conduct surveys, access research materials, and gather information anonymously.
                          Perfect for journalists, researchers, and market analysts.
                        </p>
                      </div>
                      <div className="border-l-4 border-blue-400 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Competitive Analysis</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Sign up for competitor services, monitor industry newsletters, and track market trends
                          without revealing your professional identity or interests.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-orange-700 mb-4 flex items-center gap-3">
                      <span className="text-3xl">🎓</span> Educational & Academic Use
                    </h3>
                    <div className="space-y-4">
                      <div className="border-l-4 border-orange-400 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Online Learning</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Access educational resources, webinars, and online courses that require registration.
                          Keep learning-related emails separate from personal communications.
                        </p>
                      </div>
                      <div className="border-l-4 border-orange-400 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Academic Research</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Register for academic databases, research tools, and scholarly resources anonymously.
                          Maintain privacy when accessing sensitive research materials.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Benefits of Temporary Emails</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <h3 className="text-2xl font-semibold text-green-700 mb-6">Privacy Protection</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Data Isolation</h4>
                      <p className="text-gray-600 text-sm">Keep your personal email address separate from marketing and data collection activities</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Spam Prevention</h4>
                      <p className="text-gray-600 text-sm">Avoid inbox clutter from unwanted marketing emails and promotional content</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Identity Protection</h4>
                      <p className="text-gray-600 text-sm">Prevent identity correlation across different online services and websites</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <h3 className="text-2xl font-semibold text-blue-700 mb-6">Security Advantages</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Phishing Protection</h4>
                      <p className="text-gray-600 text-sm">Reduce exposure to phishing attacks by using temporary addresses for untrusted services</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Breach Mitigation</h4>
                      <p className="text-gray-600 text-sm">Limit damage from data breaches by compartmentalizing your email usage</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-500 text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Controlled Exposure</h4>
                      <p className="text-gray-600 text-sm">Maintain control over which services have access to your contact information</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <h3 className="text-2xl font-semibold text-purple-700 mb-6">Practical Advantages</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Convenience</h4>
                      <p className="text-gray-600 text-sm">Instant access without registration, passwords, or setup procedures</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Organization</h4>
                      <p className="text-gray-600 text-sm">Keep your primary inbox focused on important personal and professional communications</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Flexibility</h4>
                      <p className="text-gray-600 text-sm">Adapt to changing needs by creating new addresses for different purposes</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <h3 className="text-2xl font-semibold text-orange-700 mb-6">Long-Term Benefits</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Digital Hygiene</h4>
                      <p className="text-gray-600 text-sm">Maintain a clean digital footprint by minimizing permanent data storage</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Future-Proofing</h4>
                      <p className="text-gray-600 text-sm">Protect against evolving privacy threats and data collection practices</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Peace of Mind</h4>
                      <p className="text-gray-600 text-sm">Enjoy online activities without constant privacy concerns</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Best Practices for Using Temporary Emails</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-green-700 mb-6">Smart Usage Strategies</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 text-xl mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Purpose-Specific Addresses</h4>
                        <p className="text-gray-600 text-sm">Create different temporary emails for shopping, social media, and professional use</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 text-xl mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Time Management</h4>
                        <p className="text-gray-600 text-sm">Keep track of expiration times and copy important information before deletion</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 text-xl mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Selective Sharing</h4>
                        <p className="text-gray-600 text-sm">Only use temporary emails for services that genuinely require email verification</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 text-xl mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Regular Rotation</h4>
                        <p className="text-gray-600 text-sm">Generate new addresses regularly to maintain privacy and prevent tracking</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-red-700 mb-6">Common Pitfalls to Avoid</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 text-xl mt-1">✗</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Important Account Reliance</h4>
                        <p className="text-gray-600 text-sm">Don't use temporary emails for accounts you need to access long-term</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 text-xl mt-1">✗</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Financial Services</h4>
                        <p className="text-gray-600 text-sm">Avoid using temporary emails for banking, payments, or financial accounts</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 text-xl mt-1">✗</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Password Recovery</h4>
                        <p className="text-gray-600 text-sm">Don't rely on temporary emails for password reset or account recovery</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 text-xl mt-1">✗</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Excessive Generation</h4>
                        <p className="text-gray-600 text-sm">Avoid creating too many temporary emails, as this can be counterproductive</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Master Temporary Emails?</h2>
              <p className="text-xl mb-6 opacity-90">
                Become a temporary email expert with OneTimeEmail's comprehensive service.
                Connect with thousands of privacy-conscious users who master digital communication.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>10-Minute Auto-Expiration</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>100% Anonymous & Free</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Real-Time Email Delivery</span>
                </div>
              </div>
              <Link
                href="/"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Try OneTimeEmail Now
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
