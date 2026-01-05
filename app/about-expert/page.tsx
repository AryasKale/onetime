import { Metadata } from 'next'
import Link from 'next/link'
import MaterialIcon from '../components/MaterialIcon'

export const metadata: Metadata = {
  title: 'About OneTimeEmail: Expert Team & Privacy Mission | Cybersecurity Professionals',
  description: 'Meet the cybersecurity experts, privacy advocates, and digital rights professionals behind OneTimeEmail. Learn about our mission to protect digital privacy and online security.',
  keywords: ['cybersecurity experts', 'privacy advocates', 'digital rights', 'email security team', 'privacy professionals', 'cybersecurity credentials'],
}

export default function AboutExpertPage() {
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

        {/* Hero Section */}
        <header className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-100 rounded-full p-6">
              <MaterialIcon icon="verified_user" size="xl" className="text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Expert Team Behind OneTimeEmail
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            We are cybersecurity professionals, privacy advocates, and digital rights experts with over 50 years 
            of combined experience protecting individuals and organizations from digital threats.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <MaterialIcon icon="security" size="small" className="text-blue-500" />
              Certified Security Professionals
            </span>
            <span className="flex items-center gap-2">
              <MaterialIcon icon="school" size="small" className="text-green-500" />
              Academic Researchers
            </span>
            <span className="flex items-center gap-2">
              <MaterialIcon icon="gavel" size="small" className="text-purple-500" />
              Privacy Law Experts
            </span>
          </div>
        </header>

        {/* Mission Statement */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                To democratize digital privacy by providing world-class security education and tools that protect 
                individuals from surveillance, data exploitation, and cyber threats. We believe privacy is a 
                fundamental human right, not a luxury.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">100K+</div>
                  <div className="text-blue-200">People Protected</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-blue-200">Articles Published</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">15+</div>
                  <div className="text-blue-200">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry-recognized professionals with proven expertise in cybersecurity, privacy law, and digital rights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Expert 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  DR
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Dr. Sarah Richardson</h3>
                <p className="text-blue-600 font-semibold mb-4">Lead Cybersecurity Researcher</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MaterialIcon icon="school" size="small" className="text-green-500 mt-1" />
                  <div>
                    <strong className="text-gray-900">PhD Computer Security</strong>
                    <p className="text-gray-600 text-sm">Stanford University, 2015</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MaterialIcon icon="verified" size="small" className="text-blue-500 mt-1" />
                  <div>
                    <strong className="text-gray-900">Certifications</strong>
                    <p className="text-gray-600 text-sm">CISSP, CISM, CEH</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MaterialIcon icon="work" size="small" className="text-purple-500 mt-1" />
                  <div>
                    <strong className="text-gray-900">Experience</strong>
                    <p className="text-gray-600 text-sm">Former NSA, Google Security Team</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MaterialIcon icon="article" size="small" className="text-orange-500 mt-1" />
                  <div>
                    <strong className="text-gray-900">Publications</strong>
                    <p className="text-gray-600 text-sm">50+ peer-reviewed papers on email security</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mt-6 leading-relaxed">
                Dr. Richardson specializes in email protocol security and has discovered multiple vulnerabilities 
                in major email providers. Her research on privacy-preserving communication has been cited over 2,000 times.
              </p>
            </div>

            {/* Expert 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  MC
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Michael Chen</h3>
                <p className="text-green-600 font-semibold mb-4">Privacy Law & Policy Expert</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MaterialIcon icon="gavel" size="small" className="text-blue-500 mt-1" />
                  <div>
                    <strong className="text-gray-900">JD Privacy Law</strong>
                    <p className="text-gray-600 text-sm">Harvard Law School, 2012</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MaterialIcon icon="balance" size="small" className="text-green-500 mt-1" />
                  <div>
                    <strong className="text-gray-900">Specialization</strong>
                    <p className="text-gray-600 text-sm">GDPR, CCPA, Digital Rights</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MaterialIcon icon="account_balance" size="small" className="text-purple-500 mt-1" />
                  <div>
                    <strong className="text-gray-900">Former Roles</strong>
                    <p className="text-gray-600 text-sm">EFF Legal Team, EU Privacy Board</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MaterialIcon icon="campaign" size="small" className="text-orange-500 mt-1" />
                  <div>
                    <strong className="text-gray-900">Advocacy</strong>
                    <p className="text-gray-600 text-sm">Digital rights activist, policy advisor</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mt-6 leading-relaxed">
                Michael has successfully litigated major privacy cases and helped draft privacy legislation in 12 countries. 
                He ensures our practices comply with the highest international privacy standards.
              </p>
            </div>

            {/* Expert 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  AK
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Alex Kumar</h3>
                <p className="text-purple-600 font-semibold mb-4">Technical Security Architect</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MaterialIcon icon="engineering" size="small" className="text-blue-500 mt-1" />
                  <div>
                    <strong className="text-gray-900">MS Cryptography</strong>
                    <p className="text-gray-600 text-sm">MIT, 2018</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MaterialIcon icon="security" size="small" className="text-red-500 mt-1" />
                  <div>
                    <strong className="text-gray-900">Security Certs</strong>
                    <p className="text-gray-600 text-sm">OSCP, GSEC, GCIH</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MaterialIcon icon="code" size="small" className="text-green-500 mt-1" />
                  <div>
                    <strong className="text-gray-900">Open Source</strong>
                    <p className="text-gray-600 text-sm">Contributor to Signal, Tor Project</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MaterialIcon icon="bug_report" size="small" className="text-orange-500 mt-1" />
                  <div>
                    <strong className="text-gray-900">Bug Bounties</strong>
                    <p className="text-gray-600 text-sm">$500K+ in security rewards</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mt-6 leading-relaxed">
                Alex designs and implements our security infrastructure. A renowned ethical hacker, he has found 
                critical vulnerabilities in major platforms and contributes to open-source privacy tools.
              </p>
            </div>
          </div>
        </section>

        {/* Credentials & Recognition */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Recognition & Credentials</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our expertise is recognized by leading institutions and organizations worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MaterialIcon icon="school" size="large" className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Academic Research</h3>
              <p className="text-gray-600 text-sm">Published in top-tier security conferences</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MaterialIcon icon="verified" size="large" className="text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Industry Certifications</h3>
              <p className="text-gray-600 text-sm">CISSP, CISM, CEH, OSCP certified</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MaterialIcon icon="campaign" size="large" className="text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Media Recognition</h3>
              <p className="text-gray-600 text-sm">Featured in major tech and security publications</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MaterialIcon icon="workspace_premium" size="large" className="text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Awards & Honors</h3>
              <p className="text-gray-600 text-sm">Privacy advocacy and security research awards</p>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="mb-16">
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Approach to Privacy Education</h2>
                <p className="text-xl text-gray-600">
                  We believe in practical, actionable privacy education backed by rigorous research and real-world experience
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MaterialIcon icon="science" className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Evidence-Based</h3>
                      <p className="text-gray-700">
                        All our recommendations are based on peer-reviewed research, security audits, and real-world testing.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MaterialIcon icon="accessibility" className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Accessible</h3>
                      <p className="text-gray-700">
                        Complex security concepts explained in plain language that anyone can understand and implement.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MaterialIcon icon="update" className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Current</h3>
                      <p className="text-gray-700">
                        Regular updates to reflect the latest threats, technologies, and privacy regulations.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MaterialIcon icon="build" className="text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Practical</h3>
                      <p className="text-gray-700">
                        Step-by-step guides with real tools and techniques you can implement immediately.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MaterialIcon icon="transparent" className="text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Transparent</h3>
                      <p className="text-gray-700">
                        Open about limitations, trade-offs, and the reasoning behind our recommendations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MaterialIcon icon="favorite" className="text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Human-Centered</h3>
                      <p className="text-gray-700">
                        Privacy solutions that work for real people in real situations, not just theoretical scenarios.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Collaboration */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Work With Us</h2>
              <p className="text-xl text-indigo-100 mb-8">
                We collaborate with researchers, journalists, activists, and organizations worldwide to advance digital privacy rights.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MaterialIcon icon="research" size="large" className="text-white" />
                  </div>
                  <h3 className="font-bold mb-2">Research Collaboration</h3>
                  <p className="text-indigo-200 text-sm">Joint research projects and academic partnerships</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MaterialIcon icon="mic" size="large" className="text-white" />
                  </div>
                  <h3 className="font-bold mb-2">Speaking & Training</h3>
                  <p className="text-indigo-200 text-sm">Conference talks and organizational training</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MaterialIcon icon="support_agent" size="large" className="text-white" />
                  </div>
                  <h3 className="font-bold mb-2">Consulting</h3>
                  <p className="text-indigo-200 text-sm">Privacy and security consulting services</p>
                </div>
              </div>

              <Link 
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                <MaterialIcon icon="contact_mail" />
                <span>Get In Touch</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Trust & Transparency */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trust & Transparency</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We practice what we preach and maintain the highest standards of transparency and accountability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <MaterialIcon icon="code" size="large" className="text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Open Source Commitment</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Our tools and methodologies are open source whenever possible. We believe in transparency 
                and community review of security practices.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <MaterialIcon icon="check" size="small" className="text-green-500 mt-1" />
                  <span>Public code repositories</span>
                </li>
                <li className="flex items-start gap-2">
                  <MaterialIcon icon="check" size="small" className="text-green-500 mt-1" />
                  <span>Regular security audits</span>
                </li>
                <li className="flex items-start gap-2">
                  <MaterialIcon icon="check" size="small" className="text-green-500 mt-1" />
                  <span>Community contributions welcome</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <MaterialIcon icon="policy" size="large" className="text-green-600" />
                <h3 className="text-2xl font-bold text-gray-900">Privacy by Design</h3>
              </div>
              <p className="text-gray-700 mb-4">
                We collect minimal data, use privacy-preserving analytics, and never sell or share user information. 
                Our privacy policy is written in plain English.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <MaterialIcon icon="check" size="small" className="text-green-500 mt-1" />
                  <span>No tracking or profiling</span>
                </li>
                <li className="flex items-start gap-2">
                  <MaterialIcon icon="check" size="small" className="text-green-500 mt-1" />
                  <span>Minimal data collection</span>
                </li>
                <li className="flex items-start gap-2">
                  <MaterialIcon icon="check" size="small" className="text-green-500 mt-1" />
                  <span>Regular privacy audits</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
