'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { getTrackingData, setLastInboxCreation } from '@/lib/userUtils'

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

export default function InboxGenerator() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentInbox, setCurrentInbox] = useState<InboxData | null>(null)
  const [emails, setEmails] = useState<EmailData[]>([])
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [copied, setCopied] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [expandedEmails, setExpandedEmails] = useState<Set<string>>(new Set())
  const [testEmailCount, setTestEmailCount] = useState(0)
  const [sendingTestEmail, setSendingTestEmail] = useState(false)

  // Toggle email expansion
  const toggleEmailExpansion = (emailId: string, event: React.MouseEvent) => {
    event.stopPropagation() // Prevent other click handlers
    setExpandedEmails(prev => {
      const newSet = new Set(prev)
      if (newSet.has(emailId)) {
        newSet.delete(emailId)
      } else {
        newSet.add(emailId)
      }
      return newSet
    })
  }

  // Cross-tab coordination for inbox generation
  const generateInbox = async () => {
    // Check if another tab is already creating an inbox
    const isCreating = localStorage.getItem('oneTimeEmail_creating')
    if (isCreating) {
      // Wait a bit and check if an inbox was created by another tab
      await new Promise(resolve => setTimeout(resolve, 1000))
      const savedInbox = localStorage.getItem('currentInbox')
      if (savedInbox) {
        try {
          const inbox = JSON.parse(savedInbox)
          setCurrentInbox(inbox)
          loadEmails(inbox.id)
          return
        } catch (error) {
          console.error('Error parsing saved inbox:', error)
        }
      }
    }

    // Set flag to indicate this tab is creating an inbox
    localStorage.setItem('oneTimeEmail_creating', 'true')
    
    setLoading(true)
    setError(null)

    try {
      // Get tracking data for bot detection
      const trackingData = getTrackingData()
      
      const response = await fetch('/api/create-inbox', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trackingData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || errorData.error || 'Failed to create inbox')
      }

      const data: InboxData = await response.json()
      
      // Store inbox in localStorage
      const inboxData = {
        success: data.success,
        id: data.id,
        address: data.address,
        created_at: data.created_at,
        expires_at: data.expires_at,
        message: data.message
      }
      
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('currentInbox', JSON.stringify(inboxData))
        }
      } catch (err) {
        console.warn('localStorage not available:', err)
      }
      
      setCurrentInbox(inboxData)
      calculateTimeRemaining(data.expires_at)
      loadEmails(data.id)
      
      // Update last creation time for rate limiting
      setLastInboxCreation()
      
    } catch (err) {
      console.error('Inbox generation error:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
      // Remove the creating flag
      localStorage.removeItem('oneTimeEmail_creating')
    }
  }

  // Load emails for the current inbox
  const loadEmails = async (inboxId: string) => {
    try {
      const { data, error } = await supabase
        .from('emails')
        .select('*')
        .eq('inbox_id', inboxId)
        .order('received_at', { ascending: false })

      if (error) {
        console.error('Error loading emails:', error)
      } else {
        setEmails(data || [])
      }
    } catch (err) {
      console.error('Error loading emails:', err)
    }
  }

  // Calculate time remaining
  const calculateTimeRemaining = (expiresAt: string) => {
    const now = new Date()
    const expiration = new Date(expiresAt)
    const remaining = Math.max(0, Math.floor((expiration.getTime() - now.getTime()) / 1000))
    setTimeRemaining(remaining)
  }

  // Format time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Copy email to clipboard
  const copyToClipboard = async () => {
    if (!currentInbox) return
    
    try {
      await navigator.clipboard.writeText(currentInbox.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard')
    }
  }

  // Delete current inbox
  const deleteInbox = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentInbox')
    }
    setCurrentInbox(null)
    setEmails([])
    setTimeRemaining(0)
  }

  // Add 10 more minutes (grace period)
  const addGracePeriod = () => {
    if (currentInbox && timeRemaining > 0) {
      const newTimeRemaining = 600 // Reset to exactly 10 minutes (600 seconds)
      setTimeRemaining(newTimeRemaining)

      // Update the expiration time in localStorage
      const newExpiresAt = new Date(Date.now() + newTimeRemaining * 1000)
      const updatedInbox = {
        ...currentInbox,
        expires_at: newExpiresAt.toISOString()
      }
      setCurrentInbox(updatedInbox)
      localStorage.setItem('currentInbox', JSON.stringify(updatedInbox))
    }
  }

  // Mark email as read
  const markEmailAsRead = async (emailId: string) => {
    try {
      await supabase
        .from('emails')
        .update({ is_read: true })
        .eq('id', emailId)

      setEmails(prev => 
        prev.map(email => 
          email.id === emailId ? { ...email, is_read: true } : email
        )
      )
    } catch (err) {
      console.error('Error marking email as read:', err)
    }
  }

  // Initialize inbox on mount
  useEffect(() => {
    const initializeInbox = async () => {
      const savedInbox = localStorage.getItem('currentInbox')
      if (savedInbox) {
        try {
          const inbox = JSON.parse(savedInbox)
          
          // Check if inbox is still valid
          const now = new Date()
          const expiresAt = new Date(inbox.expires_at)
          
          if (expiresAt > now) {
            setCurrentInbox(inbox)
            calculateTimeRemaining(inbox.expires_at)
            loadEmails(inbox.id)
          } else {
            // Clean up expired inbox
            localStorage.removeItem('currentInbox')
            await generateInbox()
          }
        } catch (error) {
          console.error('Error loading saved inbox:', error)
          localStorage.removeItem('currentInbox')
          await generateInbox()
        }
      } else {
        // No saved inbox, create a new one
        await generateInbox()
      }
      setIsInitialized(true)
    }

    initializeInbox()
  }, [])

  // Listen for localStorage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'currentInbox' && e.newValue) {
        try {
          const inbox = JSON.parse(e.newValue)
          setCurrentInbox(inbox)
          calculateTimeRemaining(inbox.expires_at)
          loadEmails(inbox.id)
        } catch (error) {
          console.error('Error parsing inbox from storage event:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Countdown timer
  useEffect(() => {
    if (currentInbox && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            deleteInbox()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [currentInbox, timeRemaining])

  // Real-time email updates
  useEffect(() => {
    if (currentInbox?.id) {
      const subscription = supabase
        .channel(`emails-${currentInbox.id}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'emails',
            filter: `inbox_id=eq.${currentInbox.id}`
          },
          (payload) => {
            const newEmail = payload.new as EmailData
            setEmails(prev => {
              const exists = prev.find(e => e.id === newEmail.id)
              if (exists) return prev
              return [newEmail, ...prev]
            })
          }
        )
        .subscribe()

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [currentInbox?.id])

  // Check how many test emails were already sent for this inbox
  useEffect(() => {
    if (currentInbox?.id && isInitialized) {
      const testEmailKey = `testEmailCount_${currentInbox.id}`
      const count = parseInt(localStorage.getItem(testEmailKey) || '0', 10)
      setTestEmailCount(count)
    }
  }, [currentInbox?.id, isInitialized])

  // Send test email
  const sendTestEmail = async () => {
    if (!currentInbox?.id || testEmailCount >= 5 || sendingTestEmail) return
    
    setSendingTestEmail(true)
    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inbox_id: currentInbox.id })
      })

      if (!response.ok) {
        throw new Error('Failed to send test email')
      }
      
      const data = await response.json()
      
      if (data.success) {
        // Increment test email count for this inbox
        const newCount = testEmailCount + 1
        const testEmailKey = `testEmailCount_${currentInbox.id}`
        localStorage.setItem(testEmailKey, newCount.toString())
        setTestEmailCount(newCount)
        
        // Refresh emails to show the new test email
        if (currentInbox.id) {
          loadEmails(currentInbox.id)
        }
      }
    } catch (err) {
      console.error('Error sending test email:', err)
      alert('Failed to send test email')
    } finally {
      setSendingTestEmail(false)
    }
  }

  // Show loading until initialized
  if (!isInitialized) {
    return (
      <div className="w-full max-w-lg">
        <div className="ios-safe-card bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-gray-200 shadow-2xl">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
            <div className="h-12 bg-gray-300 rounded-2xl"></div>
          </div>
        </div>
      </div>
    )
  }

  // Show inbox if we have one
  if (currentInbox) {
    return (
      <div className="w-full max-w-4xl">
        {/* Inbox Info */}
        <div className="ios-safe-card bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-gray-200 shadow-2xl mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">📧 Your Temporary Inbox</h2>
            {timeRemaining > 0 && (
              <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-4 border border-orange-300 inline-block">
                <div className="text-orange-700 text-sm font-medium mb-1">⏱️ TIME REMAINING</div>
                <div className="text-3xl font-bold text-gray-900 font-mono">
                  {formatTime(timeRemaining)}
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-100 rounded-2xl p-6 flex items-center justify-between border border-gray-300 mb-4">
            <span className="text-gray-900 font-mono text-lg break-all">{currentInbox.address}</span>
            <button
              onClick={copyToClipboard}
              className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                copied 
                  ? 'bg-emerald-500 text-white shadow-lg' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md'
              }`}
            >
              {copied ? '✅ Copied!' : '📋 Copy'}
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={deleteInbox}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-xl font-medium transition-all transform hover:scale-105 text-sm"
            >
              🗑️ Delete
            </button>
            <button
              onClick={addGracePeriod}
              disabled={timeRemaining <= 0}
              className={`flex-1 py-2 px-3 rounded-xl font-medium transition-all transform hover:scale-105 text-sm ${
                timeRemaining <= 0
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white shadow-md'
              }`}
              title={timeRemaining <= 0 ? 'Cannot extend expired inbox' : 'Add 10 more minutes to this inbox'}
            >
              ⏰ +10 min
            </button>
          </div>
        </div>

        {/* Emails Section */}
        <div className="ios-safe-card bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-gray-200 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              📬 Received Emails ({emails.length})
            </h3>
            <button
              onClick={sendTestEmail}
              disabled={sendingTestEmail || testEmailCount >= 5}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all transform hover:scale-105 text-sm md:text-base ${
                testEmailCount >= 5 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : sendingTestEmail
                  ? 'bg-orange-400 text-white cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white shadow-md'
              }`}
              title={testEmailCount >= 5 ? `Maximum 5 test emails reached (${testEmailCount}/5)` : `Send a test email (${testEmailCount}/5 used)`}
            >
              {testEmailCount >= 5 
                ? '✅ Limit Reached' 
                : sendingTestEmail 
                ? '📤 Sending...' 
                : `📧 Send Test Email (${5 - testEmailCount} left)`
              }
            </button>
          </div>

          {/* Test Email Status Message */}
          {testEmailCount > 0 && (
            <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded-xl text-blue-700 text-sm">
              <div className="flex items-center gap-2">
                <span>ℹ️</span>
                <span>
                  {testEmailCount >= 5 
                    ? 'Maximum 5 test emails reached for this inbox.' 
                    : `${testEmailCount} of 5 test emails used. ${5 - testEmailCount} remaining.`
                  }
                </span>
              </div>
            </div>
          )}

          {emails.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <div className="text-xl text-gray-700 mb-2">No emails yet</div>
              <div className="text-gray-500">Send an email to see it here!</div>
            </div>
          ) : (
            <div className="space-y-4">
              {emails.map((email) => {
                const isExpanded = expandedEmails.has(email.id)
                const emailBody = email.body || ''
                const hasHtmlContent = email.html_body && email.html_body.trim() !== ''
                const isLongEmail = emailBody.length > 150 || hasHtmlContent
                const displayBody = isExpanded ? emailBody : emailBody.substring(0, 150)
                const hasMeaningfulContent = emailBody.length > 0 || hasHtmlContent

                return (
                  <div 
                    key={email.id} 
                    className={`bg-white/60 rounded-2xl p-4 border transition-all cursor-pointer hover:bg-white/80 ${
                      email.is_read ? 'border-gray-300' : 'border-blue-400 bg-blue-50'
                    } ${isExpanded ? 'ring-2 ring-blue-200' : ''}`}
                    onClick={() => markEmailAsRead(email.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-semibold text-gray-900">{email.sender}</span>
                      <div className="flex items-center gap-2">
                        {!email.is_read ? (
                          <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">NEW</span>
                        ) : (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">✓ Read</span>
                        )}
                        <span className="text-sm text-gray-500">
                          {new Date(email.received_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="font-medium text-gray-800 mb-2">
                      {email.subject || '(No Subject)'}
                    </div>
                    
                    {/* Email Content */}
                    {hasMeaningfulContent ? (
                      <div className={`text-gray-600 text-sm leading-relaxed ${isExpanded && hasHtmlContent ? 'bg-gray-50 p-3 rounded-lg border-l-4 border-blue-400' : ''}`}>
                        {isExpanded ? (
                          // When expanded, show HTML if available, otherwise full plain text
                          hasHtmlContent ? (
                            <div 
                              className="prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{ __html: email.html_body }}
                            />
                          ) : (
                            <div className="whitespace-pre-wrap">
                              {emailBody}
                            </div>
                          )
                        ) : (
                          // When collapsed, show truncated plain text
                          <div>
                            {displayBody}
                            {isLongEmail && '...'}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm italic">
                        No content available
                      </div>
                    )}
                    
                    {/* Read More/Less Button */}
                    {hasMeaningfulContent && isLongEmail && (
                      <div className="mt-3 flex items-center justify-between">
                        <button
                          onClick={(e) => toggleEmailExpansion(email.id, e)}
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors hover:underline"
                        >
                          {isExpanded ? (
                            <>
                              <span>📄</span> Show less
                            </>
                          ) : (
                            <>
                              <span>📖</span> {hasHtmlContent ? 'View full email' : 'Read more'}
                            </>
                          )}
                        </button>
                        {isExpanded && !hasHtmlContent && (
                          <span className="text-xs text-gray-400">
                            {emailBody.length} characters
                          </span>
                        )}
                      </div>
                    )}

                    {/* Attachments */}
                    {email.attachments && email.attachments.length > 0 && (
                      <div className="mt-3 flex items-center gap-2 text-amber-600 text-sm">
                        📎 {email.attachments.length} attachment(s)
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Show initial generator
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
          </div>
        )}
      </div>
    </div>
  )
} 
