import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { generateAdvancedMetadata, generateAdvancedViewport } from '../components/AdvancedSEO'
import Breadcrumbs from '../components/Breadcrumbs'

export const metadata: Metadata = generateAdvancedMetadata({
  title: 'Contact Us - OneTimeEmail Support & Business Information',
  description: 'Get in touch with OneTimeEmail. Contact information, business details, support channels, and company information for partnerships and inquiries.',
  canonical: 'https://onetimeemail.net/contact'
})

export const viewport: Viewport = generateAdvancedViewport()

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-16">
          <Breadcrumbs items={[
            { label: 'Contact Us', href: '/contact', current: true }
          ]} />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Get in touch with the OneTimeEmail team. We're here to help with your questions,
            feedback, and partnership opportunities.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            Response time: Within 24 hours
          </div>
        </header>

        <main>
          {/* Contact Information */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">📧</span> Primary Contact
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">General Inquiries</h3>
                    <p className="text-gray-700 mb-2">
                      For general questions, feedback, or feature requests:
                    </p>
                    <a
                      href="mailto:onetimeemailsaas@gmail.com"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      onetimeemailsaas@gmail.com
                    </a>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Business & Partnerships</h3>
                    <p className="text-gray-700 mb-2">
                      For business inquiries, partnerships, or collaboration opportunities:
                    </p>
                    <a
                      href="mailto:business@onetimeemail.net"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      business@onetimeemail.net
                    </a>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Technical Support</h3>
                    <p className="text-gray-700 mb-2">
                      For technical issues, bugs, or service-related problems:
                    </p>
                    <a
                      href="mailto:support@onetimeemail.net"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      support@onetimeemail.net
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">🏢</span> Business Information
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Company Details</h3>
                    <div className="text-gray-700 space-y-2">
                      <p><strong>Company Name:</strong> OneTimeEmail</p>
                      <p><strong>Business Type:</strong> Privacy Technology Services</p>
                      <p><strong>Service Focus:</strong> Temporary Email Solutions</p>
                      <p><strong>Founded:</strong> 2024</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Service Description</h3>
                    <p className="text-gray-700 leading-relaxed">
                      OneTimeEmail provides secure, temporary email services designed to protect user privacy
                      in the digital age. Our platform offers instant email generation with automatic expiration
                      to ensure complete data protection and anonymity.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Response Commitment</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We strive to respond to all inquiries within 24 hours during business days.
                      For urgent technical issues, we aim to provide initial responses within 4 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">How can I get help?</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For immediate assistance, check our comprehensive FAQ section or use our contact form.
                  Our support team is available to help with technical issues, feature requests, and general inquiries.
                </p>
                <Link
                  href="/faq"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Visit FAQ Page
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Partnerships</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We're always interested in exploring partnership opportunities with privacy-focused companies,
                  security researchers, and organizations that share our commitment to digital privacy.
                </p>
                <Link
                  href="mailto:business@onetimeemail.net"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Contact Business Team
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </Link>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Privacy Concerns</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Your privacy is our top priority. All communications are handled securely and confidentially.
                  We never share your personal information with third parties without explicit consent.
                </p>
                <Link
                  href="/privacy"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read Privacy Policy
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Support</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Experiencing technical difficulties? Our support team can help troubleshoot issues,
                  provide guidance, and ensure you get the most out of our service.
                </p>
                <Link
                  href="mailto:support@onetimeemail.net"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Get Technical Help
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* Service Status */}
          <section className="mb-16">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Service Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Availability</h3>
                  <p className="text-gray-600 mb-4">24/7 service availability with 99.9% uptime guarantee</p>
                  <div className="inline-flex items-center text-green-600 font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Operational
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Security Status</h3>
                  <p className="text-gray-600 mb-4">All security systems active and monitoring in real-time</p>
                  <div className="inline-flex items-center text-green-600 font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Protected
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Performance</h3>
                  <p className="text-gray-600 mb-4">Average response time under 100ms globally</p>
                  <div className="inline-flex items-center text-green-600 font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Optimal
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Resources */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Helpful Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/faq"
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-xl hover:shadow-2xl transition-all text-center group"
              >
                <div className="text-4xl mb-4">❓</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">FAQ</h3>
                <p className="text-gray-600 text-sm">Find answers to common questions</p>
              </Link>

              <Link
                href="/privacy-guide"
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-xl hover:shadow-2xl transition-all text-center group"
              >
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">Privacy Guide</h3>
                <p className="text-gray-600 text-sm">Complete privacy protection guide</p>
              </Link>

              <Link
                href="/security"
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-xl hover:shadow-2xl transition-all text-center group"
              >
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">Security</h3>
                <p className="text-gray-600 text-sm">Learn about our security features</p>
              </Link>

              <Link
                href="/guide"
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-xl hover:shadow-2xl transition-all text-center group"
              >
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600">Complete Guide</h3>
                <p className="text-gray-600 text-sm">Master temporary email usage</p>
              </Link>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-6 opacity-90">
                Experience the privacy and security of OneTimeEmail today.
                Your digital privacy protection starts with one click.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Free & Unlimited</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>10-Minute Protection</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>No Personal Data Required</span>
                </div>
              </div>
              <Link
                href="/"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Generate Your Email Now
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
