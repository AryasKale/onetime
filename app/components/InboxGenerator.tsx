'use client'

import { useState } from 'react'

// Types for our inbox data
type InboxData = {
  success: boolean
  id: string
  address: string
  created_at: string
  expires_at: string
  message: string
}

export default function InboxGenerator() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Generate new inbox
  const generateInbox = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/create-inbox', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to create inbox')
      }

      const data: InboxData = await response.json()
      
      // Store inbox in localStorage (with error handling)
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('currentInbox', JSON.stringify({
            id: data.id,
            address: data.address,
            created_at: data.created_at,
            expires_at: data.expires_at
          }))
        }
      } catch (err) {
        console.warn('localStorage not available:', err)
      }
      
      // Redirect to inbox page
      const encodedEmail = encodeURIComponent(data.address)
      
      // Use location.assign for better iOS compatibility
      if (typeof window !== 'undefined') {
        try {
          window.location.assign(`/inbox/${encodedEmail}`)
        } catch (redirectError) {
          // Fallback to href if assign fails
          window.location.href = `/inbox/${encodedEmail}`
        }
      }
      
    } catch (err) {
      console.error('Inbox generation error:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-lg">
      <div className="ios-safe-card bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-gray-200 shadow-2xl">
        <p className="text-gray-700 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
          Create a temporary inbox that expires automatically. Perfect for signups, verification, and avoiding spam.
        </p>
        
        <button
          onClick={generateInbox}
          disabled={loading}
          className={`ios-safe-button w-full py-4 md:py-5 px-6 md:px-8 rounded-2xl font-bold text-lg md:text-xl transition-all ${
            loading
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-xl hover:shadow-2xl hover:scale-105'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 md:w-6 md:h-6 border-2 md:border-3 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Creating Your Inbox...</span>
            </div>
          ) : (
            <span>🚀 Generate Your Inbox</span>
          )}
        </button>

        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm md:text-base">
            <div className="font-semibold mb-1">Error:</div>
            <div>{error}</div>
            <div className="text-xs mt-2 text-red-600">
              If this error persists on iOS, please try refreshing the page or using a different browser.
            </div>
          </div>
        )}

        <div className="mt-6 md:mt-8 text-base md:text-lg text-gray-500 text-center">
          ⏱️ Your temporary email will be active for <span className="text-orange-600 font-semibold">10 minutes</span>
        </div>
      </div>
    </div>
  )
} 