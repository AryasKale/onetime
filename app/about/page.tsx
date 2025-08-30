import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { generateAdvancedMetadata, generateAdvancedViewport } from '../components/AdvancedSEO'
import Breadcrumbs from '../components/Breadcrumbs'

export const metadata: Metadata = generateAdvancedMetadata({
  title: 'About OneTimeEmail - Our Mission & Values',
  description: 'Learn about OneTimeEmail\'s mission to protect privacy through secure temporary email services. Discover our commitment to user privacy and data protection.',
  canonical: 'https://onetimeemail.net/about'
})

export const viewport: Viewport = generateAdvancedViewport()

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About OneTimeEmail
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We're on a mission to protect your privacy and keep your inbox clean through secure, 
            reliable temporary email services.
          </p>
        </header>

        <Breadcrumbs items={[
          { label: 'About Us', href: '/about', current: true }
        ]} />

        <main>
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission & Vision</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Birth of OneTimeEmail</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  OneTimeEmail was born from a simple yet profound realization: in the digital age, our email addresses have become extensions of our personal identities. Every online interaction requires this crucial piece of personal information, yet the consequences of sharing it freely are often overlooked or underestimated.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Our founders recognized that the current email ecosystem creates an imbalance of power. Users are forced to choose between convenience and privacy, often sacrificing their personal data for access to digital services. This fundamental flaw in the system inspired us to create a solution that empowers users to maintain control over their digital footprint.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  What started as a simple idea has evolved into a comprehensive platform dedicated to protecting digital privacy. We believe that privacy should be the default, not an optional add-on, and that users should never have to compromise their personal information for basic online functionality.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Core Mission</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  At OneTimeEmail, our mission is to democratize digital privacy by providing accessible, secure, and user-friendly temporary email solutions. We are committed to creating a digital environment where users can interact with online services without fear of data exploitation, spam accumulation, or privacy invasion.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  We envision a world where privacy is not a privilege reserved for the technically savvy, but a fundamental right available to everyone. Our service bridges the gap between technological complexity and user-friendly accessibility, making advanced privacy protection available to users of all technical backgrounds.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Privacy Philosophy</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Our privacy philosophy is built on three fundamental principles: transparency, minimalism, and user control. We believe that privacy protection should be transparent - users should understand exactly how their data is handled and why. Our minimalist approach means we collect only what is absolutely necessary for service functionality, and our commitment to user control ensures that individuals maintain complete authority over their digital interactions.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  This philosophy extends beyond our service offerings to influence every aspect of our operations. From development practices to customer communication, privacy-first thinking guides our decision-making process and ensures that user protection remains our highest priority.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Privacy First</h3>
                  <p className="text-gray-600">Your privacy is our top priority. We don't track, store, or sell your data, and we employ zero-knowledge architecture to protect your information.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Access</h3>
                  <p className="text-gray-600">Get temporary emails instantly without registration or personal information. Our service is designed for immediate use without any barriers or delays.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🛡️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure by Design</h3>
                  <p className="text-gray-600">Built with security in mind from the ground up, using industry-standard encryption, secure infrastructure, and proactive threat mitigation.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why We Built OneTimeEmail</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Problem</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">❌</span>
                      <span>Email addresses collected for marketing spam</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">❌</span>
                      <span>Personal data sold to third parties</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">❌</span>
                      <span>Cluttered inboxes from unwanted subscriptions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">❌</span>
                      <span>Identity theft and privacy breaches</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">❌</span>
                      <span>Forced registrations for simple downloads</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Solution</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✅</span>
                      <span>Temporary emails that self-destruct</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✅</span>
                      <span>No personal data collection or tracking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✅</span>
                      <span>Keep your real inbox clean and organized</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✅</span>
                      <span>Protect your identity and privacy online</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✅</span>
                      <span>Access services without commitment</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The Problems We Solve</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Privacy Crisis in Digital Communication</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  In an era where digital communication has become ubiquitous, the traditional email system has revealed significant vulnerabilities. Personal email addresses have become valuable commodities, traded between companies and exploited by malicious actors. This has created an environment where users must constantly weigh the benefits of online services against the risks to their personal privacy.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  The current email ecosystem suffers from several systemic issues: permanent data retention, widespread tracking, spam proliferation, and insufficient user control. These problems have created a privacy crisis that affects millions of internet users worldwide, leading to increased instances of identity theft, data breaches, and unwanted marketing intrusion.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Breaking Down the Challenges</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-semibold text-red-700 mb-3">Data Collection & Exploitation</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Websites collect emails for marketing databases</li>
                      <li>• Personal data sold to third parties without consent</li>
                      <li>• Creation of detailed user profiles for advertising</li>
                      <li>• Lack of transparency in data usage practices</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-red-700 mb-3">Security & Privacy Risks</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Increased vulnerability to phishing attacks</li>
                      <li>• Potential for identity theft and fraud</li>
                      <li>• Permanent storage of sensitive information</li>
                      <li>• Cross-site tracking and behavioral analysis</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-red-700 mb-3">User Experience Issues</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Inbox clutter from unwanted marketing emails</li>
                      <li>• Difficulty managing multiple service subscriptions</li>
                      <li>• Loss of control over personal communication channels</li>
                      <li>• Forced registration for simple online interactions</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-red-700 mb-3">Technical Limitations</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• No built-in expiration mechanisms</li>
                      <li>• Lack of temporary communication options</li>
                      <li>• Insufficient privacy controls for users</li>
                      <li>• Reliance on third-party email providers</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-blue-900 mb-4">Our Solution: A New Paradigm</h3>
                <p className="text-lg text-blue-800 leading-relaxed mb-4">
                  OneTimeEmail addresses these fundamental problems by introducing a revolutionary approach to email communication. Our service provides users with temporary, self-destructing email addresses that offer complete privacy protection while maintaining full functionality for legitimate online activities.
                </p>
                <p className="text-lg text-blue-800 leading-relaxed">
                  By implementing automatic expiration, zero-data-retention policies, and user-controlled privacy settings, we create a secure communication environment that puts users back in control of their digital interactions. This approach not only solves immediate privacy concerns but also establishes a new standard for how email services should protect user data.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Commitment to Excellence</h2>
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Building Trust Through Transparency</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  At OneTimeEmail, we believe that trust is the foundation of any relationship, especially when it comes to handling sensitive user data. Our commitment to transparency means we openly share our practices, security measures, and operational procedures. We provide clear documentation about how our service works, what data we handle (and what we don't), and how we protect user privacy.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  This transparency extends to our development process, where we maintain open communication about updates, security improvements, and feature enhancements. Users can trust that we're not hiding behind vague privacy policies or technical jargon - we believe in clear, honest communication about our service and practices.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-3">
                    <span className="text-2xl">🔐</span> Enterprise-Grade Data Protection
                  </h3>
                  <p className="text-blue-800 leading-relaxed mb-4">
                    Our data protection strategy goes beyond industry standards. We employ multiple layers of security including end-to-end encryption, secure cloud infrastructure, regular security audits, and automated threat detection systems. Every temporary email address is isolated in its own secure container, preventing any cross-contamination of data.
                  </p>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Military-grade encryption for all data</li>
                    <li>• Regular third-party security assessments</li>
                    <li>• Automated vulnerability scanning</li>
                    <li>• Secure deletion protocols</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-4 flex items-center gap-3">
                    <span className="text-2xl">🚫</span> Zero-Tracking Guarantee
                  </h3>
                  <p className="text-green-800 leading-relaxed mb-4">
                    We maintain a strict zero-tracking policy that ensures user privacy at every level. Unlike many online services that track user behavior for analytics or marketing purposes, OneTimeEmail operates on a no-tracking, no-logging, no-profiling model. We don't collect IP addresses, browser fingerprints, or usage patterns.
                  </p>
                  <ul className="text-green-700 space-y-1">
                    <li>• No cookies or tracking pixels</li>
                    <li>• No behavioral analytics</li>
                    <li>• No user profiling or data mining</li>
                    <li>• Anonymous service usage</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-purple-900 mb-4 flex items-center gap-3">
                    <span className="text-2xl">🌍</span> Free Access for All
                  </h3>
                  <p className="text-purple-800 leading-relaxed mb-4">
                    Privacy protection should never be a luxury reserved for those who can afford it. Our commitment to free access means that OneTimeEmail remains completely free to use, with no registration and no paywalls for core features. We support the service with non-personalized ads that respect user consent.
                  </p>
                  <ul className="text-purple-700 space-y-1">
                    <li>• No registration or signup fees</li>
                    <li>• No premium feature restrictions for core use</li>
                    <li>• Supported by non-personalized advertising</li>
                    <li>• Equal access for all users</li>
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-orange-900 mb-4 flex items-center gap-3">
                    <span className="text-2xl">⚡</span> Continuous Innovation
                  </h3>
                  <p className="text-orange-800 leading-relaxed mb-4">
                    The digital landscape is constantly evolving, and so are the threats to user privacy. Our commitment to continuous innovation means we're always researching new privacy protection techniques, implementing enhanced security measures, and improving user experience. We regularly update our infrastructure, adopt new security standards, and enhance our service based on user feedback and emerging privacy needs.
                  </p>
                  <ul className="text-orange-700 space-y-1">
                    <li>• Regular security updates and patches</li>
                    <li>• Adoption of latest privacy technologies</li>
                    <li>• User-driven feature improvements</li>
                    <li>• Proactive threat mitigation</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Long-Term Vision</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Looking ahead, OneTimeEmail is committed to leading the evolution of privacy-focused digital communication. We envision a future where privacy is not an afterthought but the fundamental principle guiding all digital interactions. Our goal is to set new standards for privacy protection in the tech industry and inspire other companies to adopt similar user-centric approaches.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  As we grow and evolve, our core principles remain unchanged: protecting user privacy, maintaining transparency, and ensuring accessibility. These commitments form the bedrock of our service and guide every decision we make, from technical implementations to business strategies.
                </p>
              </div>
            </div>
          </section>



          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Get Started Today</h2>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Protect Your Privacy?</h3>
              <p className="text-xl mb-6 opacity-90">
                Start using OneTimeEmail today and take control of your digital privacy.
              </p>
              <Link 
                href="/"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Generate Your First Temporary Email
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
} 