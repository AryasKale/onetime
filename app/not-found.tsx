import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 - Page Not Found | OneTimeEmail',
  description: 'The page you are looking for does not exist. Return to OneTimeEmail to generate temporary email addresses.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center">
      <div className="text-center px-4 py-12 max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>

        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Generate Temporary Email
          </Link>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/about" className="text-blue-600 hover:text-blue-800 font-medium">
              About
            </Link>
            <Link href="/how-it-works" className="text-blue-600 hover:text-blue-800 font-medium">
              How It Works
            </Link>
            <Link href="/faq" className="text-blue-600 hover:text-blue-800 font-medium">
              FAQ
            </Link>
            <Link href="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
              Privacy
            </Link>
          </div>
        </div>

        <div className="mt-12 p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Popular Pages</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <Link href="/" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-medium">🚀 Generate Email</span>
                <p className="text-gray-600">Create temporary email address</p>
              </Link>
            </div>
            <div>
              <Link href="/how-it-works" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-medium">📖 How It Works</span>
                <p className="text-gray-600">Learn about our service</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 