'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error for debugging
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="ios-safe-card bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-red-200 shadow-2xl text-center">
          <div className="text-6xl mb-6">⚠️</div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h1>
          
          <p className="text-gray-600 mb-6">
            We encountered an error while loading the application. This is often a temporary issue.
          </p>

          <div className="space-y-4">
            <button
              onClick={reset}
              className="ios-safe-button w-full py-3 px-6 rounded-2xl font-bold text-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-xl hover:shadow-2xl transition-all"
            >
              Try Again
            </button>

            <button
              onClick={() => window.location.href = '/'}
              className="ios-safe-button w-full py-3 px-6 rounded-2xl font-bold text-lg bg-gray-500 hover:bg-gray-600 text-white shadow-lg transition-all"
            >
              Return Home
            </button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
            <div className="font-semibold mb-1">iOS Safari Users:</div>
            <div>If you're using iOS Safari and continue to see this error, try:</div>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Refreshing the page</li>
              <li>Clearing browser cache</li>
              <li>Using Chrome or Firefox instead</li>
            </ul>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-gray-900">
                Technical Details (Development)
              </summary>
              <div className="mt-2 p-3 bg-gray-100 rounded border text-xs font-mono text-gray-800 overflow-auto">
                <div><strong>Error:</strong> {error.message}</div>
                {error.digest && <div><strong>Digest:</strong> {error.digest}</div>}
                {error.stack && (
                  <div>
                    <strong>Stack:</strong>
                    <pre className="mt-1 whitespace-pre-wrap">{error.stack}</pre>
                  </div>
                )}
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  )
} 