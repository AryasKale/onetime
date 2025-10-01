import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { generateAdvancedMetadata, generateAdvancedViewport } from '../components/AdvancedSEO'

export const metadata: Metadata = generateAdvancedMetadata({
  title: 'OneTimeEmail Blog - Email Privacy, Security & Digital Protection Guides',
  description: 'Expert insights on email privacy, temporary email security, and digital identity protection. Learn advanced techniques to protect your online presence.',
  canonical: 'https://onetimeemail.net/blog'
})

export const viewport: Viewport = generateAdvancedViewport()

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            OneTimeEmail Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert insights on email privacy, security, and digital protection. 
            Stay informed with the latest trends and techniques in temporary email services.
          </p>
        </header>

        {/* Featured Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <span className="text-yellow-500">⭐</span>
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Email Security
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                <Link href="/articles/email-security-guide" className="hover:text-blue-600 transition-colors">
                  Complete Email Security Guide 2025
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">
                Master email security with comprehensive strategies to protect your digital identity and prevent data breaches.
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>January 15, 2025</span>
                <span>20 min read</span>
              </div>
            </article>

            <article className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="mb-4">
                <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Privacy Guide
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                <Link href="/articles/privacy-pitfalls" className="hover:text-blue-600 transition-colors">
                  Complete Email Privacy Guide 2025
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">
                Avoid common privacy pitfalls and protect your digital identity with advanced email privacy techniques.
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>January 12, 2025</span>
                <span>18 min read</span>
              </div>
            </article>

            <article className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="mb-4">
                <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">
                  Use Cases
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                <Link href="/articles/use-cases" className="hover:text-blue-600 transition-colors">
                  25+ Use Cases for Temporary Emails
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">
                Comprehensive guide with real-world scenarios for using disposable email addresses effectively.
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>January 10, 2025</span>
                <span>15 min read</span>
              </div>
            </article>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Privacy?</h2>
            <p className="text-xl mb-6 opacity-90">
              Start using OneTimeEmail's secure temporary email service today.
            </p>
            <Link 
              href="/"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Generate Your First Temporary Email
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
