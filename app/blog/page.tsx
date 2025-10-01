import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { generateAdvancedMetadata, generateAdvancedViewport } from '../components/AdvancedSEO'

export const metadata: Metadata = generateAdvancedMetadata({
  title: 'OneTimeEmail Blog - Email Privacy, Security & Digital Protection Guides',
  description: 'Expert insights on email privacy, temporary email security, and digital identity protection. Learn advanced techniques to protect your online presence.',
  canonical: 'https://onetimeemail.net/blog'
})

export const viewport: Viewport = generateAdvancedViewport()

// Blog post data structure
const blogPosts = [
  {
    id: 'temporary-email-ecommerce-checkout',
    title: 'Smart E-commerce: Using Temporary Emails for Secure Online Shopping',
    excerpt: 'Discover how temporary email addresses revolutionize online shopping by protecting your privacy during checkout, preventing marketing spam, and securing your financial information.',
    category: 'Online Shopping & Security',
    readTime: '8 min read',
    publishDate: 'January 15, 2025',
    featured: true,
    tags: ['ecommerce', 'privacy', 'security', 'shopping'],
    href: '/articles/email-security-guide'
  },
  {
    id: 'subscription-management-guide',
    title: 'Master Subscription Management with Disposable Email Strategies',
    excerpt: 'Learn advanced techniques for managing newsletters, subscriptions, and promotional emails using temporary addresses to maintain inbox hygiene and privacy.',
    category: 'Email Management',
    readTime: '12 min read',
    publishDate: 'January 12, 2025',
    featured: true,
    tags: ['subscriptions', 'newsletters', 'email-management'],
    href: '/articles/business-email-security-checklist'
  },
  {
    id: 'anonymous-online-presence',
    title: 'Building Anonymous Online Presence: Complete Privacy Guide',
    excerpt: 'Comprehensive guide to maintaining anonymity online using temporary emails, VPNs, and advanced privacy techniques for journalists, researchers, and privacy advocates.',
    category: 'Privacy & Anonymity',
    readTime: '15 min read',
    publishDate: 'January 10, 2025',
    featured: true,
    tags: ['anonymity', 'privacy', 'security', 'research'],
    href: '/articles/digital-identity-protection-masterclass'
  },
  {
    id: 'online-dating-privacy',
    title: 'Dating App Privacy: Protect Yourself with Temporary Email Strategies',
    excerpt: 'Navigate online dating safely using disposable emails to protect your identity, prevent stalking, and maintain privacy while meeting new people.',
    category: 'Personal Safety',
    readTime: '10 min read',
    publishDate: 'January 8, 2025',
    featured: false,
    tags: ['dating', 'safety', 'privacy', 'personal-security'],
    href: '/articles/email-privacy-laws-2025'
  },
  {
    id: 'temporary-email-necessity-2025',
    title: 'Why Temporary Email Services Are Essential in 2025',
    excerpt: 'Explore the evolving digital landscape and understand why temporary email services have become critical tools for privacy protection and digital security.',
    category: 'Digital Trends',
    readTime: '11 min read',
    publishDate: 'January 5, 2025',
    featured: false,
    tags: ['trends', 'digital-privacy', 'future', 'technology'],
    href: '/articles/temporary-email-vs-vpn-comparison'
  },
  {
    id: 'combat-spam-strategies',
    title: 'Advanced Anti-Spam Strategies: Beyond Basic Email Filtering',
    excerpt: 'Discover professional-grade techniques to eliminate spam, protect against phishing, and maintain clean email communications using temporary email services.',
    category: 'Email Security',
    readTime: '9 min read',
    publishDate: 'January 3, 2025',
    featured: false,
    tags: ['spam', 'security', 'filtering', 'protection'],
    href: '/articles/privacy-pitfalls'
  },
  {
    id: 'optimize-online-experience',
    title: 'Digital Experience Optimization with Temporary Email Solutions',
    excerpt: 'Learn how temporary emails can enhance your online experience by reducing distractions, improving security, and streamlining digital interactions.',
    category: 'User Experience',
    readTime: '7 min read',
    publishDate: 'December 30, 2024',
    featured: false,
    tags: ['ux', 'optimization', 'productivity', 'digital-wellness'],
    href: '/articles/use-cases'
  },
  {
    id: 'temporary-email-best-practices',
    title: 'Professional Guide: Temporary Email Security Best Practices',
    excerpt: 'Master the art of secure temporary email usage with professional techniques, security protocols, and privacy protection strategies.',
    category: 'Security Best Practices',
    readTime: '13 min read',
    publishDate: 'December 28, 2024',
    featured: false,
    tags: ['best-practices', 'security', 'professional', 'guidelines'],
    href: '/articles/qa-testing'
  }
]

const categories = [
  'All Posts',
  'Email Security',
  'Privacy & Anonymity', 
  'Online Shopping & Security',
  'Email Management',
  'Personal Safety',
  'Digital Trends',
  'User Experience',
  'Security Best Practices'
]

const recentPosts = blogPosts.slice(0, 5)

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

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
          <div className="mt-8 flex justify-center">
            <div className="bg-white rounded-full px-6 py-3 shadow-lg border border-gray-200">
              <span className="text-blue-600 font-semibold">📧 Latest Privacy Insights</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Featured Posts */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <span className="text-yellow-500">⭐</span>
                Featured Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="mb-4">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      <Link href={post.href} className="hover:text-blue-600 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.publishDate}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="mt-4">
                      <Link 
                        href={post.href}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* All Posts */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <span className="text-blue-500">📚</span>
                All Articles
              </h2>
              <div className="space-y-6">
                {regularPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                      <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>📅 {post.publishDate}</span>
                        <span>⏱️ {post.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      <Link href={post.href} className="hover:text-blue-600 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <Link 
                        href={post.href}
                        className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Read Full Article →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">
                    1
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    Next
                  </button>
                </nav>
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Categories */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-blue-500">📂</span>
                  Categories
                </h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <Link 
                        href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}`}
                        className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors"
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-green-500">🔥</span>
                  Recent Posts
                </h3>
                <ul className="space-y-4">
                  {recentPosts.map((post) => (
                    <li key={post.id}>
                      <Link href={post.href} className="block group">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                          {post.title}
                        </h4>
                        <p className="text-sm text-gray-500">{post.publishDate}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>📬</span>
                  Stay Updated
                </h3>
                <p className="text-blue-100 mb-4 text-sm">
                  Get the latest privacy tips and security insights delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500"
                  />
                  <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-blue-200 mt-2">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>

              {/* Archives */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-purple-500">📅</span>
                  Archives
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/blog/archive/2025/01" className="text-gray-700 hover:text-blue-600 transition-colors">
                      January 2025 (5)
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/archive/2024/12" className="text-gray-700 hover:text-blue-600 transition-colors">
                      December 2024 (3)
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-orange-500">🏷️</span>
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['privacy', 'security', 'temporary-email', 'anonymity', 'spam-protection', 'digital-identity', 'online-safety', 'email-management'].map((tag) => (
                    <Link 
                      key={tag}
                      href={`/blog/tag/${tag}`}
                      className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 text-sm px-3 py-1 rounded-full transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Call to Action */}
        <section className="mt-16">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white text-center">
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
