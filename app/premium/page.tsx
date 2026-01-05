import { Metadata } from 'next'
import Link from 'next/link'
import MaterialIcon from '../components/MaterialIcon'

export const metadata: Metadata = {
  title: 'Premium Privacy Services | OneTimeEmail Professional Security Solutions',
  description: 'Professional privacy and security services from cybersecurity experts. Custom privacy audits, enterprise training, one-on-one consultations, and advanced security solutions.',
  keywords: ['premium privacy services', 'cybersecurity consulting', 'privacy audit', 'enterprise security training', 'professional privacy consultation'],
}

export default function PremiumServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        
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

        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full p-4">
              <MaterialIcon icon="workspace_premium" size="xl" className="text-purple-600" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Premium Privacy Services
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Professional privacy and security services from cybersecurity experts. Custom solutions for individuals, 
            businesses, and organizations requiring advanced privacy protection.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
            <span className="flex items-center gap-2">
              <MaterialIcon icon="verified_user" size="small" className="text-blue-500" />
              Expert-Led Services
            </span>
            <span className="flex items-center gap-2">
              <MaterialIcon icon="security" size="small" className="text-green-500" />
              Professional Grade
            </span>
            <span className="flex items-center gap-2">
              <MaterialIcon icon="support_agent" size="small" className="text-purple-500" />
              Personalized Support
            </span>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
              <MaterialIcon icon="schedule" className="text-blue-600" />
              <span className="font-semibold text-gray-900">Free 15-minute consultation available</span>
            </div>
            <Link 
              href="#consultation"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <MaterialIcon icon="calendar_today" size="small" />
              <span>Schedule Free Consultation</span>
            </Link>
          </div>
        </header>

        {/* Service Tiers */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Service Level</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional privacy services tailored to your specific needs and requirements
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Individual Tier */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MaterialIcon icon="person" size="xl" className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Individual</h3>
                <p className="text-gray-600">Personal privacy protection</p>
              </div>

              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-gray-900 mb-2">$297</div>
                <div className="text-gray-600">One-time comprehensive audit</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-green-500" />
                  <span className="text-gray-700">Personal Privacy Audit</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-green-500" />
                  <span className="text-gray-700">Custom Security Plan</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-green-500" />
                  <span className="text-gray-700">1-hour Expert Consultation</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-green-500" />
                  <span className="text-gray-700">Implementation Guide</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-green-500" />
                  <span className="text-gray-700">30-day Email Support</span>
                </div>
              </div>

              <Link 
                href="#contact-individual"
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>

              <div className="mt-4 text-center">
                <span className="text-sm text-gray-500">Perfect for individuals and families</span>
              </div>
            </div>

            {/* Business Tier */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-purple-500 hover:shadow-2xl transition-all duration-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold">Most Popular</span>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MaterialIcon icon="business" size="xl" className="text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Business</h3>
                <p className="text-gray-600">Small to medium business protection</p>
              </div>

              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-gray-900 mb-2">$1,497</div>
                <div className="text-gray-600">Comprehensive business package</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-purple-500" />
                  <span className="text-gray-700">Complete Business Audit</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-purple-500" />
                  <span className="text-gray-700">Employee Training Program</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-purple-500" />
                  <span className="text-gray-700">Policy Development</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-purple-500" />
                  <span className="text-gray-700">Implementation Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-purple-500" />
                  <span className="text-gray-700">90-day Support & Monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-purple-500" />
                  <span className="text-gray-700">Compliance Documentation</span>
                </div>
              </div>

              <Link 
                href="#contact-business"
                className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Get Started
              </Link>

              <div className="mt-4 text-center">
                <span className="text-sm text-gray-500">Ideal for teams of 5-50 people</span>
              </div>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MaterialIcon icon="corporate_fare" size="xl" className="text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600">Large organization solutions</p>
              </div>

              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-gray-900 mb-2">Custom</div>
                <div className="text-gray-600">Tailored enterprise pricing</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-orange-500" />
                  <span className="text-gray-700">Enterprise-wide Assessment</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-orange-500" />
                  <span className="text-gray-700">Custom Security Framework</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-orange-500" />
                  <span className="text-gray-700">Executive Training</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-orange-500" />
                  <span className="text-gray-700">Ongoing Monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-orange-500" />
                  <span className="text-gray-700">Dedicated Account Manager</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="check_circle" className="text-orange-500" />
                  <span className="text-gray-700">24/7 Priority Support</span>
                </div>
              </div>

              <Link 
                href="#contact-enterprise"
                className="block w-full bg-orange-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Contact Sales
              </Link>

              <div className="mt-4 text-center">
                <span className="text-sm text-gray-500">For organizations 50+ employees</span>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Services */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Specialized Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Additional expert services for specific privacy and security needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Privacy Audit */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MaterialIcon icon="assessment" size="large" className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Privacy Audit Service</h3>
                  <p className="text-gray-600">Comprehensive evaluation of your digital privacy posture</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="schedule" size="small" className="text-gray-400" />
                  <span className="text-gray-600">2-3 weeks delivery • Detailed report</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="verified" size="small" className="text-green-500" />
                  <span className="text-gray-600">Expert analysis • Actionable recommendations</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">What's included:</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Digital footprint analysis</li>
                  <li>• Email security assessment</li>
                  <li>• Social media privacy review</li>
                  <li>• Data broker presence check</li>
                  <li>• Custom improvement plan</li>
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">$497</div>
                <Link 
                  href="#audit-service"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Order Audit
                </Link>
              </div>
            </div>

            {/* Training Program */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MaterialIcon icon="school" size="large" className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Custom Training Program</h3>
                  <p className="text-gray-600">Tailored privacy and security training for your team</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="group" size="small" className="text-gray-400" />
                  <span className="text-gray-600">Up to 25 participants • Live sessions</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="workspace_premium" size="small" className="text-green-500" />
                  <span className="text-gray-600">Certificates • Follow-up support</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Training modules:</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Email security best practices</li>
                  <li>• Password management</li>
                  <li>• Phishing recognition</li>
                  <li>• Mobile device security</li>
                  <li>• Incident response procedures</li>
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">$1,997</div>
                <Link 
                  href="#training-program"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Book Training
                </Link>
              </div>
            </div>

            {/* Incident Response */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MaterialIcon icon="emergency" size="large" className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Incident Response</h3>
                  <p className="text-gray-600">Emergency privacy breach response and recovery</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="schedule" size="small" className="text-gray-400" />
                  <span className="text-gray-600">24/7 availability • Rapid response</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="security" size="small" className="text-red-500" />
                  <span className="text-gray-600">Expert team • Damage mitigation</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Response includes:</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Immediate threat assessment</li>
                  <li>• Containment strategies</li>
                  <li>• Recovery planning</li>
                  <li>• Legal compliance support</li>
                  <li>• Prevention recommendations</li>
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">$297/hr</div>
                <Link 
                  href="#incident-response"
                  className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Emergency Contact
                </Link>
              </div>
            </div>

            {/* Ongoing Monitoring */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MaterialIcon icon="monitoring" size="large" className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Privacy Monitoring</h3>
                  <p className="text-gray-600">Continuous monitoring of your digital privacy status</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="update" size="small" className="text-gray-400" />
                  <span className="text-gray-600">Monthly reports • Real-time alerts</span>
                </div>
                <div className="flex items-center gap-3">
                  <MaterialIcon icon="trending_up" size="small" className="text-purple-500" />
                  <span className="text-gray-600">Trend analysis • Proactive recommendations</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Monitoring covers:</h4>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Data broker presence</li>
                  <li>• Social media exposure</li>
                  <li>• Email security status</li>
                  <li>• Dark web monitoring</li>
                  <li>• Compliance tracking</li>
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">$97/mo</div>
                <Link 
                  href="#monitoring-service"
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Start Monitoring
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Our Services */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Our Premium Services?</h2>
              <p className="text-xl text-blue-100 mb-8">
                Professional privacy protection backed by decades of cybersecurity expertise
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MaterialIcon icon="verified_user" size="large" className="text-white" />
                  </div>
                  <h3 className="font-bold mb-2">Expert Team</h3>
                  <p className="text-blue-200 text-sm">Former NSA, Google Security, EFF professionals</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MaterialIcon icon="security" size="large" className="text-white" />
                  </div>
                  <h3 className="font-bold mb-2">Proven Methods</h3>
                  <p className="text-blue-200 text-sm">Battle-tested techniques from real-world experience</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MaterialIcon icon="support_agent" size="large" className="text-white" />
                  </div>
                  <h3 className="font-bold mb-2">Ongoing Support</h3>
                  <p className="text-blue-200 text-sm">Continuous guidance and expert assistance</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <MaterialIcon icon="star" className="text-yellow-400" />
                    <span>What Sets Us Apart</span>
                  </h4>
                  <ul className="space-y-2 text-blue-100">
                    <li>• Personalized approach to each client</li>
                    <li>• Industry-leading expertise and credentials</li>
                    <li>• Comprehensive solutions, not just tools</li>
                    <li>• Ongoing education and support</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <MaterialIcon icon="workspace_premium" className="text-yellow-400" />
                    <span>Service Guarantees</span>
                  </h4>
                  <ul className="space-y-2 text-blue-100">
                    <li>• 100% satisfaction guarantee</li>
                    <li>• Confidentiality and privacy protection</li>
                    <li>• Measurable security improvements</li>
                    <li>• Expert-level recommendations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="consultation" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Schedule a free consultation to discuss your privacy and security needs
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input 
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input 
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Interest
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Individual Privacy Audit</option>
                    <option>Business Security Assessment</option>
                    <option>Enterprise Solutions</option>
                    <option>Training Program</option>
                    <option>Incident Response</option>
                    <option>Ongoing Monitoring</option>
                    <option>Custom Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tell us about your needs
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Describe your privacy concerns, current challenges, or specific requirements..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MaterialIcon icon="send" size="small" />
                  <span>Schedule Free Consultation</span>
                </button>
              </form>

              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <MaterialIcon icon="info" className="text-purple-600 mt-1" />
                  <div className="text-sm text-purple-800">
                    <strong>What happens next:</strong> We'll review your request and schedule a 15-minute 
                    consultation call within 24 hours. All consultations are confidential and no-obligation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
