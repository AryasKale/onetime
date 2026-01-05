import { Metadata } from 'next'
import Link from 'next/link'
import MaterialIcon from '../components/MaterialIcon'
import { FAQStructuredData, BreadcrumbStructuredData } from '../components/AdvancedStructuredData'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | OneTimeEmail Privacy & Security FAQ',
  description: 'Get answers to common questions about email privacy, temporary email services, digital security, and privacy protection. Expert answers from cybersecurity professionals.',
  keywords: ['email privacy FAQ', 'temporary email questions', 'digital security help', 'privacy protection guide', 'cybersecurity FAQ'],
}

const faqData = [
  {
    question: "How do temporary email addresses protect my privacy?",
    answer: "Temporary email addresses act as a protective barrier between your real identity and online services. They prevent companies from building profiles about you, reduce spam in your primary inbox, eliminate long-term data retention risks, and allow you to maintain anonymity when signing up for services you may only use briefly."
  },
  {
    question: "Are temporary emails secure for important account verifications?",
    answer: "Yes, temporary emails are secure for account verifications, but use them strategically. They're perfect for trial accounts, newsletter signups, one-time downloads, and services you're testing. However, avoid using them for critical accounts like banking, primary social media, or work-related services that you'll need long-term access to."
  },
  {
    question: "What happens to my emails after the 10-minute expiration?",
    answer: "After 10 minutes, all emails and associated data are permanently deleted from our servers using secure deletion protocols. This includes the email content, metadata, attachments, and any trace of the temporary address. The deletion is irreversible and ensures no residual data remains that could compromise your privacy."
  },
  {
    question: "Can I extend the expiration time of my temporary email?",
    answer: "Our standard service provides 10-minute expiration for optimal privacy protection. This timeframe is designed to allow sufficient time for account verification while minimizing data exposure risks. For users who need longer-lasting temporary addresses, we recommend using email alias services or creating dedicated accounts with secure providers."
  },
  {
    question: "How does OneTimeEmail compare to other temporary email services?",
    answer: "OneTimeEmail stands out through expert-driven privacy education, comprehensive security guides, professional team credentials, educational focus beyond just tools, regular content updates from cybersecurity experts, and transparent privacy practices with no tracking or data collection."
  },
  {
    question: "Is it legal to use temporary email addresses?",
    answer: "Yes, using temporary email addresses is completely legal in most jurisdictions. They're a legitimate privacy protection tool. However, you should avoid using them to violate terms of service, create multiple accounts where prohibited, engage in fraudulent activities, or circumvent legal restrictions. Always use temporary emails ethically and in compliance with applicable laws."
  },
  {
    question: "What email providers work best with temporary email services?",
    answer: "For your primary email security, we recommend secure providers like ProtonMail (zero-knowledge encryption, Swiss privacy laws), Tutanota (open-source, end-to-end encryption), Fastmail (privacy-focused, excellent features), or custom domains with secure hosting. Avoid using temporary emails as your only email solution."
  },
  {
    question: "How can I protect my primary email address from spam?",
    answer: "Protect your primary email through compartmentalization (different emails for different purposes), using temporary emails for signups and trials, enabling strong spam filters, never sharing your primary email publicly, using email aliases for online shopping, and regularly reviewing and unsubscribing from unwanted lists."
  },
  {
    question: "What should I do if a temporary email doesn't receive verification emails?",
    answer: "If verification emails aren't arriving, check that you've copied the temporary address correctly, ensure the sending service isn't blocked, wait a few minutes as some services have delays, try refreshing the inbox page, or generate a new temporary address if the current one has expired."
  },
  {
    question: "Are there any services that block temporary email addresses?",
    answer: "Some services do block known temporary email domains to prevent abuse. This is more common with financial services, premium platforms, and services requiring long-term engagement. If blocked, consider using email alias services, creating a dedicated secondary email account, or using privacy-focused email providers with custom domains."
  },
  {
    question: "How do I implement email security best practices?",
    answer: "Implement comprehensive email security by using strong, unique passwords with a password manager, enabling two-factor authentication on all accounts, choosing secure email providers with encryption, compartmentalizing email usage by purpose, regularly updating email client software, being cautious with email attachments and links, and using temporary emails for non-essential signups."
  },
  {
    question: "What are the privacy laws that protect email communications?",
    answer: "Email privacy is protected by various laws including GDPR in Europe (data protection and privacy rights), CCPA in California (consumer privacy rights), ECPA in the US (electronic communications privacy), and various national data protection laws. These laws generally require consent for data collection, provide rights to data deletion, and mandate security measures for personal data."
  }
]

const breadcrumbItems = [
  { name: "Home", url: "https://onetimeemail.net/" },
  { name: "FAQ", url: "https://onetimeemail.net/faq-advanced" }
]

export default function AdvancedFAQPage() {
  return (
    <>
      {/* Structured Data */}
      <FAQStructuredData faqs={faqData} />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      
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
              <div className="bg-blue-100 rounded-full p-4">
                <MaterialIcon icon="help" size="xl" className="text-blue-600" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Get expert answers to common questions about email privacy, temporary email services, 
              and digital security. All answers reviewed by our cybersecurity professionals.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <MaterialIcon icon="verified" size="small" className="text-green-500" />
                Expert Reviewed
              </span>
              <span className="flex items-center gap-2">
                <MaterialIcon icon="update" size="small" className="text-blue-500" />
                Updated Monthly
              </span>
              <span className="flex items-center gap-2">
                <MaterialIcon icon="search" size="small" className="text-purple-500" />
                Searchable Content
              </span>
            </div>
          </header>

          {/* Search Box */}
          <section className="mb-12">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <MaterialIcon icon="search" className="text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Search FAQ</h2>
                </div>
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Search for answers about privacy, security, temporary emails..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <MaterialIcon icon="search" className="text-gray-400 hover:text-blue-600" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Categories */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
              <p className="text-xl text-gray-600">Find answers organized by topic</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="#email-privacy" className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:scale-105 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MaterialIcon icon="email" size="large" className="text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Email Privacy</h3>
                <p className="text-gray-600 text-sm">Temporary emails, security, protection</p>
              </Link>

              <Link href="#technical" className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:scale-105 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MaterialIcon icon="settings" size="large" className="text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Technical</h3>
                <p className="text-gray-600 text-sm">How it works, troubleshooting</p>
              </Link>

              <Link href="#legal" className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:scale-105 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MaterialIcon icon="gavel" size="large" className="text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Legal & Compliance</h3>
                <p className="text-gray-600 text-sm">Laws, regulations, rights</p>
              </Link>

              <Link href="#best-practices" className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:scale-105 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MaterialIcon icon="star" size="large" className="text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Best Practices</h3>
                <p className="text-gray-600 text-sm">Tips, recommendations, guides</p>
              </Link>
            </div>
          </section>

          {/* FAQ Items */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <MaterialIcon icon="help_outline" className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          {faq.question}
                        </h3>
                        <div className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Still Have Questions */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
              <div className="max-w-3xl mx-auto">
                <div className="flex justify-center mb-6">
                  <div className="bg-white/20 rounded-full p-4">
                    <MaterialIcon icon="support_agent" size="xl" className="text-white" />
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Still Have Questions?</h2>
                <p className="text-xl text-blue-100 mb-8">
                  Can't find the answer you're looking for? Our expert team is here to help with personalized advice.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link 
                    href="/community"
                    className="inline-flex items-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
                  >
                    <MaterialIcon icon="forum" />
                    <span>Ask in Community</span>
                  </Link>
                  
                  <Link 
                    href="/contact"
                    className="inline-flex items-center gap-3 bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-colors border-2 border-white/30"
                  >
                    <MaterialIcon icon="email" />
                    <span>Contact Experts</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Related Resources */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Resources</h2>
              <p className="text-xl text-gray-600">Explore more privacy and security content</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link href="/articles/email-privacy-complete-guide-2025" className="block">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:scale-105">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <MaterialIcon icon="security" className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Complete Privacy Guide</h3>
                  <p className="text-gray-600">Comprehensive guide to email privacy and security in 2025</p>
                </div>
              </Link>

              <Link href="/learn" className="block">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:scale-105">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <MaterialIcon icon="school" className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Learning Center</h3>
                  <p className="text-gray-600">Interactive courses and tutorials on privacy protection</p>
                </div>
              </Link>

              <Link href="/tools/privacy-assessment" className="block">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:scale-105">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <MaterialIcon icon="assessment" className="text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy Assessment</h3>
                  <p className="text-gray-600">Evaluate your digital privacy posture with expert tools</p>
                </div>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  )
}
