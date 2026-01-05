import Link from 'next/link'
import MaterialIcon from './MaterialIcon'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  // Organized footer links by category
  const footerSections = {
    main: [
      { href: '/', label: 'Home', title: 'Generate temporary email addresses' },
      { href: '/blog', label: 'Blog', title: 'Expert insights on email privacy and security' },
      { href: '/learn', label: 'Learning Center', title: 'Privacy and security education' },
      { href: '/community', label: 'Community', title: 'Expert Q&A and discussions' },
    ],
    resources: [
      { href: '/about', label: 'About', title: 'Learn about OneTimeEmail mission and expert team' },
      { href: '/how-it-works', label: 'How It Works', title: 'Step-by-step guide to using temporary emails' },
      { href: '/faq-advanced', label: 'FAQ', title: 'Comprehensive FAQ with expert answers' },
      { href: '/tools/privacy-assessment', label: 'Privacy Assessment', title: 'Free privacy security evaluation' },
    ],
    services: [
      { href: '/premium', label: 'Premium Services', title: 'Professional privacy consulting and audits' },
      { href: '/security', label: 'Security', title: 'Learn about our advanced security features' },
      { href: '/developers', label: 'Developers', title: 'API documentation and technical resources' },
    ],
    legal: [
      { href: '/contact', label: 'Contact Us', title: 'Get in touch with OneTimeEmail expert team', icon: 'contact_mail' },
      { href: '/privacy', label: 'Privacy Policy', title: 'Comprehensive privacy policy and data protection', icon: 'policy' },
      { href: '/terms', label: 'Terms of Service', title: 'Terms and conditions for using OneTimeEmail', icon: 'gavel' },
    ]
  }

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="space-y-12">
          {/* Logo and Tagline */}
          <div className="text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-3 text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors mb-4"
              title="OneTimeEmail - Home"
            >
              <MaterialIcon icon="security" size="large" className="text-blue-600" />
              OneTimeEmail
            </Link>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              The world's most comprehensive email privacy education platform, featuring expert guides, 
              professional techniques, and practical tools for digital protection.
            </p>
          </div>

          {/* Organized Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Main Pages */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MaterialIcon icon="home" size="small" className="text-blue-600" />
                <span>Main</span>
              </h3>
              <nav className="space-y-3">
                {footerSections.main.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
                    title={link.title}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MaterialIcon icon="library_books" size="small" className="text-green-600" />
                <span>Resources</span>
              </h3>
              <nav className="space-y-3">
                {footerSections.resources.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
                    title={link.title}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MaterialIcon icon="workspace_premium" size="small" className="text-purple-600" />
                <span>Services</span>
              </h3>
              <nav className="space-y-3">
                {footerSections.services.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
                    title={link.title}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Legal & Contact - Most Prominent */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MaterialIcon icon="verified" size="small" className="text-blue-600" />
                <span>Legal & Contact</span>
              </h3>
              <nav className="space-y-3">
                {footerSections.legal.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors font-semibold"
                    title={link.title}
                  >
                    <MaterialIcon icon={link.icon || 'link'} size="small" className="text-blue-600" />
                    {link.label}
                  </Link>
                ))}
              </nav>
              
              <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
                <div className="text-xs text-gray-600 mb-2">
                  <strong>Quick Contact:</strong>
                </div>
                <a href="mailto:onetimeemailsaas@gmail.com" className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                  onetimeemailsaas@gmail.com
                </a>
              </div>
            </div>
          </div>

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
              <span className="flex items-center gap-1">
                <MaterialIcon icon="https" size="small" className="text-green-500" />
                HTTPS Secure
              </span>
              <span className="flex items-center gap-1">
                <MaterialIcon icon="block" size="small" className="text-red-500" />
                No Tracking
              </span>
              <span className="flex items-center gap-1">
                <MaterialIcon icon="free_cancellation" size="small" className="text-blue-500" />
                Always Free
              </span>
              <span className="flex items-center gap-1">
                <MaterialIcon icon="schedule" size="small" className="text-orange-500" />
                10 Min Expiry
              </span>
            </div>
            
            {/* Enhanced Legal Notice */}
            <div className="bg-gray-100 rounded-xl p-6 max-w-4xl mx-auto">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MaterialIcon icon="verified" size="small" className="text-green-600" />
                  <span className="text-sm font-bold text-gray-900">Legal Transparency & Compliance</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-600">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <MaterialIcon icon="policy" size="small" className="text-blue-600" />
                    <strong>Privacy Policy</strong>
                  </div>
                  <p className="mb-2">Comprehensive data protection practices</p>
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline font-semibold">
                    Read Full Policy →
                  </Link>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <MaterialIcon icon="gavel" size="small" className="text-purple-600" />
                    <strong>Terms of Service</strong>
                  </div>
                  <p className="mb-2">Clear terms and conditions</p>
                  <Link href="/terms" className="text-blue-600 hover:text-blue-800 underline font-semibold">
                    Read Terms →
                  </Link>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <MaterialIcon icon="contact_mail" size="small" className="text-green-600" />
                    <strong>Contact & Support</strong>
                  </div>
                  <p className="mb-2">Expert team available 24/7</p>
                  <Link href="/contact" className="text-blue-600 hover:text-blue-800 underline font-semibold">
                    Get Help →
                  </Link>
                </div>
              </div>
              
              <div className="text-center mt-6 pt-4 border-t border-gray-300">
                <p className="text-xs text-gray-500">
                  By using OneTimeEmail, you agree to our 
                  <Link href="/terms" className="text-blue-600 hover:text-blue-800 underline font-semibold">Terms</Link> and 
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline font-semibold">Privacy Policy</Link>.
                  We are committed to transparency and legal compliance.
                </p>
              </div>
            </div>
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
  )
} 