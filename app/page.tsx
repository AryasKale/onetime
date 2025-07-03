'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

// Types for our inbox data
type InboxData = {
  success: boolean
  id: string
  address: string
  created_at: string
  expires_at: string
  message: string
}

// Types for email data
type EmailData = {
  id: string
  inbox_id: string
  sender: string
  recipient: string
  subject: string
  body: string
  html_body: string
  received_at: string
  is_read: boolean
  attachments: any[]
  headers: any
  size_bytes: number
}

export default function Home() {
  const [inbox, setInbox] = useState<InboxData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [copied, setCopied] = useState(false)
  const [emails, setEmails] = useState<EmailData[]>([])
  const [inboxId, setInboxId] = useState<string | null>(null)
  const [loadingEmails, setLoadingEmails] = useState(false)
  const [emailsError, setEmailsError] = useState<string | null>(null)

  // Countdown timer effect
  useEffect(() => {
    if (inbox && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Inbox expired
            setInbox(null)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [inbox, timeRemaining])

  // Calculate time remaining when inbox is created
  useEffect(() => {
    if (inbox) {
      const expiresAt = new Date(inbox.expires_at).getTime()
      const now = new Date().getTime()
      const remaining = Math.max(0, Math.floor((expiresAt - now) / 1000))
      setTimeRemaining(remaining)
    }
  }, [inbox])

  // Set up realtime subscription for emails and load existing emails
  useEffect(() => {
    if (inboxId) {
      setLoadingEmails(true)
      setEmailsError(null)

      // Subscribe to realtime updates on emails table
      const subscription = supabase
        .channel('emails-changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'emails',
            filter: `inbox_id=eq.${inboxId}`
          },
          (payload) => {
            console.log('New email received!', payload)
            const newEmail = payload.new as EmailData
            setEmails(prev => [newEmail, ...prev]) // Add to beginning of list
            
            // Optional: Show browser notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('New Email Received!', {
                body: `From: ${newEmail.sender}\nSubject: ${newEmail.subject || '(No Subject)'}`,
                icon: '/favicon.ico'
              })
            }
          }
        )
        .subscribe()

      // Load existing emails for this inbox
      const loadExistingEmails = async () => {
        try {
          const { data, error } = await supabase
            .from('emails')
            .select('*')
            .eq('inbox_id', inboxId)
            .order('received_at', { ascending: false })

          if (error) {
            console.error('Error loading emails:', error)
            setEmailsError('Failed to load emails')
          } else {
            setEmails(data || [])
            console.log(`Loaded ${data?.length || 0} existing emails`)
          }
        } catch (err) {
          console.error('Error loading emails:', err)
          setEmailsError('Failed to load emails')
        } finally {
          setLoadingEmails(false)
        }
      }

      loadExistingEmails()

      // Cleanup subscription on unmount or inbox change
      return () => {
        subscription.unsubscribe()
      }
    }
  }, [inboxId])

  // Request notification permission on component mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  // Format time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Format email timestamp
  const formatEmailTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  // Generate new inbox
  const generateInbox = async () => {
    setLoading(true)
    setError(null)
    setCopied(false)

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
      setInbox(data)
      setInboxId(data.id) // Set inbox ID for realtime subscription
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  // Copy email to clipboard
  const copyToClipboard = async () => {
    if (inbox) {
      try {
        await navigator.clipboard.writeText(inbox.address)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy to clipboard')
      }
    }
  }

  // Send test email
  const sendTestEmail = async () => {
    if (!inboxId) return

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inbox_id: inboxId })
      })

      if (!response.ok) {
        throw new Error('Failed to send test email')
      }

      // The email will appear automatically via realtime subscription
      console.log('Test email sent successfully')
    } catch (err) {
      console.error('Error sending test email:', err)
    }
  }

  // Reset to initial state
  const createNewInbox = () => {
    setInbox(null)
    setError(null)
    setTimeRemaining(0)
    setCopied(false)
    setEmails([])
    setInboxId(null)
    setLoadingEmails(false)
    setEmailsError(null)
  }

  // Mark email as read
  const markEmailAsRead = async (emailId: string) => {
    try {
      const { error } = await supabase
        .from('emails')
        .update({ is_read: true })
        .eq('id', emailId)

      if (!error) {
        setEmails(prev => 
          prev.map(email => 
            email.id === emailId 
              ? { ...email, is_read: true }
              : email
          )
        )
      }
    } catch (err) {
      console.error('Error marking email as read:', err)
    }
  }

  if (inbox) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-start justify-center p-4 pt-8">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Your Temporary Inbox
            </h1>
            <p className="text-gray-600">
              Use this email address for signups and verification
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-6">
            {/* Email Address Display */}
            <div className="text-center mb-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-4 border-2 border-dashed border-gray-200">
                <div className="font-mono text-lg font-semibold text-gray-800 break-all">
                  {inbox.address}
                </div>
              </div>
              
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {copied ? 'Copied!' : 'Copy Email'}
              </button>
            </div>

            {/* Countdown Timer */}
            <div className="text-center mb-6">
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <div className="text-red-600 font-semibold text-sm uppercase tracking-wide mb-1">
                  Time Remaining
                </div>
                <div className="text-3xl font-bold text-red-700 font-mono">
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-red-500 text-sm mt-1">
                  This inbox will self-destruct
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Active & Receiving
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={sendTestEmail}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 text-sm"
                >
                  📧 Send Test Email
                </button>
                <button
                  onClick={createNewInbox}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 text-sm"
                >
                  🔄 New Inbox
                </button>
              </div>
              
              <div className="text-center">
                <div className="text-blue-600 text-sm font-medium mb-2">
                  Received Emails ({emails.length})
                </div>
              </div>
            </div>
          </div>

          {/* Email List Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  📬 Inbox ({emails.length})
                </h2>
                {loadingEmails && (
                  <div className="flex items-center text-blue-600 text-sm">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading emails...
                  </div>
                )}
              </div>
            </div>

            {/* Loading State */}
            {loadingEmails && emails.length === 0 && (
              <div className="p-8 text-center">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                </div>
              </div>
            )}

            {/* Error State */}
            {emailsError && (
              <div className="p-6 text-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{emailsError}</p>
                </div>
              </div>
            )}

            {/* Email List */}
            {!loadingEmails && emails.length > 0 && (
              <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                {emails.map((email) => (
                  <div 
                    key={email.id} 
                    className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group"
                    onClick={() => markEmailAsRead(email.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center min-w-0 flex-1">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3 flex-shrink-0">
                              {email.sender.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-gray-900 truncate">
                                {email.sender}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                To: {email.recipient}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs text-gray-500">
                              {formatEmailTime(email.received_at)}
                            </span>
                            {!email.is_read && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                New
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {email.subject || '(No Subject)'}
                          </h3>
                        </div>

                        {email.body && (
                          <div className="mb-3">
                            <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                              {email.body.length > 300 
                                ? `${email.body.substring(0, 300)}...` 
                                : email.body
                              }
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-4">
                            <span>Size: {Math.round(email.size_bytes / 1024)}KB</span>
                            {email.attachments && email.attachments.length > 0 && (
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                                {email.attachments.length} attachment(s)
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(email.received_at).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loadingEmails && emails.length === 0 && !emailsError && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No emails yet</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Your temporary inbox is active and ready to receive emails.
                  <br />
                  New emails will appear here automatically!
                </p>
                <button
                  onClick={sendTestEmail}
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  📧 Send Test Email
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm text-gray-500">
            <div>
              <div className="font-semibold text-gray-900">{emails.length}</div>
              <div>Emails</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">{Math.ceil(timeRemaining / 60)}</div>
              <div>Minutes Left</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900">100%</div>
              <div>Private</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            One-Time Email
          </h1>
          <p className="text-gray-600 text-lg">
            Generate temporary email addresses that self-destruct
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg 
                  className="w-8 h-8 text-blue-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-sm mb-6">
                Create a temporary inbox that expires automatically. Perfect for signups, verification, and avoiding spam.
              </p>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            
            <button 
              onClick={generateInbox}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </div>
              ) : (
                'Generate Inbox'
              )}
            </button>
            
            <div className="mt-4 text-xs text-gray-400">
              Your temporary email will be active for 10 minutes
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No Registration
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Auto-Delete
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              100% Private
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
