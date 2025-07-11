import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Temporary Email Inbox - OneTimeEmail',
  description: 'Access your temporary email inbox. Generate a new temporary email address to start receiving messages.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function InboxPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Temporary Email Inbox
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Your temporary email inbox will appear here once you generate an email address.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">📧</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Active Inbox</h2>
            <p className="text-lg text-gray-600 mb-8">
              You don't have an active temporary email address. Generate one to start receiving messages.
            </p>
          </div>

          <Link 
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Generate Temporary Email
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Generation</h3>
            <p className="text-gray-600">Get a temporary email address in seconds</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Private & Secure</h3>
            <p className="text-gray-600">Your privacy is protected with auto-deletion</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Updates</h3>
            <p className="text-gray-600">See new emails as they arrive instantly</p>
          </div>
        </div>
      </div>
    </div>
  )
} 