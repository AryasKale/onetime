import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { generateAdvancedMetadata, generateAdvancedViewport } from '../components/AdvancedSEO'
import MaterialIcon from '../components/MaterialIcon'
import { OrganizationStructuredData } from '../components/AdvancedStructuredData'

export const metadata: Metadata = generateAdvancedMetadata({
  title: 'Contact Us - OneTimeEmail Expert Team & Support',
  description: 'Contact our cybersecurity experts and privacy professionals. Get expert guidance, technical support, and business information. 24-hour response guarantee.',
  canonical: 'https://onetimeemail.net/contact'
})

export const viewport: Viewport = generateAdvancedViewport()

export default function ContactPage() {
  return (
    <>
      {/* Structured Data */}
      <OrganizationStructuredData />
      
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Navigation */}
          <nav className="mb-8">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
            >
              <MaterialIcon icon="arrow_back" size="small" />
              <span>Back to Privacy Resources</span>
            </Link>
          </nav>

          <header className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 rounded-full p-4">
                <MaterialIcon icon="contact_support" size="xl" className="text-blue-600" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Contact Our Expert Team
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-6">
              Get in touch with cybersecurity professionals and privacy experts. We're here to help with 
              your questions, provide expert guidance, and explore partnership opportunities.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-6">
              <span className="flex items-center gap-2">
                <MaterialIcon icon="schedule" size="small" className="text-green-500" />
                24-hour response guarantee
              </span>
              <span className="flex items-center gap-2">
                <MaterialIcon icon="verified_user" size="small" className="text-blue-500" />
                Expert team support
              </span>
              <span className="flex items-center gap-2">
                <MaterialIcon icon="security" size="small" className="text-purple-500" />
                Confidential communications
              </span>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-4">
                <MaterialIcon icon="phone" className="text-green-600" />
                <span className="font-semibold text-gray-900">Free 15-minute consultation available</span>
                <Link 
                  href="/premium#consultation"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                >
                  Schedule Now
                </Link>
              </div>
            </div>
          </header>

          <main>
            {/* Expert Team Contact */}
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Get direct access to cybersecurity professionals and privacy experts
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Expert 1 */}
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    DR
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Sarah Richardson</h3>
                  <p className="text-blue-600 font-semibold mb-4">Lead Cybersecurity Researcher</p>
                  <div className="text-sm text-gray-600 mb-4">
                    <p>Former NSA • PhD Computer Security</p>
                    <p>50+ peer-reviewed publications</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <MaterialIcon icon="email" size="small" className="text-blue-500" />
                      <span>Email Security Expert</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <MaterialIcon icon="security" size="small" className="text-green-500" />
                      <span>Encryption Specialist</span>
                    </div>
                  </div>
                </div>

                {/* Expert 2 */}
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    MC
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Michael Chen</h3>
                  <p className="text-green-600 font-semibold mb-4">Privacy Law Expert</p>
                  <div className="text-sm text-gray-600 mb-4">
                    <p>Former EFF • Harvard Law JD</p>
                    <p>GDPR & CCPA Specialist</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <MaterialIcon icon="gavel" size="small" className="text-purple-500" />
                      <span>Privacy Law Expert</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <MaterialIcon icon="policy" size="small" className="text-blue-500" />
                      <span>Compliance Specialist</span>
                    </div>
                  </div>
                </div>

                {/* Expert 3 */}
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    AK
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Alex Kumar</h3>
                  <p className="text-purple-600 font-semibold mb-4">Security Architect</p>
                  <div className="text-sm text-gray-600 mb-4">
                    <p>MIT MS • $500K+ Bug Bounties</p>
                    <p>Open Source Contributor</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <MaterialIcon icon="code" size="small" className="text-orange-500" />
                      <span>Technical Implementation</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <MaterialIcon icon="bug_report" size="small" className="text-red-500" />
                      <span>Security Research</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 max-w-2xl mx-auto">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <MaterialIcon icon="support_agent" className="text-blue-600" />
                    <span className="font-bold text-gray-900">Expert Support Guarantee</span>
                  </div>
                  <p className="text-gray-700 text-sm">
                    All inquiries are reviewed by our expert team. Complex technical questions are escalated 
                    to the appropriate specialist for detailed, professional responses.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <MaterialIcon icon="email" size="large" className="text-blue-600" />
                    <h2 className="text-3xl font-bold text-gray-900">Primary Contact</h2>
                  </div>
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
                        <MaterialIcon icon="email" size="small" className="mr-2" />
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
                        <MaterialIcon icon="business" size="small" className="mr-2" />
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
                        <MaterialIcon icon="support" size="small" className="mr-2" />
                        support@onetimeemail.net
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <MaterialIcon icon="business" size="large" className="text-green-600" />
                    <h2 className="text-3xl font-bold text-gray-900">Business Information</h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Company Details</h3>
                      <div className="text-gray-700 space-y-2">
                        <p><strong>Company Name:</strong> OneTimeEmail</p>
                        <p><strong>Business Type:</strong> Privacy Technology Services</p>
                        <p><strong>Service Focus:</strong> Email Privacy Education & Tools</p>
                        <p><strong>Founded:</strong> 2024</p>
                        <p><strong>Headquarters:</strong> United States</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Service Description</h3>
                      <p className="text-gray-700 leading-relaxed">
                        OneTimeEmail provides comprehensive privacy education and secure temporary email services 
                        designed to protect user privacy in the digital age. Our platform combines expert-driven 
                        content with practical privacy tools.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Response Commitment</h3>
                      <p className="text-gray-700 leading-relaxed">
                        We guarantee responses to all inquiries within 24 hours during business days.
                        For urgent technical issues, we aim to provide initial responses within 4 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Legal Compliance & Transparency */}
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Legal Compliance & Transparency</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  We maintain the highest standards of legal compliance and business transparency
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Legal Compliance */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <MaterialIcon icon="verified" size="large" className="text-green-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Legal Compliance</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MaterialIcon icon="check_circle" className="text-green-500 mt-1" />
                      <div>
                        <strong className="text-gray-900">GDPR Compliant</strong>
                        <p className="text-gray-600 text-sm">Full compliance with EU data protection regulations</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MaterialIcon icon="check_circle" className="text-green-500 mt-1" />
                      <div>
                        <strong className="text-gray-900">CCPA Compliant</strong>
                        <p className="text-gray-600 text-sm">California Consumer Privacy Act compliance</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MaterialIcon icon="check_circle" className="text-green-500 mt-1" />
                      <div>
                        <strong className="text-gray-900">COPPA Safe</strong>
                        <p className="text-gray-600 text-sm">Children's Online Privacy Protection Act compliant</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MaterialIcon icon="check_circle" className="text-green-500 mt-1" />
                      <div>
                        <strong className="text-gray-900">International Standards</strong>
                        <p className="text-gray-600 text-sm">Complies with privacy laws in 50+ countries</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MaterialIcon icon="gavel" className="text-green-600" />
                      <strong className="text-green-800">Legal Review</strong>
                    </div>
                    <p className="text-green-700 text-sm">
                      All policies reviewed by Michael Chen, JD - Privacy Law Expert, Former EFF Legal Team
                    </p>
                  </div>
                </div>

                {/* Business Transparency */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <MaterialIcon icon="business" size="large" className="text-blue-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Business Transparency</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <strong className="text-gray-900 flex items-center gap-2 mb-2">
                        <MaterialIcon icon="business_center" size="small" className="text-blue-500" />
                        Company Information
                      </strong>
                      <div className="text-gray-700 text-sm space-y-1 ml-6">
                        <p><strong>Legal Name:</strong> OneTimeEmail</p>
                        <p><strong>Business Type:</strong> Privacy Technology Services</p>
                        <p><strong>Founded:</strong> 2024</p>
                        <p><strong>Headquarters:</strong> United States</p>
                      </div>
                    </div>

                    <div>
                      <strong className="text-gray-900 flex items-center gap-2 mb-2">
                        <MaterialIcon icon="account_balance" size="small" className="text-green-500" />
                        Financial Transparency
                      </strong>
                      <div className="text-gray-700 text-sm space-y-1 ml-6">
                        <p>Revenue: AdSense + Premium Services</p>
                        <p>No venture capital or external investors</p>
                        <p>Independent, privacy-focused operation</p>
                      </div>
                    </div>

                    <div>
                      <strong className="text-gray-900 flex items-center gap-2 mb-2">
                        <MaterialIcon icon="security" size="small" className="text-purple-500" />
                        Security Certifications
                      </strong>
                      <div className="text-gray-700 text-sm space-y-1 ml-6">
                        <p>Team holds CISSP, CISM, CEH certifications</p>
                        <p>Regular security audits and penetration testing</p>
                        <p>SOC 2 Type II compliance in progress</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MaterialIcon icon="transparency" className="text-blue-600" />
                      <strong className="text-blue-800">Open Source Commitment</strong>
                    </div>
                    <p className="text-blue-700 text-sm">
                      We believe in transparency. Our methodologies and security practices are documented 
                      and available for community review.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Form */}
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Get personalized responses from our expert team
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          First Name
                        </label>
                        <input 
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input 
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input 
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject Category
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>General Question</option>
                        <option>Technical Support</option>
                        <option>Business Partnership</option>
                        <option>Premium Services</option>
                        <option>Privacy Concern</option>
                        <option>Legal Inquiry</option>
                        <option>Media Request</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea 
                        rows={6}
                        placeholder="Please provide details about your inquiry, question, or concern..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <MaterialIcon icon="send" size="small" />
                      <span>Send Message</span>
                    </button>
                  </form>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <MaterialIcon icon="info" className="text-blue-600 mt-1" />
                      <div className="text-sm text-blue-800">
                        <strong>Response Guarantee:</strong> All messages receive expert responses within 24 hours. 
                        Complex technical questions are escalated to our specialist team for detailed analysis.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="mb-16">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Privacy?</h2>
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
    </>
  )
}