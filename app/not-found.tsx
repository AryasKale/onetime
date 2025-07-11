import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { generateAdvancedMetadata, generateAdvancedViewport } from './components/AdvancedSEO'

export const metadata: Metadata = generateAdvancedMetadata({
  title: '404 - Page Not Found | OneTimeEmail',
  description: 'The page you are looking for could not be found. Return to OneTimeEmail to generate temporary email addresses.',
  canonical: 'https://onetimeemail.net/404',
  noindex: true
})

export const viewport: Viewport = generateAdvancedViewport()

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center">
      <div className="text-center px-4 py-12 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            The page you are looking for could not be found. It might have been moved, 
            deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              🏠 Go Home
            </Link>
            <Link 
              href="/about"
              className="inline-flex items-center justify-center bg-gray-100 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-colors"
            >
              ℹ️ About Us
            </Link>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Link href="/how-it-works" className="text-blue-600 hover:text-blue-800 font-medium">
                How It Works
              </Link>
              <Link href="/faq" className="text-blue-600 hover:text-blue-800 font-medium">
                FAQ
              </Link>
              <Link href="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Need help? Visit our <Link href="/faq" className="text-blue-600 hover:text-blue-800">FAQ page</Link> for common questions.</p>
        </div>
      </div>
    </div>
  )
} 