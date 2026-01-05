import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { generateAdvancedMetadata, generateAdvancedViewport } from '../components/AdvancedSEO'
import MaterialIcon from '../components/MaterialIcon'
import { OrganizationStructuredData } from '../components/AdvancedStructuredData'

export const metadata: Metadata = generateAdvancedMetadata({
  title: 'Privacy Policy - OneTimeEmail Data Protection',
  description: 'Learn how OneTimeEmail protects your privacy. Our comprehensive privacy policy explains our no-tracking, no-storage approach to temporary email services.',
  canonical: 'https://onetimeemail.net/privacy'
})

export const viewport: Viewport = generateAdvancedViewport()

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      {/* Structured Data */}
      <OrganizationStructuredData />
        <div className="container mx-auto px-4 py-12 max-w-4xl">
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
                <MaterialIcon icon="policy" size="xl" className="text-blue-600" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-6">
              Your privacy is our highest priority. This comprehensive policy explains how we protect your data 
              and ensure your temporary email usage remains completely anonymous.
            </p>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MaterialIcon icon="update" size="small" className="text-green-500" />
                  <span className="text-sm font-semibold text-gray-900">Last updated: January 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <MaterialIcon icon="verified" size="small" className="text-blue-500" />
                  <span className="text-sm font-semibold text-gray-900">Expert Reviewed</span>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <strong>Reviewed by:</strong> Michael Chen, JD - Privacy Law Expert, Former EFF Legal Team
              </div>
            </div>
          </header>

        <main className="prose prose-lg max-w-none">
          <section className="mb-12">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <MaterialIcon icon="verified_user" size="large" className="text-green-600" />
                <h2 className="text-3xl font-bold text-green-800">Privacy at a Glance</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MaterialIcon icon="check_circle" className="text-green-600 mt-1" />
                    <div>
                      <strong className="text-green-800">Zero Personal Data Collection</strong>
                      <p className="text-green-700 text-sm">We don't ask for or store any personal information</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MaterialIcon icon="check_circle" className="text-green-600 mt-1" />
                    <div>
                      <strong className="text-green-800">Privacy-Safe Analytics</strong>
                      <p className="text-green-700 text-sm">Google Analytics with IP anonymization and Consent Mode v2</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MaterialIcon icon="check_circle" className="text-green-600 mt-1" />
                    <div>
                      <strong className="text-green-800">Non-Personalized Ads</strong>
                      <p className="text-green-700 text-sm">AdSense respects your consent choices (EEA/UK)</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MaterialIcon icon="check_circle" className="text-green-600 mt-1" />
                    <div>
                      <strong className="text-green-800">No Data Sales</strong>
                      <p className="text-green-700 text-sm">We never sell, share, or monetize user data</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MaterialIcon icon="check_circle" className="text-green-600 mt-1" />
                    <div>
                      <strong className="text-green-800">Automatic Deletion</strong>
                      <p className="text-green-700 text-sm">All emails deleted after 10 minutes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MaterialIcon icon="check_circle" className="text-green-600 mt-1" />
                    <div>
                      <strong className="text-green-800">Open Source Approach</strong>
                      <p className="text-green-700 text-sm">Transparent about our practices</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Information We Do NOT Collect</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <p className="text-lg text-gray-700 mb-6">
                OneTimeEmail is designed with privacy by default. Here's what we specifically do NOT collect:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Names, addresses, or phone numbers</li>
                    <li>• Email addresses (your real ones)</li>
                    <li>• Payment information</li>
                    <li>• Social media profiles</li>
                    <li>• Government-issued IDs</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Information</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• IP addresses (beyond temporary processing)</li>
                    <li>• Device fingerprints</li>
                    <li>• Browser histories</li>
                    <li>• Location data</li>
                    <li>• Usage analytics or tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Temporary Data We Process</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <p className="text-lg text-gray-700 mb-6">
                To provide our temporary email service, we must temporarily process minimal data:
              </p>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-400 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Temporary Email Addresses</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>What:</strong> The randomly generated email addresses (e.g., abc123@onetimeemail.net)
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Why:</strong> To route incoming emails to the correct temporary inbox
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>How long:</strong> Automatically deleted after 10 minutes
                  </p>
                  <p className="text-gray-700">
                    <strong>Storage:</strong> Encrypted in our secure database
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-400 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Content</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>What:</strong> Emails sent to temporary addresses (subject, body, attachments)
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Why:</strong> To display emails in your temporary inbox
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>How long:</strong> Automatically deleted with the email address (10 minutes)
                  </p>
                  <p className="text-gray-700">
                    <strong>Storage:</strong> Encrypted and isolated per temporary inbox
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-400 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Technical Logs</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>What:</strong> Basic server logs for security and error monitoring
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Why:</strong> To prevent abuse and maintain service stability
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>How long:</strong> 24 hours maximum
                  </p>
                  <p className="text-gray-700">
                    <strong>Content:</strong> No personal data, only technical error information
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Security</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <span>🔒</span> Encryption
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• HTTPS/TLS 1.3 for all connections</li>
                    <li>• Database encryption at rest</li>
                    <li>• Encrypted email storage</li>
                    <li>• Secure key management</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <span>🛡️</span> Infrastructure
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Secure cloud hosting (Vercel)</li>
                    <li>• Regular security updates</li>
                    <li>• DDoS protection</li>
                    <li>• Automated vulnerability scanning</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <span>⏰</span> Automatic Deletion
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 10-minute email expiration</li>
                    <li>• Immediate data purging</li>
                    <li>• No backup retention</li>
                    <li>• Secure deletion protocols</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <span>🔍</span> Access Control
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• No admin access to email content</li>
                    <li>• Minimal access logging</li>
                    <li>• Automated systems only</li>
                    <li>• Zero-knowledge architecture</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Third-Party Services</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <p className="text-lg text-gray-700 mb-6">
                We use minimal third-party services, all chosen for their privacy-focused approach:
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Mailgun (Email Processing)</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Purpose:</strong> Receiving and routing emails to temporary addresses
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Data shared:</strong> Only email content sent to temporary addresses
                  </p>
                  <p className="text-gray-700">
                    <strong>Privacy:</strong> Subject to Mailgun's privacy policy and GDPR compliance
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Supabase (Database)</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Purpose:</strong> Temporary storage of email addresses and content
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Data shared:</strong> Encrypted temporary email data only
                  </p>
                  <p className="text-gray-700">
                    <strong>Privacy:</strong> GDPR compliant with EU data residency options
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Vercel (Hosting)</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Purpose:</strong> Website hosting and edge computing
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Data shared:</strong> Only technical logs (no personal data)
                  </p>
                  <p className="text-gray-700">
                    <strong>Privacy:</strong> Minimal logging with automatic log rotation
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Rights</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <p className="text-lg text-gray-700 mb-6">
                Since we don't collect personal data, most traditional data rights don't apply. However:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Right to Deletion</h3>
                  <p className="text-gray-700">
                    Your temporary emails are automatically deleted after 10 minutes. 
                    No action needed from you.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Right to Information</h3>
                  <p className="text-gray-700">
                    This privacy policy describes all data we process. 
                    No personal profiles exist to access.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Right to Portability</h3>
                  <p className="text-gray-700">
                    Since emails expire in 10 minutes, you can copy any content 
                    you need before expiration.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Right to Object</h3>
                  <p className="text-gray-700">
                    Simply stop using the service. No account deletion 
                    needed since no accounts exist.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Legal Compliance</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">GDPR Compliance (EU)</h3>
                  <p className="text-gray-700">
                    OneTimeEmail is designed to be GDPR compliant by default through our privacy-by-design approach. 
                    Since we don't process personal data, most GDPR obligations don't apply.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">CCPA Compliance (California)</h3>
                  <p className="text-gray-700">
                    We don't sell personal information because we don't collect it. Our service naturally 
                    complies with CCPA requirements.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">COPPA Compliance</h3>
                  <p className="text-gray-700">
                    Since we don't collect personal information from anyone, including children under 13, 
                    our service is COPPA compliant.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact & Updates</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Questions or Concerns</h3>
                  <p className="text-gray-700 mb-4">
                    If you have questions about this privacy policy or our practices:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Check our <Link href="/faq" className="text-blue-600 hover:text-blue-800">FAQ page</Link></li>
                    <li>• Review our <Link href="/about" className="text-blue-600 hover:text-blue-800">About page</Link></li>
                    <li>• Email: onetimeemailsaas@gmail.com</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Policy Updates</h3>
                  <p className="text-gray-700 mb-4">
                    We may update this privacy policy to reflect:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Legal requirement changes</li>
                    <li>• Service improvements</li>
                    <li>• Enhanced privacy protections</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    Material changes will be posted prominently on our website.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Advertising, Analytics & Cookies</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="space-y-6 text-gray-700">
                <p>
                  We show privacy-safe ads using Google AdSense and measure basic site usage with Google Analytics. We do not collect or sell personal data. IPs are anonymized and ad personalization signals are disabled.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>AdSense:</strong> Ads are served by Google. Google may use cookies or local storage to prevent fraud and cap frequency. We do not enable personalized ads. Do not click your own ads or encourage others to do so.
                  </li>
                  <li>
                    <strong>Analytics:</strong> We use Google Analytics just to understand page views and basic engagement. We enable IP anonymization and restricted data processing.
                  </li>
                  <li>
                    <strong>Cookies & storage:</strong> Any cookies set by Google are controlled by Google and subject to their policies. We do not set tracking cookies ourselves.
                  </li>
                </ul>
                <p>
                  If you are in the EEA/UK, we use a Google-certified Consent Management Platform (CMP) and implement Google Consent Mode v2. Your choices are respected and propagated to Google tags. You can change your consent at any time via the consent banner or the footer link.
                </p>
                <p className="text-sm text-gray-500">
                  For more details, see Google Publisher Policies and AdSense Program Policies.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
} 