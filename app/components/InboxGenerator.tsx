'use client'

import { useState, useEffect } from 'react'

// Types for our inbox data
type InboxData = {
  success: boolean
  id: string
  address: string
  created_at: string
  expires_at: string
  message: string
}

// iOS-safe localStorage helper
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(key)
      }
    } catch (err) {
      console.warn('localStorage not available:', err)
    }
    return null
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, value)
      }
    } catch (err) {
      console.warn('localStorage not available:', err)
    }
  },
  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(key)
      }
    } catch (err) {
      console.warn('localStorage not available:', err)
    }
  }
}

// iOS-safe redirect helper
const safeRedirect = (url: string): void => {
  try {
    // iOS Safari prefers location.assign over location.href
    if (typeof window !== 'undefined') {
      window.location.assign(url)
    }
  } catch (err) {
    console.warn('Redirect failed, trying fallback:', err)
    // Fallback for iOS
    if (typeof window !== 'undefined') {
      window.location.href = url
    }
  }
}

export default function InboxGenerator() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [checkingExistingInbox, setCheckingExistingInbox] = useState(true)

  // Check for existing active inbox on page load
  useEffect(() => {
    const checkExistingInbox = () => {
      try {
        const storedInbox = safeLocalStorage.getItem('currentInbox')
        if (storedInbox) {
          const inboxData = JSON.parse(storedInbox)
          const now = new Date()
          const expiresAt = new Date(inboxData.expires_at)
          
          // If inbox is still active (not expired)
          if (now < expiresAt) {
            console.log('Found existing active inbox, redirecting...')
            const encodedEmail = encodeURIComponent(inboxData.address)
            safeRedirect(`/inbox/${encodedEmail}`)
            return
          } else {
            // Inbox expired, clean up
            safeLocalStorage.removeItem('currentInbox')
            console.log('Stored inbox expired, cleaned up')
          }
        }
      } catch (err) {
        console.error('Error checking existing inbox:', err)
        safeLocalStorage.removeItem('currentInbox')
      }
      
      setCheckingExistingInbox(false)
    }

    // Add a small delay for iOS Safari to ensure proper initialization
    const timer = setTimeout(checkExistingInbox, 100)
    return () => clearTimeout(timer)
  }, [])

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
        // iOS Safari sometimes needs this for proper CORS handling
        credentials: 'same-origin',
      })

      if (!response.ok) {
        throw new Error('Failed to create inbox')
      }

      const data: InboxData = await response.json()
      
      // Store inbox in localStorage for tab sharing
      safeLocalStorage.setItem('currentInbox', JSON.stringify({
        id: data.id,
        address: data.address,
        created_at: data.created_at,
        expires_at: data.expires_at
      }))
      
      // Redirect to inbox page with iOS-safe method
      const encodedEmail = encodeURIComponent(data.address)
      safeRedirect(`/inbox/${encodedEmail}`)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  // iOS-safe button click handler
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!loading) {
      generateInbox()
    }
  }

  // Show loading while checking for existing inbox
  if (checkingExistingInbox) {
    return (
      <div className="text-center">
        <div className="text-4xl md:text-6xl mb-4">📧</div>
        <div className="text-gray-600 text-lg md:text-xl">Checking for existing inbox...</div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-gray-200 shadow-2xl">
        <p className="text-gray-700 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
          Create a temporary inbox that expires automatically. Perfect for signups, verification, and avoiding spam.
        </p>
        
        <button
          onClick={handleButtonClick}
          onTouchStart={() => {}} // iOS touch fix
          disabled={loading}
          className={`w-full py-4 md:py-5 px-6 md:px-8 rounded-2xl font-bold text-lg md:text-xl transition-all transform active:scale-95 ${
            loading
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95'
          }`}
          style={{
            // iOS Safari button fixes
            WebkitAppearance: 'none',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
          }}
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
            {error}
          </div>
        )}

        <div className="mt-6 md:mt-8 text-base md:text-lg text-gray-500 text-center">
          ⏱️ Your temporary email will be active for <span className="text-orange-600 font-semibold">10 minutes</span>
        </div>
      </div>
    </div>
  )
} 