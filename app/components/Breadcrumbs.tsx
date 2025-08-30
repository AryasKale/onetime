import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex mb-8" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {item.current ? (
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  {item.label}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Helper function to generate breadcrumbs for common pages
export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const pathSegments = pathname.split('/').filter(Boolean)

  const breadcrumbs: BreadcrumbItem[] = []
  let currentPath = ''

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === pathSegments.length - 1

    // Convert segment to readable label
    let label = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())

    // Custom labels for specific pages
    switch (segment) {
      case 'privacy-guide':
        label = 'Email Privacy Guide'
        break
      case 'guide':
        label = 'Complete Guide'
        break
      case 'security':
        label = 'Security Features'
        break
      case 'about':
        label = 'About Us'
        break
      case 'faq':
        label = 'FAQ'
        break
      case 'how-it-works':
        label = 'How It Works'
        break
      case 'privacy':
        label = 'Privacy Policy'
        break
      case 'terms':
        label = 'Terms of Service'
        break
      case 'contact':
        label = 'Contact Us'
        break
    }

    breadcrumbs.push({
      label,
      href: currentPath,
      current: isLast
    })
  })

  return breadcrumbs
}