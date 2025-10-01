import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { generateAdvancedMetadata, generateAdvancedViewport } from '../../../components/AdvancedSEO'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

// Category data mapping
const categoryData: Record<string, { name: string; description: string; posts: any[] }> = {
  'all-posts': {
    name: 'All Posts',
    description: 'Complete collection of our email privacy and security articles.',
    posts: [
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
  },
  'email-security': {
    name: 'Email Security',
    description: 'Comprehensive guides on protecting your email communications from threats.',
    posts: [
      {
        id: 'email-security-guide',
        title: 'Complete Email Security Guide 2025',
        excerpt: 'Master email security with comprehensive strategies to protect your digital identity.',
        readTime: '20 min read',
        publishDate: 'January 15, 2025',
        href: '/articles/email-security-guide'
      },
      {
        id: 'business-security-checklist',
        title: 'Business Email Security Checklist 2025',
        excerpt: 'Complete implementation guide for enterprise email security.',
        readTime: '25 min read',
        publishDate: 'January 13, 2025',
        href: '/articles/business-email-security-checklist'
      }
    ]
  },
  'privacy-and-anonymity': {
    name: 'Privacy & Anonymity',
    description: 'Advanced techniques for maintaining digital privacy and anonymity.',
    posts: [
      {
        id: 'privacy-pitfalls',
        title: 'Email Privacy Mistakes That Cost You Dearly',
        excerpt: 'Real stories of email privacy disasters and practical solutions.',
        readTime: '14 min read',
        publishDate: 'January 12, 2025',
        href: '/articles/privacy-pitfalls'
      },
      {
        id: 'digital-identity-masterclass',
        title: 'Digital Identity Protection Masterclass',
        excerpt: 'Master digital identity protection with comprehensive strategies and tools.',
        readTime: '30 min read',
        publishDate: 'January 8, 2025',
        href: '/articles/digital-identity-protection-masterclass'
      }
    ]
  },
  'online-shopping-and-security': {
    name: 'Online Shopping & Security',
    description: 'Protect your privacy and security while shopping online.',
    posts: [
      {
        id: 'use-cases',
        title: '27 Clever Ways People Actually Use Temporary Emails',
        excerpt: 'Real stories and creative use cases including shopping strategies.',
        readTime: '18 min read',
        publishDate: 'January 10, 2025',
        href: '/articles/use-cases'
      }
    ]
  },
  'email-management': {
    name: 'Email Management',
    description: 'Strategies for managing your email communications effectively.',
    posts: [
      {
        id: 'qa-testing',
        title: 'How QA Teams Save 15 Hours Weekly Using Temporary Emails',
        excerpt: 'Real testing strategies from top tech companies.',
        readTime: '16 min read',
        publishDate: 'January 5, 2025',
        href: '/articles/qa-testing'
      }
    ]
  },
  'personal-safety': {
    name: 'Personal Safety',
    description: 'Protect yourself from online threats and privacy violations.',
    posts: [
      {
        id: 'privacy-laws-guide',
        title: 'Email Privacy Laws Guide 2025',
        excerpt: 'Navigate GDPR, CCPA, and global privacy regulations.',
        readTime: '22 min read',
        publishDate: 'January 3, 2025',
        href: '/articles/email-privacy-laws-2025'
      }
    ]
  },
  'digital-trends': {
    name: 'Digital Trends',
    description: 'Latest trends in digital privacy and email security.',
    posts: [
      {
        id: 'email-vs-vpn',
        title: 'Temporary Email vs VPN: Complete Privacy Comparison',
        excerpt: 'Comprehensive comparison of privacy protection tools.',
        readTime: '16 min read',
        publishDate: 'December 30, 2024',
        href: '/articles/temporary-email-vs-vpn-comparison'
      }
    ]
  },
  'security-best-practices': {
    name: 'Security Best Practices',
    description: 'Professional security practices and implementation guides.',
    posts: [
      {
        id: 'business-security-checklist',
        title: 'Business Email Security Checklist 2025',
        excerpt: 'Complete implementation guide for enterprise email security.',
        readTime: '25 min read',
        publishDate: 'January 13, 2025',
        href: '/articles/business-email-security-checklist'
      },
      {
        id: 'qa-testing',
        title: 'How QA Teams Save 15 Hours Weekly Using Temporary Emails',
        excerpt: 'Real testing strategies from top tech companies.',
        readTime: '16 min read',
        publishDate: 'January 5, 2025',
        href: '/articles/qa-testing'
      }
    ]
  },
  'user-experience': {
    name: 'User Experience',
    description: 'Optimize your digital experience with privacy-focused strategies.',
    posts: [
      {
        id: 'use-cases',
        title: '27 Clever Ways People Actually Use Temporary Emails',
        excerpt: 'Real stories and creative use cases from people who\'ve mastered temporary emails.',
        readTime: '18 min read',
        publishDate: 'January 10, 2025',
        href: '/articles/use-cases'
      }
    ]
  },
  'sustainability': {
    name: 'Sustainability',
    description: 'Environmental impact and green computing with temporary emails.',
    posts: [
      {
        id: 'digital-footprint',
        title: 'Reducing Digital Footprint with Temporary Emails',
        excerpt: 'How temporary emails contribute to environmental sustainability.',
        readTime: '8 min read',
        publishDate: 'December 25, 2024',
        href: '/articles/use-cases'
      }
    ]
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const category = categoryData[resolvedParams.slug]
  const categoryName = category?.name || 'Blog Category'
  
  return generateAdvancedMetadata({
    title: `${categoryName} - OneTimeEmail Blog`,
    description: category?.description || 'Expert articles and guides on email privacy and security.',
    canonical: `https://onetimeemail.net/blog/category/${resolvedParams.slug}`
  })
}

export const viewport: Viewport = generateAdvancedViewport()

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params
  const category = categoryData[resolvedParams.slug]
  
  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-semibold">← Back to Blog</Link>
        </div>
      </div>
    )
  }

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
            <li className="text-gray-900">{category.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {category.description}
          </p>
          <div className="mt-6">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              {category.posts.length} Article{category.posts.length !== 1 ? 's' : ''}
            </span>
          </div>
        </header>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.posts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                <Link href={post.href} className="hover:text-blue-600 transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
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
