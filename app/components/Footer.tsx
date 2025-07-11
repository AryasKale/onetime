import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  // Structured data for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OneTimeEmail",
    "url": "https://onetimeemail.net",
    "logo": "https://onetimeemail.net/logo.png",
    "description": "Free temporary email service for privacy protection and spam prevention",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "English",
      "url": "https://onetimeemail.net/contact"
    },
    "sameAs": [
      "https://twitter.com/onetimeemail",
      "https://github.com/onetimeemail"
    ]
  }

  const footerLinks = [
    { href: '/', label: 'Home', title: 'Generate temporary email addresses' },
    { href: '/about', label: 'About', title: 'Learn about OneTimeEmail mission and values' },
    { href: '/how-it-works', label: 'How It Works', title: 'Step-by-step guide to using temporary emails' },
    { href: '/faq', label: 'FAQ', title: 'Frequently asked questions about temporary emails' },
    { href: '/privacy', label: 'Privacy Policy', title: 'Our privacy policy and data protection practices' },
    { href: '/terms', label: 'Terms of Service', title: 'Terms and conditions for using OneTimeEmail' }
  ]

  return (
    <>
      {/* Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4 py-8">
          {/* Main Footer Content */}
          <div className="flex flex-col items-center space-y-6">
            {/* Logo and Tagline */}
            <div className="text-center">
              <Link 
                href="/" 
                className="inline-block text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                title="OneTimeEmail - Home"
              >
                OneTimeEmail
              </Link>
              <p className="text-sm text-gray-600 mt-2 max-w-md">
                Free temporary email service for privacy protection and spam prevention
              </p>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-wrap justify-center gap-6" aria-label="Footer navigation">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
                  title={link.title}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Divider */}
            <div className="w-full max-w-md border-t border-gray-200"></div>

            {/* Bottom Section */}
            <div className="text-center space-y-3">
              {/* Copyright */}
              <p className="text-xs text-gray-500">
                © {currentYear} OneTimeEmail. All rights reserved.
              </p>
              
              {/* Additional Info */}
              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
                <span>🔒 HTTPS Secure</span>
                <span>🚫 No Tracking</span>
                <span>🆓 Always Free</span>
                <span>⚡ 10 Min Expiry</span>
              </div>
              
              {/* Legal Notice */}
              <p className="text-xs text-gray-400 max-w-lg">
                By using this service, you agree to our{' '}
                <Link href="/terms" className="text-blue-500 hover:text-blue-700 underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-500 hover:text-blue-700 underline">
                  Privacy Policy
                </Link>
                . OneTimeEmail is a privacy-focused temporary email service.
              </p>
            </div>
          </div>
        </div>

        {/* SEO Footer Content */}
        <div className="bg-gray-50 py-4 text-center">
          <div className="container mx-auto px-4">
            <div className="text-xs text-gray-500 space-y-2">
              <p>
                <strong>Keywords:</strong> temporary email, disposable email, fake email, email generator, 
                private email, temp email, anonymous email, secure email, 10 minute mail
              </p>
              <p>
                OneTimeEmail provides secure temporary email addresses for online registrations, 
                testing, and privacy protection. Generate disposable emails instantly without registration.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
} 