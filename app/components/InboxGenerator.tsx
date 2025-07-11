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

export default function InboxGenerator() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [checkingExistingInbox, setCheckingExistingInbox] = useState(true)

  // Check for existing active inbox on page load
  useEffect(() => {
    const checkExistingInbox = () => {
      try {
        const storedInbox = localStorage.getItem('currentInbox')
        if (storedInbox) {
          const inboxData = JSON.parse(storedInbox)
          const now = new Date()
          const expiresAt = new Date(inboxData.expires_at)
          
          // If inbox is still active (not expired)
          if (now < expiresAt) {
            console.log('Found existing active inbox, redirecting...')
            const encodedEmail = encodeURIComponent(inboxData.address)
            window.location.href = `/inbox/${encodedEmail}`
            return
          } else {
            // Inbox expired, clean up
            localStorage.removeItem('currentInbox')
            console.log('Stored inbox expired, cleaned up')
          }
        }
      } catch (err) {
        console.error('Error checking existing inbox:', err)
        localStorage.removeItem('currentInbox')
      }
      
      setCheckingExistingInbox(false)
    }

    checkExistingInbox()
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
      })

      if (!response.ok) {
        throw new Error('Failed to create inbox')
      }

      const data: InboxData = await response.json()
      
      // Store inbox in localStorage for tab sharing
      localStorage.setItem('currentInbox', JSON.stringify({
        id: data.id,
        address: data.address,
        created_at: data.created_at,
        expires_at: data.expires_at
      }))
      
      // Redirect to inbox page
      const encodedEmail = encodeURIComponent(data.address)
      window.location.href = `/inbox/${encodedEmail}`
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  // Show loading while checking for existing inbox
  if (checkingExistingInbox) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">📧</div>
        <div className="text-gray-600 text-xl">Checking for existing inbox...</div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-200 shadow-2xl">
        <p className="text-gray-700 text-lg mb-8 leading-relaxed">
          Create a temporary inbox that expires automatically. Perfect for signups, verification, and avoiding spam.
        </p>
        
        <button
          onClick={generateInbox}
          disabled={loading}
          className={`w-full py-5 px-8 rounded-2xl font-bold text-xl transition-all transform ${
            loading
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-xl hover:shadow-2xl hover:scale-105'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-6 h-6 border-3 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
              Creating Your Inbox...
            </div>
          ) : (
            '🚀 Generate Your Inbox'
          )}
        </button>

        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 text-lg text-gray-500">
          ⏱️ Your temporary email will be active for <span className="text-orange-600 font-semibold">10 minutes</span>
        </div>
      </div>
    </div>
  )
} 