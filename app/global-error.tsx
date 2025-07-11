'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global application error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center">
          <div className="text-center px-4 py-12 max-w-lg mx-auto">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-red-400 mb-4">💥</h1>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Error</h2>
              <p className="text-lg text-gray-600 mb-8">
                A critical error occurred. Please try refreshing the page or contact support if the problem persists.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={reset}
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors mr-4"
              >
                Try Again
              </button>
              
              <a 
                href="/"
                className="inline-block bg-gray-200 text-gray-800 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-300 transition-colors"
              >
                Reload Page
              </a>
            </div>

            <div className="mt-12 p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Error Code</h3>
              <p className="text-sm text-gray-600 font-mono">
                {error.digest && `Digest: ${error.digest}`}
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
} 