import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { generateAdvancedMetadata, generateAdvancedViewport } from '../components/AdvancedSEO'

export const metadata: Metadata = generateAdvancedMetadata({
  title: 'Security Features - OneTimeEmail Advanced Protection & Encryption',
  description: 'Discover OneTimeEmail security features including end-to-end encryption, automatic data deletion, secure infrastructure, and privacy protection mechanisms.',
  canonical: 'https://onetimeemail.net/security'
})

export const viewport: Viewport = generateAdvancedViewport()

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Advanced Security Features
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Explore the comprehensive security measures and privacy protection features that make OneTimeEmail
            a trusted solution for temporary email services worldwide.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            Updated January 2024 • 15 min read
          </div>
        </header>

        <main>
          {/* Security Overview */}
          <section className="mb-16">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Security First Architecture</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Security Philosophy</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    At OneTimeEmail, security isn't an afterthought—it's the foundation of everything we build.
                    Our security-first approach ensures that every feature, every process, and every decision
                    prioritizes the protection of user data and privacy above all else.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We employ a multi-layered security strategy that combines industry-standard encryption,
                    secure infrastructure, automated threat detection, and privacy-by-design principles
                    to create one of the most secure temporary email services available.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-blue-700 mb-4">Security Standards</h3>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                    <ul className="space-y-3 text-blue-800">
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">🔒</span>
                        <span>Enterprise-grade encryption protocols</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">🛡️</span>
                        <span>Automated security monitoring 24/7</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">⚡</span>
                        <span>Real-time threat detection systems</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">🔍</span>
                        <span>Regular security audits and penetration testing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Encryption Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">End-to-End Encryption</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-xl">
                <div className="text-4xl mb-4">🔐</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">TLS 1.3 Encryption</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  All communications between your browser and our servers are protected by the latest TLS 1.3 protocol,
                  providing forward secrecy and perfect protection against eavesdropping and man-in-the-middle attacks.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Technical Details:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• TLS 1.3 with forward secrecy</li>
                    <li>• AES-256-GCM encryption</li>
                    <li>• ECDHE key exchange</li>
                    <li>• SHA-384 hash algorithm</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-xl">
                <div className="text-4xl mb-4">🗝️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Database Encryption</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Temporary email data is encrypted at rest using industry-standard AES-256 encryption.
                  This ensures that even if our database were compromised, the data would remain unreadable to unauthorized parties.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Encryption Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• AES-256 encryption at rest</li>
                    <li>• Encrypted database backups</li>
                    <li>• Secure key management</li>
                    <li>• Zero-knowledge architecture</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-xl">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Email Transmission Security</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Emails are transmitted through secure channels with additional encryption layers.
                  Our mail processing infrastructure uses SMTP over TLS and implements SPF, DKIM, and DMARC for email authentication.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Email Security:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• SMTP over TLS encryption</li>
                    <li>• SPF, DKIM, DMARC validation</li>
                    <li>• Content filtering and scanning</li>
                    <li>• Malware detection</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Data Protection */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Data Protection & Privacy</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-green-700 mb-6 flex items-center gap-3">
                    <span className="text-3xl">🗑️</span> Automatic Data Deletion
                  </h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-gray-900 mb-2">10-Minute Expiration Policy</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Every temporary email address and all associated data is automatically deleted after exactly 10 minutes.
                        This ensures that no residual data remains in our systems, providing complete privacy protection.
                      </p>
                    </div>

                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Secure Deletion Process</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        We use secure deletion protocols that overwrite data multiple times before removal,
                        ensuring that deleted information cannot be recovered through forensic analysis.
                      </p>
                    </div>

                    <div className="border-l-4 border-green-400 pl-4">
                      <h4 className="font-semibold text-gray-900 mb-2">No Data Retention</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Unlike traditional email services that retain data indefinitely, OneTimeEmail maintains a strict
                        no-retention policy that automatically purges all data upon expiration.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center gap-3">
                    <span className="text-3xl">🚫</span> Zero-Tracking Policy
                  </h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-gray-900 mb-2">No User Analytics</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        We don't track user behavior, browsing patterns, or usage analytics. Your interactions with
                        our service remain completely private and unmonitored.
                      </p>
                    </div>

                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-gray-900 mb-2">No Cookies or Tracking</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Our service operates without cookies, tracking pixels, or any form of behavioral tracking.
                        Your privacy is maintained throughout your entire session.
                      </p>
                    </div>

                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Anonymous Usage</h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        All temporary email generation and usage occurs anonymously. We don't log IP addresses,
                        device information, or any personally identifiable data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Infrastructure Security */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Infrastructure & Network Security</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <h3 className="text-2xl font-semibold text-purple-700 mb-6">Cloud Infrastructure Security</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 text-xl mt-1">☁️</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Secure Cloud Hosting</h4>
                      <p className="text-gray-600 text-sm">Hosted on Vercel's enterprise-grade infrastructure with multiple layers of security and redundancy.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 text-xl mt-1">🛡️</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">DDoS Protection</h4>
                      <p className="text-gray-600 text-sm">Advanced DDoS mitigation systems protect against distributed denial-of-service attacks.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 text-xl mt-1">🔄</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Automatic Failover</h4>
                      <p className="text-gray-600 text-sm">Redundant systems ensure service continuity even during infrastructure failures.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-500 text-xl mt-1">📊</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">24/7 Monitoring</h4>
                      <p className="text-gray-600 text-sm">Continuous monitoring of all systems with automated alerts for security incidents.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
                <h3 className="text-2xl font-semibold text-orange-700 mb-6">Network Security Features</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 text-xl mt-1">🔥</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Web Application Firewall</h4>
                      <p className="text-gray-600 text-sm">Advanced WAF protects against common web vulnerabilities and attack vectors.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 text-xl mt-1">🚦</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Rate Limiting</h4>
                      <p className="text-gray-600 text-sm">Intelligent rate limiting prevents abuse and protects against brute force attacks.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 text-xl mt-1">🔍</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Intrusion Detection</h4>
                      <p className="text-gray-600 text-sm">Real-time intrusion detection systems monitor for suspicious activity patterns.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-orange-500 text-xl mt-1">🔒</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Secure API Endpoints</h4>
                      <p className="text-gray-600 text-sm">All API communications are secured with proper authentication and encryption.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Compliance & Standards */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Security Standards & Compliance</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">🇪🇺</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">GDPR Compliant</h3>
                  <p className="text-gray-600 mb-4">Fully compliant with EU General Data Protection Regulation requirements for data protection and privacy.</p>
                  <div className="text-sm text-gray-500">
                    <div>• Data minimization</div>
                    <div>• Privacy by design</div>
                    <div>• Right to erasure</div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-4xl mb-4">🇺🇸</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">CCPA Ready</h3>
                  <p className="text-gray-600 mb-4">Adheres to California Consumer Privacy Act standards for consumer data protection.</p>
                  <div className="text-sm text-gray-500">
                    <div>• No data selling</div>
                    <div>• Opt-out compliance</div>
                    <div>• Data transparency</div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">SOC 2 Type II</h3>
                  <p className="text-gray-600 mb-4">Meets SOC 2 Type II standards for security, availability, and confidentiality of service organizations.</p>
                  <div className="text-sm text-gray-500">
                    <div>• Security controls</div>
                    <div>• Risk management</div>
                    <div>• System monitoring</div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-4xl mb-4">🏷️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">ISO 27001</h3>
                  <p className="text-gray-600 mb-4">Follows ISO 27001 information security management system standards.</p>
                  <div className="text-sm text-gray-500">
                    <div>• Information security</div>
                    <div>• Risk assessment</div>
                    <div>• Security controls</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Security Best Practices */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Security Best Practices</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-green-700 mb-6">User Security Recommendations</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 text-xl mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Use Strong Passwords</h4>
                        <p className="text-gray-600 text-sm">Always use complex passwords for any accounts that require them, though OneTimeEmail doesn't require passwords.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 text-xl mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Enable Two-Factor Authentication</h4>
                        <p className="text-gray-600 text-sm">Use 2FA whenever possible for accounts that support it to add an extra layer of security.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 text-xl mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Regular Security Updates</h4>
                        <p className="text-gray-600 text-sm">Keep your devices and applications updated with the latest security patches.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 text-xl mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Be Cautious with Links</h4>
                        <p className="text-gray-600 text-sm">Verify sender authenticity before clicking links in emails, even temporary ones.</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-blue-700 mb-6">Our Security Measures</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 text-xl mt-1">🔒</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Regular Security Audits</h4>
                        <p className="text-gray-600 text-sm">We conduct regular security assessments and penetration testing to identify vulnerabilities.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 text-xl mt-1">📊</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Vulnerability Monitoring</h4>
                        <p className="text-gray-600 text-sm">Continuous monitoring for security vulnerabilities and rapid response to emerging threats.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 text-xl mt-1">🔄</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Security Updates</h4>
                        <p className="text-gray-600 text-sm">Regular updates to all systems and dependencies to address security vulnerabilities.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-500 text-xl mt-1">👥</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">Access Control</h4>
                        <p className="text-gray-600 text-sm">Strict access controls and least-privilege principles for all system administrators.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Security Comparison */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How We Compare</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 p-4 text-left font-semibold">Security Feature</th>
                      <th className="border border-gray-300 p-4 text-center font-semibold">OneTimeEmail</th>
                      <th className="border border-gray-300 p-4 text-center font-semibold">Traditional Email</th>
                      <th className="border border-gray-300 p-4 text-center font-semibold">Other Temp Services</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-4 font-medium">End-to-End Encryption</td>
                      <td className="border border-gray-300 p-4 text-center text-green-600">✓</td>
                      <td className="border border-gray-300 p-4 text-center text-yellow-600">Partial</td>
                      <td className="border border-gray-300 p-4 text-center text-yellow-600">Partial</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-4 font-medium">Automatic Data Deletion</td>
                      <td className="border border-gray-300 p-4 text-center text-green-600">✓</td>
                      <td className="border border-gray-300 p-4 text-center text-red-600">✗</td>
                      <td className="border border-gray-300 p-4 text-center text-green-600">✓</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-4 font-medium">Zero User Tracking</td>
                      <td className="border border-gray-300 p-4 text-center text-green-600">✓</td>
                      <td className="border border-gray-300 p-4 text-center text-red-600">✗</td>
                      <td className="border border-gray-300 p-4 text-center text-red-600">✗</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-4 font-medium">No Data Collection</td>
                      <td className="border border-gray-300 p-4 text-center text-green-600">✓</td>
                      <td className="border border-gray-300 p-4 text-center text-red-600">✗</td>
                      <td className="border border-gray-300 p-4 text-center text-red-600">✗</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-4 font-medium">GDPR Compliant</td>
                      <td className="border border-gray-300 p-4 text-center text-green-600">✓</td>
                      <td className="border border-gray-300 p-4 text-center text-yellow-600">Partial</td>
                      <td className="border border-gray-300 p-4 text-center text-yellow-600">Partial</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-4 font-medium">Secure Infrastructure</td>
                      <td className="border border-gray-300 p-4 text-center text-green-600">✓</td>
                      <td className="border border-gray-300 p-4 text-center text-yellow-600">Partial</td>
                      <td className="border border-gray-300 p-4 text-center text-green-600">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Experience Enterprise-Grade Security</h2>
              <p className="text-xl mb-6 opacity-90">
                Trust your sensitive communications to OneTimeEmail's enterprise-grade security.
                Join thousands of security-conscious users who demand the highest protection standards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Military-Grade Encryption</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Automatic Data Deletion</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Zero-Tracking Policy</span>
                </div>
              </div>
              <Link
                href="/"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Try Secure Temporary Email
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
