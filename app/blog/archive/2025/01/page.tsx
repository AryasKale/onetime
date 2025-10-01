import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { generateAdvancedMetadata, generateAdvancedViewport } from '../../../../components/AdvancedSEO'

export const metadata: Metadata = generateAdvancedMetadata({
  title: 'January 2025 Archives - OneTimeEmail Blog',
  description: 'Blog posts from January 2025 covering email privacy, security, and digital protection.',
  canonical: 'https://onetimeemail.net/blog/archive/2025/01'
})

export const viewport: Viewport = generateAdvancedViewport()

export default function January2025ArchivePage() {
  const posts = [
    {
      id: 'email-security-guide',
      title: 'Complete Email Security Guide 2025',
      excerpt: 'Master email security with comprehensive strategies to protect your digital identity.',
      readTime: '20 min read',
      publishDate: 'January 15, 2025',
      href: '/articles/email-security-guide'
    },
    {
      id: 'privacy-pitfalls',
      title: 'Email Privacy Mistakes That Cost You Dearly',
      excerpt: 'Real stories of email privacy disasters and practical solutions.',
      readTime: '14 min read',
      publishDate: 'January 12, 2025',
      href: '/articles/privacy-pitfalls'
    },
    {
      id: 'use-cases',
      title: '27 Clever Ways People Actually Use Temporary Emails',
      excerpt: 'Real stories and creative use cases from people who\'ve mastered temporary emails.',
      readTime: '18 min read',
      publishDate: 'January 10, 2025',
      href: '/articles/use-cases'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li>→</li>
            <li><Link href="/blog" className="hover:text-blue-600">Blog</Link></li>
            <li>→</li>
            <li className="text-gray-900">January 2025</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            January 2025 Archives
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            All blog posts published in January 2025
          </p>
          <div className="mt-6">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              {posts.length} Articles
            </span>
          </div>
        </header>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                <Link href={post.href} className="hover:text-blue-600 transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{post.publishDate}</span>
                <span>{post.readTime}</span>
              </div>
              <Link 
                href={post.href}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>

        {/* Back to Blog */}
        <div className="text-center mt-12">
          <Link 
            href="/blog"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            ← Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  )
}
