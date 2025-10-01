import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { generateAdvancedMetadata, generateAdvancedViewport } from '../../../components/AdvancedSEO'

interface TagPageProps {
  params: Promise<{
    slug: string
  }>
}

// Tag data mapping
const tagData: Record<string, { name: string; description: string; posts: any[] }> = {
  'privacy': {
    name: 'Privacy',
    description: 'Articles focused on email privacy protection and digital identity security.',
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
        excerpt: 'Master digital identity protection with comprehensive strategies.',
        readTime: '30 min read',
        publishDate: 'January 8, 2025',
        href: '/articles/digital-identity-protection-masterclass'
      }
    ]
  },
  'security': {
    name: 'Security',
    description: 'Email security guides and protection strategies.',
    posts: [
      {
        id: 'email-security-guide',
        title: 'Complete Email Security Guide 2025',
        excerpt: 'Master email security with comprehensive strategies.',
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
  'temporary-email': {
    name: 'Temporary Email',
    description: 'Guides and strategies for using temporary email services effectively.',
    posts: [
      {
        id: 'use-cases',
        title: '27 Clever Ways People Actually Use Temporary Emails',
        excerpt: 'Real stories and creative use cases from people who\'ve mastered temporary emails.',
        readTime: '18 min read',
        publishDate: 'January 10, 2025',
        href: '/articles/use-cases'
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
  'anonymity': {
    name: 'Anonymity',
    description: 'Advanced techniques for maintaining online anonymity and privacy.',
    posts: [
      {
        id: 'digital-identity-masterclass',
        title: 'Digital Identity Protection Masterclass',
        excerpt: 'Master digital identity protection with comprehensive strategies.',
        readTime: '30 min read',
        publishDate: 'January 8, 2025',
        href: '/articles/digital-identity-protection-masterclass'
      },
      {
        id: 'privacy-pitfalls',
        title: 'Email Privacy Mistakes That Cost You Dearly',
        excerpt: 'Real stories of email privacy disasters and practical solutions.',
        readTime: '14 min read',
        publishDate: 'January 12, 2025',
        href: '/articles/privacy-pitfalls'
      }
    ]
  },
  'spam-protection': {
    name: 'Spam Protection',
    description: 'Strategies and techniques for preventing spam and unwanted emails.',
    posts: [
      {
        id: 'privacy-pitfalls',
        title: 'Email Privacy Mistakes That Cost You Dearly',
        excerpt: 'Learn how to avoid spam and protect your inbox from unwanted emails.',
        readTime: '14 min read',
        publishDate: 'January 12, 2025',
        href: '/articles/privacy-pitfalls'
      },
      {
        id: 'use-cases',
        title: '27 Clever Ways People Actually Use Temporary Emails',
        excerpt: 'Including strategies for spam prevention and inbox protection.',
        readTime: '18 min read',
        publishDate: 'January 10, 2025',
        href: '/articles/use-cases'
      }
    ]
  },
  'digital-identity': {
    name: 'Digital Identity',
    description: 'Protecting and managing your digital identity across online platforms.',
    posts: [
      {
        id: 'digital-identity-masterclass',
        title: 'Digital Identity Protection Masterclass',
        excerpt: 'Master digital identity protection with comprehensive strategies.',
        readTime: '30 min read',
        publishDate: 'January 8, 2025',
        href: '/articles/digital-identity-protection-masterclass'
      },
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
  'online-safety': {
    name: 'Online Safety',
    description: 'Staying safe online with privacy protection and security measures.',
    posts: [
      {
        id: 'privacy-pitfalls',
        title: 'Email Privacy Mistakes That Cost You Dearly',
        excerpt: 'Real stories of email privacy disasters and how to avoid them.',
        readTime: '14 min read',
        publishDate: 'January 12, 2025',
        href: '/articles/privacy-pitfalls'
      },
      {
        id: 'email-security-guide',
        title: 'Complete Email Security Guide 2025',
        excerpt: 'Comprehensive strategies for online safety and email protection.',
        readTime: '20 min read',
        publishDate: 'January 15, 2025',
        href: '/articles/email-security-guide'
      }
    ]
  },
  'email-management': {
    name: 'Email Management',
    description: 'Effective strategies for managing your email communications.',
    posts: [
      {
        id: 'qa-testing',
        title: 'How QA Teams Save 15 Hours Weekly Using Temporary Emails',
        excerpt: 'Professional email management strategies for testing teams.',
        readTime: '16 min read',
        publishDate: 'January 5, 2025',
        href: '/articles/qa-testing'
      },
      {
        id: 'use-cases',
        title: '27 Clever Ways People Actually Use Temporary Emails',
        excerpt: 'Including advanced email management techniques.',
        readTime: '18 min read',
        publishDate: 'January 10, 2025',
        href: '/articles/use-cases'
      }
    ]
  }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const tag = tagData[resolvedParams.slug]
  const tagName = tag?.name || 'Blog Tag'
  
  return generateAdvancedMetadata({
    title: `${tagName} Articles - OneTimeEmail Blog`,
    description: tag?.description || 'Articles tagged with this topic.',
    canonical: `https://onetimeemail.net/blog/tag/${resolvedParams.slug}`
  })
}

export const viewport: Viewport = generateAdvancedViewport()

export default async function TagPage({ params }: TagPageProps) {
  const resolvedParams = await params
  const tag = tagData[resolvedParams.slug]
  
  if (!tag) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tag Not Found</h1>
          <p className="text-gray-600 mb-6">The tag you're looking for doesn't exist.</p>
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
            <li className="text-gray-900">#{tag.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            #{tag.name} Articles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {tag.description}
          </p>
          <div className="mt-6">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
              {tag.posts.length} Article{tag.posts.length !== 1 ? 's' : ''}
            </span>
          </div>
        </header>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tag.posts.map((post) => (
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
      </div>
    </div>
  )
}
