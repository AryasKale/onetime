import { Metadata } from 'next'
import Link from 'next/link'
import InboxGeneratorWrapper from './components/InboxGeneratorWrapper'
import StructuredData, { ServiceStructuredData } from './components/StructuredData'
import { StatCard, BenefitCard, ProcessStep } from './components/VisualElements'
import MaterialIcon from './components/MaterialIcon'

export const metadata: Metadata = {
  title: 'Email Privacy Guide & Temporary Email Resources | OneTimeEmail',
  description: 'Complete guide to email privacy, security, and digital protection. Learn advanced techniques, get expert insights, and access free temporary email tools for ultimate online privacy.',
  keywords: [
    'email privacy guide',
    'digital security education',
    'online privacy protection',
    'temporary email guide',
    'email security best practices',
    'privacy protection resources',
    'digital identity protection',
    'cybersecurity education',
    'email anonymity techniques',
    'online safety guide'
  ],
  openGraph: {
    title: 'Email Privacy Guide & Temporary Email Resources | OneTimeEmail',
    description: 'Complete guide to email privacy, security, and digital protection. Learn advanced techniques and access free privacy tools.',
    url: 'https://onetimeemail.net/',
    siteName: 'OneTimeEmail',
    type: 'website',
    images: [
      {
        url: 'https://onetimeemail.net/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OneTimeEmail - Email Privacy Guide & Resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Email Privacy Guide & Resources - OneTimeEmail',
    description: 'Complete guide to email privacy, security, and digital protection. Learn advanced techniques and access free privacy tools.',
    images: ['https://onetimeemail.net/og-image.jpg'],
  },
}

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData type="website" data={{}} />
      <ServiceStructuredData />

    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        
        {/* Hero Section - Content First */}
        <header className="mb-16 md:mb-24">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-8">
              <div className="bg-blue-100 rounded-full p-4">
                <MaterialIcon icon="security" size="xl" className="text-blue-600" />
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              The Complete Email Privacy Guide
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Master email security, protect your digital identity, and learn advanced privacy techniques from cybersecurity experts. 
              Comprehensive guides, real-world case studies, and professional tools for ultimate online protection.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <MaterialIcon icon="school" className="text-white" />
                <span>Start Learning</span>
              </Link>
              
              <Link 
                href="#email-tool"
                className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <MaterialIcon icon="build" className="text-blue-600" />
                <span>Try Free Tool</span>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <MaterialIcon icon="verified" size="small" className="text-green-500" />
                Expert-Verified Content
              </span>
              <span className="flex items-center gap-2">
                <MaterialIcon icon="update" size="small" className="text-blue-500" />
                Updated Weekly
              </span>
              <span className="flex items-center gap-2">
                <MaterialIcon icon="group" size="small" className="text-purple-500" />
                10,000+ Readers
              </span>
            </div>
          </div>
        </header>

        {/* Featured Educational Content */}
        <section className="mb-16 md:mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Master Email Privacy & Security
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guides and expert insights to protect your digital identity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Guide 1 */}
            <article className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <MaterialIcon icon="shield" size="large" className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Email Security Fundamentals
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Learn the essential principles of email security, from encryption basics to advanced threat protection. 
                  Understand how cybercriminals exploit email vulnerabilities and how to defend yourself.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <MaterialIcon icon="schedule" size="small" />
                    15 min read
                  </span>
                  <span className="flex items-center gap-1">
                    <MaterialIcon icon="trending_up" size="small" />
                    Expert Level
                  </span>
                </div>
                <Link 
                  href="/articles/email-security-guide"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                >
                  Read Complete Guide
                  <MaterialIcon icon="arrow_forward" size="small" className="ml-2" />
                </Link>
              </div>
            </article>

            {/* Featured Guide 2 */}
            <article className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <MaterialIcon icon="psychology" size="large" className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Digital Identity Protection
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Master advanced techniques for protecting your digital identity across all platforms. 
                  Real case studies from privacy experts and step-by-step implementation guides.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <MaterialIcon icon="schedule" size="small" />
                    22 min read
                  </span>
                  <span className="flex items-center gap-1">
                    <MaterialIcon icon="star" size="small" />
                    Most Popular
                  </span>
                </div>
                <Link 
                  href="/articles/digital-identity-protection-masterclass"
                  className="inline-flex items-center text-green-600 hover:text-green-800 font-semibold transition-colors"
                >
                  Read Complete Guide
                  <MaterialIcon icon="arrow_forward" size="small" className="ml-2" />
                </Link>
              </div>
            </article>

            {/* Featured Guide 3 */}
            <article className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <MaterialIcon icon="business_center" size="large" className="text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Business Email Security
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Comprehensive checklist and best practices for enterprise email security. 
                  Protect your organization from phishing, data breaches, and compliance violations.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <MaterialIcon icon="schedule" size="small" />
                    18 min read
                  </span>
                  <span className="flex items-center gap-1">
                    <MaterialIcon icon="work" size="small" />
                    Professional
                  </span>
                </div>
                <Link 
                  href="/articles/business-email-security-checklist"
                  className="inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold transition-colors"
                >
                  Read Complete Guide
                  <MaterialIcon icon="arrow_forward" size="small" className="ml-2" />
                </Link>
              </div>
            </article>
          </div>
        </section>

        {/* Expert Insights Section */}
        <section className="mb-16 md:mb-24">
          <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 rounded-full p-4">
                  <MaterialIcon icon="verified_user" size="xl" className="text-white" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Expert-Verified Privacy Insights
              </h2>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Our content is created and reviewed by cybersecurity professionals, privacy advocates, 
                and digital rights experts with over 50 years of combined experience in information security.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">15+</div>
                  <div className="text-blue-200">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">50K+</div>
                  <div className="text-blue-200">Monthly Readers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">200+</div>
                  <div className="text-blue-200">Articles Published</div>
                </div>
              </div>

              <Link 
                href="/about"
                className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <MaterialIcon icon="info" className="text-gray-900" />
                <span>Meet Our Experts</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Educational Resources Grid */}
        <section className="mb-16 md:mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Privacy Education
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From beginner basics to advanced techniques - everything you need to know about digital privacy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Beginner Guides */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <MaterialIcon icon="school" className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Beginner Guides</h3>
              <p className="text-gray-600 mb-4">Start your privacy journey with easy-to-follow guides</p>
              <Link href="/guide" className="text-green-600 hover:text-green-800 font-semibold">
                Start Learning →
              </Link>
            </div>

            {/* Advanced Techniques */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MaterialIcon icon="engineering" className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced Techniques</h3>
              <p className="text-gray-600 mb-4">Master professional-grade privacy protection methods</p>
              <Link href="/privacy-guide" className="text-blue-600 hover:text-blue-800 font-semibold">
                Explore Advanced →
              </Link>
            </div>

            {/* Case Studies */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <MaterialIcon icon="analytics" className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Case Studies</h3>
              <p className="text-gray-600 mb-4">Real-world examples and privacy breach analysis</p>
              <Link href="/blog" className="text-purple-600 hover:text-purple-800 font-semibold">
                Read Cases →
              </Link>
            </div>

            {/* Tools & Resources */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <MaterialIcon icon="build" className="text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tools & Resources</h3>
              <p className="text-gray-600 mb-4">Free privacy tools and security checklists</p>
              <Link href="#email-tool" className="text-orange-600 hover:text-orange-800 font-semibold">
                Access Tools →
              </Link>
            </div>
          </div>
        </section>

        {/* Free Email Tool Section */}
        <section id="email-tool" className="mb-16 md:mb-24">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-blue-200">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 rounded-full p-4">
                  <MaterialIcon icon="email" size="xl" className="text-blue-600" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Free Temporary Email Tool
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Put your privacy knowledge into practice with our free temporary email generator. 
                Perfect for testing the concepts you've learned in our guides.
              </p>
            </div>

            {/* Tool Integration */}
            <div className="max-w-4xl mx-auto">
              <InboxGeneratorWrapper />
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                Want to learn how this tool protects your privacy? Read our detailed technical explanation.
              </p>
              <Link 
                href="/how-it-works"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
              >
                <MaterialIcon icon="info" size="small" />
                How It Works - Technical Deep Dive
              </Link>
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        <section className="mb-16 md:mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Latest Privacy Insights
            </h2>
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
            >
              View All Articles
              <MaterialIcon icon="arrow_forward" size="small" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article 1 */}
            <article className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Privacy Guide
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                <Link href="/articles/privacy-pitfalls" className="hover:text-blue-600 transition-colors">
                  Common Privacy Pitfalls in 2025
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">
                Discover the most common privacy mistakes people make online and learn how to avoid them with practical, actionable advice.
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>January 15, 2025</span>
                <span>12 min read</span>
              </div>
            </article>

            {/* Article 2 */}
            <article className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="mb-4">
                <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Case Study
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                <Link href="/articles/use-cases" className="hover:text-blue-600 transition-colors">
                  Real-World Privacy Success Stories
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">
                Learn from real users who successfully protected their privacy using advanced email security techniques and tools.
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>January 12, 2025</span>
                <span>8 min read</span>
              </div>
            </article>

            {/* Article 3 */}
            <article className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="mb-4">
                <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Technical Guide
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                <Link href="/articles/temporary-email-vs-vpn-comparison" className="hover:text-blue-600 transition-colors">
                  Temporary Email vs VPN: Complete Comparison
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">
                Understand when to use temporary emails versus VPNs for different privacy scenarios with expert analysis and recommendations.
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>January 10, 2025</span>
                <span>15 min read</span>
              </div>
            </article>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 rounded-full p-4">
                  <MaterialIcon icon="mail" size="xl" className="text-white" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Ahead of Privacy Threats
              </h2>
              
              <p className="text-xl text-indigo-100 mb-8">
                Get weekly privacy insights, security updates, and expert analysis delivered to your inbox. 
                Join 10,000+ privacy-conscious readers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                  Subscribe Free
                </button>
              </div>
              
              <p className="text-sm text-indigo-200 mt-4">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
    </>
  )
}
