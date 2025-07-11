import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { generateAdvancedMetadata, generateAdvancedViewport } from '../components/AdvancedSEO'

export const metadata: Metadata = generateAdvancedMetadata({
  title: 'Terms of Service - OneTimeEmail Usage Terms',
  description: 'Read OneTimeEmail Terms of Service. Understand our service terms, usage policies, and user responsibilities for temporary email services.',
  canonical: 'https://onetimeemail.net/terms'
})

export const viewport: Viewport = generateAdvancedViewport()

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Please read these terms carefully before using OneTimeEmail. By using our service, 
            you agree to be bound by these terms and conditions.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            Last updated: January 2024
          </div>
        </header>

        <main className="prose prose-lg max-w-none">
          <section className="mb-12">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Terms Summary</h2>
              <ul className="space-y-2 text-blue-700">
                <li>✓ <strong>Free service</strong> - OneTimeEmail is completely free to use</li>
                <li>✓ <strong>No registration required</strong> - Use our service anonymously</li>
                <li>✓ <strong>Temporary nature</strong> - Emails automatically expire after 10 minutes</li>
                <li>✓ <strong>No guarantees</strong> - Service provided "as is" without warranties</li>
                <li>✓ <strong>Fair use</strong> - Use responsibly and don't abuse the service</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Service Description</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What We Provide</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                OneTimeEmail provides a temporary email service that allows users to generate 
                disposable email addresses for receiving emails. Our service is designed to 
                protect user privacy and reduce spam in primary email accounts.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Generation of temporary email addresses</li>
                <li>• 10-minute email lifespan</li>
                <li>• Real-time email receiving and display</li>
                <li>• Automatic deletion of emails and data</li>
                <li>• No registration or personal information required</li>
                <li>• Free access to all features</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Acceptable Use Policy</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="text-green-500">✓</span> Permitted Uses
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Website registrations and signups</li>
                    <li>• Testing email functionality</li>
                    <li>• Accessing content that requires email verification</li>
                    <li>• Receiving newsletters and promotions</li>
                    <li>• One-time email verifications</li>
                    <li>• Protecting privacy during online activities</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="text-red-500">✗</span> Prohibited Uses
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Illegal activities or fraud</li>
                    <li>• Spamming or sending unsolicited emails</li>
                    <li>• Harassment or abusive behavior</li>
                    <li>• Circumventing security measures</li>
                    <li>• Creating multiple accounts to abuse services</li>
                    <li>• Any activity that violates applicable laws</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">3. User Responsibilities</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Compliance with Laws</h3>
                  <p className="text-gray-700">
                    Users must comply with all applicable local, state, national, and international 
                    laws and regulations when using OneTimeEmail. Users are solely responsible for 
                    ensuring their use of the service is legal in their jurisdiction.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Respect for Others</h3>
                  <p className="text-gray-700">
                    Users must not use our service to harass, abuse, or harm others. This includes 
                    but is not limited to sending threatening messages, engaging in fraud, or 
                    violating others' privacy rights.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">System Integrity</h3>
                  <p className="text-gray-700">
                    Users must not attempt to compromise the security or integrity of our systems. 
                    This includes attempting to gain unauthorized access, introducing malware, or 
                    interfering with the service's operation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Service Limitations</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Availability</h3>
                  <p className="text-gray-700">
                    While we strive to provide reliable service, OneTimeEmail is provided "as is" 
                    without guarantees of uptime or availability. We may experience downtime for 
                    maintenance, updates, or technical issues.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Email Delivery</h3>
                  <p className="text-gray-700">
                    We cannot guarantee that all emails will be delivered or received. Some emails 
                    may be blocked by spam filters, size limitations, or other technical restrictions. 
                    We are not responsible for failed email deliveries.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Retention</h3>
                  <p className="text-gray-700">
                    All emails and associated data are automatically deleted after 10 minutes. 
                    We do not provide data recovery services, and users are responsible for 
                    saving any important information before expiration.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Privacy and Data Protection</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <p className="text-gray-700 leading-relaxed mb-4">
                Our privacy practices are detailed in our Privacy Policy. By using OneTimeEmail, 
                you acknowledge that you have read and understood our privacy practices.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Key Privacy Points:</h3>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• We don't collect personal information</li>
                  <li>• No user tracking or analytics</li>
                  <li>• Automatic data deletion after 10 minutes</li>
                  <li>• No data sharing with third parties</li>
                  <li>• Secure encryption for all communications</li>
                </ul>
              </div>
              
              <p className="text-gray-700 mt-4">
                For complete privacy information, please read our 
                <Link href="/privacy" className="text-blue-600 hover:text-blue-800 font-medium ml-1">
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Intellectual Property</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Rights</h3>
                  <p className="text-gray-700">
                    OneTimeEmail, its logo, design, and all related intellectual property are owned 
                    by us or our licensors. Users may not copy, modify, distribute, or create 
                    derivative works based on our service without explicit permission.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">User Content</h3>
                  <p className="text-gray-700">
                    Users retain ownership of any content they receive through our service. However, 
                    by using OneTimeEmail, users acknowledge that all content is temporary and will 
                    be automatically deleted after 10 minutes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Disclaimers and Limitations</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">No Warranties</h3>
                  <p className="text-gray-700">
                    OneTimeEmail is provided "as is" without warranties of any kind, either express 
                    or implied. We disclaim all warranties, including but not limited to warranties 
                    of merchantability, fitness for a particular purpose, and non-infringement.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
                  <p className="text-gray-700">
                    To the fullest extent permitted by law, we shall not be liable for any indirect, 
                    incidental, special, consequential, or punitive damages arising from your use 
                    of OneTimeEmail, including but not limited to loss of data, loss of profits, 
                    or business interruption.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Termination</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">User Termination</h3>
                  <p className="text-gray-700">
                    Users may stop using OneTimeEmail at any time. No account deletion is required 
                    since we don't maintain user accounts. Simply close your browser or navigate 
                    away from our service.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Termination</h3>
                  <p className="text-gray-700">
                    We reserve the right to terminate, suspend, or restrict access to our service 
                    at any time, with or without notice, for any reason including violation of 
                    these terms or technical requirements.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Changes to Terms</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update these Terms of Service from time to time to reflect changes in 
                our service, legal requirements, or business practices. Material changes will 
                be posted prominently on our website.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Your continued use of OneTimeEmail after any changes constitutes acceptance of 
                the new terms. If you do not agree with the updated terms, please discontinue 
                use of our service.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">How We Notify Users:</h3>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Prominent notice on our website</li>
                  <li>• Updated "Last Modified" date</li>
                  <li>• Email notification for major changes (if applicable)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">10. Contact Information</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions about these Terms of Service or need to report a violation, 
                please contact us:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">General Questions</h3>
                  <p className="text-gray-700">Email: support@onetimeemail.net</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Legal Issues</h3>
                  <p className="text-gray-700">Email: legal@onetimeemail.net</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">Abuse Reports</h3>
                  <p className="text-gray-700">Email: abuse@onetimeemail.net</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">11. Governing Law</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms of Service are governed by and construed in accordance with the laws 
                of the jurisdiction in which OneTimeEmail operates, without regard to conflict 
                of law principles.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Any disputes arising from these terms or your use of OneTimeEmail shall be 
                resolved through binding arbitration in accordance with the rules of the 
                applicable arbitration association.
              </p>
            </div>
          </section>
        </main>

        <div className="text-center bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white mb-16">
          <h2 className="text-2xl font-bold mb-4">Ready to Use OneTimeEmail?</h2>
          <p className="text-lg mb-6 opacity-90">
            By using our service, you agree to these terms and can start protecting your privacy immediately.
          </p>
          <Link 
            href="/"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Generate Your First Email
          </Link>
        </div>


      </div>
    </div>
  )
} 