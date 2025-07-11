'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center">
      <div className="text-center px-4 py-12 max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-red-400 mb-4">⚠️</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
          <p className="text-lg text-gray-600 mb-8">
            We encountered an unexpected error. Don't worry, this has been logged and our team will look into it.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors mr-4"
          >
            Try Again
          </button>
          
          <Link 
            href="/"
            className="inline-block bg-gray-200 text-gray-800 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-300 transition-colors"
          >
            Go Home
          </Link>
        </div>

        <div className="mt-12 p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">What can you do?</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• Try refreshing the page</p>
            <p>• Go back to the homepage</p>
            <p>• Check your internet connection</p>
            <p>• Try again in a few minutes</p>
          </div>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <h4 className="font-semibold text-red-800 mb-2">Development Error Details:</h4>
            <pre className="text-xs text-red-700 overflow-auto">
              {error.message}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
} 