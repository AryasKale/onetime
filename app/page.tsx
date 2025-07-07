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

export default function Home() {
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
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📧</div>
          <div className="text-gray-600 text-xl">Checking for existing inbox...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="mb-10">
            <div className="text-8xl mb-6">📧</div>
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              One-Time Email
            </h1>
            <p className="text-2xl text-gray-600 mb-8">
              Generate temporary email addresses that self-destruct
            </p>
          </div>

          {/* Main CTA */}
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
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
            <div className="text-5xl mb-6">👤</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Identity</h3>
            <p className="text-gray-600 text-lg leading-relaxed">Same inbox across all your browser tabs. No confusion, no multiple emails.</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
            <div className="text-5xl mb-6">🗑️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Auto-Delete</h3>
            <p className="text-gray-600 text-lg leading-relaxed">Emails automatically expire and delete after 10 minutes, keeping your privacy intact.</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
            <div className="text-5xl mb-6">🔒</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">100% Private</h3>
            <p className="text-gray-600 text-lg leading-relaxed">No tracking, no data collection. Your temporary emails are completely anonymous and secure.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
