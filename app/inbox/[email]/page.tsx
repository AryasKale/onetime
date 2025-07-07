'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

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

// Types for inbox data
type InboxData = {
  id: string
  email_address: string
  created_at: string
  expires_at: string
  is_active: boolean
}

export default function InboxPage() {
  const router = useRouter()
  const params = useParams()
  const emailAddress = decodeURIComponent(params.email as string)
  
  const [inbox, setInbox] = useState<InboxData | null>(null)
  const [emails, setEmails] = useState<EmailData[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [copied, setCopied] = useState(false)
  const [loadingEmails, setLoadingEmails] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const [isOnline, setIsOnline] = useState(true)
  const [newEmailAlert, setNewEmailAlert] = useState<string | null>(null)
  const [expandedEmails, setExpandedEmails] = useState<Set<string>>(new Set())

  // Load inbox data on mount
  useEffect(() => {
    const loadInbox = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch inbox data from database
        const { data: inboxData, error: inboxError } = await supabase
          .from('inbox')
          .select('*')
          .eq('email_address', emailAddress)
          .eq('is_active', true)
          .single()

        if (inboxError || !inboxData) {
          console.error('Inbox not found:', inboxError)
          setError('Inbox not found or has expired')
          return
        }

        // Check if inbox has expired
        const now = new Date()
        const expiresAt = new Date(inboxData.expires_at)
        
        if (now > expiresAt) {
          setError('This inbox has expired')
          return
        }

        setInbox(inboxData)

        // Calculate time remaining
        const remaining = Math.max(0, Math.floor((expiresAt.getTime() - now.getTime()) / 1000))
        setTimeRemaining(remaining)

      } catch (err) {
        console.error('Error loading inbox:', err)
        setError('Failed to load inbox')
      } finally {
        setLoading(false)
      }
    }

    if (emailAddress) {
      loadInbox()
    }
  }, [emailAddress])

  // Countdown timer effect
  useEffect(() => {
    if (inbox && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Inbox expired - clean up localStorage
            localStorage.removeItem('currentInbox')
            setError('This inbox has expired - redirecting to home...')
            // Auto-redirect to home after 3 seconds
            setTimeout(() => {
              router.push('/')
            }, 3000)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [inbox, timeRemaining, router])

  // Set up realtime subscription for emails with polling fallback
  useEffect(() => {
    if (inbox?.id) {
      setLoadingEmails(true)

      // Verify this inbox matches what's stored in localStorage
      try {
        const storedInbox = localStorage.getItem('currentInbox')
        if (storedInbox) {
          const inboxData = JSON.parse(storedInbox)
          if (inboxData.id !== inbox.id) {
            // Different inbox than what's stored, update localStorage
            localStorage.setItem('currentInbox', JSON.stringify({
              id: inbox.id,
              address: inbox.email_address,
              created_at: inbox.created_at,
              expires_at: inbox.expires_at
            }))
          }
        } else {
          // No stored inbox, store this one
          localStorage.setItem('currentInbox', JSON.stringify({
            id: inbox.id,
            address: inbox.email_address,
            created_at: inbox.created_at,
            expires_at: inbox.expires_at
          }))
        }
      } catch (err) {
        console.error('Error managing localStorage:', err)
      }

      // Subscribe to realtime updates with enhanced settings
      const subscription = supabase
        .channel(`emails-${inbox.id}`, {
          config: {
            presence: {
              key: inbox.id,
            },
          },
        })
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'emails',
            filter: `inbox_id=eq.${inbox.id}`
          },
          (payload) => {
            console.log('🚀 New email received via realtime!', payload)
            const newEmail = payload.new as EmailData
            setEmails(prev => {
              // Prevent duplicates
              const exists = prev.find(e => e.id === newEmail.id)
              if (exists) return prev
              return [newEmail, ...prev]
            })
            
            // Show success alert
            setNewEmailAlert(`📧 New email from ${newEmail.sender}`)
            setTimeout(() => setNewEmailAlert(null), 5000)
            
            // Show browser notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('📧 New Email Received!', {
                body: `From: ${newEmail.sender}\nSubject: ${newEmail.subject || '(No Subject)'}`,
                icon: '/favicon.ico',
                tag: `email-${newEmail.id}` // Prevent duplicate notifications
              })
            }
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'emails',
            filter: `inbox_id=eq.${inbox.id}`
          },
          (payload) => {
            console.log('📧 Email updated via realtime!', payload)
            const updatedEmail = payload.new as EmailData
            setEmails(prev => 
              prev.map(email => 
                email.id === updatedEmail.id ? updatedEmail : email
              )
            )
          }
        )
        .subscribe()

      // Load existing emails
      const loadEmails = async () => {
        try {
          const { data, error } = await supabase
            .from('emails')
            .select('*')
            .eq('inbox_id', inbox.id)
            .order('received_at', { ascending: false })

          if (error) {
            console.error('Error loading emails:', error)
          } else {
            setEmails(data || [])
            console.log(`📬 Loaded ${data?.length || 0} existing emails`)
          }
        } catch (err) {
          console.error('Error loading emails:', err)
        } finally {
          setLoadingEmails(false)
        }
      }

      loadEmails()

      // Polling fallback for faster updates (every 5 seconds)
      const pollInterval = setInterval(async () => {
        try {
          const { data, error } = await supabase
            .from('emails')
            .select('*')
            .eq('inbox_id', inbox.id)
            .order('received_at', { ascending: false })
            .limit(10) // Only check latest 10 emails

          if (!error && data) {
            setEmails(prev => {
              const newEmails = data.filter(email => 
                !prev.find(prevEmail => prevEmail.id === email.id)
              )
              if (newEmails.length > 0) {
                console.log(`🔄 Found ${newEmails.length} new emails via polling`)
                return [...newEmails, ...prev]
              }
              return prev
            })
          }
        } catch (err) {
          console.error('Polling error:', err)
        }
      }, 5000) // Poll every 5 seconds

      return () => {
        subscription.unsubscribe()
        clearInterval(pollInterval)
      }
    }
  }, [inbox?.id])

  // Request notification permission & online status
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }

    // Online/offline detection
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Copy email to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard')
    }
  }

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

  // Manual refresh emails
  const refreshEmails = async () => {
    if (!inbox?.id) return
    
    setLoadingEmails(true)
    try {
      const { data, error } = await supabase
        .from('emails')
        .select('*')
        .eq('inbox_id', inbox.id)
        .order('received_at', { ascending: false })

      if (error) {
        console.error('Error refreshing emails:', error)
      } else {
        setEmails(data || [])
        setLastRefresh(new Date())
        console.log(`🔄 Refreshed: ${data?.length || 0} emails`)
      }
    } catch (err) {
      console.error('Error refreshing emails:', err)
    } finally {
      setLoadingEmails(false)
    }
  }

  // Generate new inbox (clears localStorage and goes to home)
  const generateNewInbox = () => {
    localStorage.removeItem('currentInbox')
    router.push('/')
  }

  // Toggle email expansion
  const toggleEmailExpansion = (emailId: string, event: React.MouseEvent) => {
    event.stopPropagation() // Prevent marking as read when clicking expand
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

  // Generate sender avatar
  const getSenderAvatar = (sender: string) => {
    const initials = sender.split('@')[0].substring(0, 2).toUpperCase()
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
      'bg-indigo-500', 'bg-yellow-500', 'bg-red-500', 'bg-gray-500'
    ]
    const colorIndex = sender.charCodeAt(0) % colors.length
    return { initials, color: colors[colorIndex] }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-gray-900 text-xl">Loading inbox...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">{error}</div>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Generate New Inbox
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">📧 Your Temporary Inbox</h1>
          <p className="text-gray-600 text-lg">Secure • Private • Auto-expiring</p>
        </div>

        {/* Inbox Info */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-gray-200 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-gray-600 text-sm font-medium">Your Email Address:</span>
                {timeRemaining > 0 && (
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                    🟢 Active
                  </span>
                )}
              </div>
              <div className="bg-gray-100 rounded-2xl p-6 flex items-center justify-between border border-gray-300">
                <span className="text-gray-900 font-mono text-xl break-all">{emailAddress}</span>
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
            </div>
            
            {/* BIGGER TIMER */}
            {timeRemaining > 0 && (
              <div className="lg:ml-8">
                <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6 border border-orange-300 text-center">
                  <div className="text-orange-700 text-sm font-medium mb-2">⏱️ TIME REMAINING</div>
                  <div className="text-5xl font-bold text-gray-900 font-mono mb-2 tracking-wider">
                    {formatTime(timeRemaining)}
                  </div>
                  <div className="text-orange-600 text-sm">Auto-expires</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Emails Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">📬 Received Emails ({emails.length})</h2>
            <div className="flex gap-3">
              <button
                onClick={refreshEmails}
                disabled={loadingEmails}
                className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${
                  loadingEmails 
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md'
                }`}
              >
                {loadingEmails ? '🔄 Refreshing...' : '🔄 Refresh'}
              </button>
              <button
                onClick={generateNewInbox}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-md"
              >
                ✨ New Inbox
              </button>
            </div>
          </div>
          
          {/* Status Bar */}
          <div className="flex items-center justify-between mb-6 text-sm bg-gray-100 rounded-xl p-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`}></div>
                <span className={isOnline ? 'text-emerald-700' : 'text-red-700'}>
                  {isOnline ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <div className="text-gray-600">
                🔄 Auto-refresh: 5s
              </div>
            </div>
            <div className="text-gray-600">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </div>
          </div>

          {/* New Email Alert */}
          {newEmailAlert && (
            <div className="mb-6 p-4 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-700 animate-pulse">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                {newEmailAlert}
              </div>
            </div>
          )}

          {loadingEmails ? (
            <div className="text-center py-12">
              <div className="text-gray-600 text-lg">Loading emails...</div>
            </div>
          ) : emails.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">📭</div>
              <div className="text-2xl text-gray-700 mb-4">No emails yet</div>
              <div className="text-gray-500 text-lg">Send an email to <span className="font-mono text-blue-600">{emailAddress}</span> to see it here!</div>
            </div>
          ) : (
            <div className="space-y-4">
              {emails.map((email) => {
                const avatar = getSenderAvatar(email.sender)
                const isExpanded = expandedEmails.has(email.id)
                const emailBody = email.body || '' // Handle null/undefined body
                const isLongEmail = emailBody.length > 200
                const displayBody = isExpanded ? emailBody : emailBody.substring(0, 200)
                const hasHtmlContent = email.html_body && email.html_body.trim() !== ''
                const hasMeaningfulContent = emailBody.length > 0 || hasHtmlContent
                
                return (
                  <div 
                    key={email.id} 
                    className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border transition-all cursor-pointer hover:bg-gray-50 hover:scale-[1.02] ${
                      email.is_read ? 'border-gray-300' : 'border-blue-400 bg-blue-50 shadow-lg'
                    } ${isExpanded ? 'ring-2 ring-blue-200 bg-blue-25' : ''}`}
                    onClick={() => markEmailAsRead(email.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full ${avatar.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                        {avatar.initials}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-900 font-semibold text-lg">{email.sender}</span>
                          <div className="flex items-center gap-3">
                            {!email.is_read && (
                              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">NEW</span>
                            )}
                            <span className="text-gray-500 text-sm">{formatEmailTime(email.received_at)}</span>
                          </div>
                        </div>
                        <div className="text-gray-800 font-medium mb-3 text-lg">
                          {email.subject || '(No Subject)'}
                        </div>
                        
                        {/* Email Content */}
                        {hasMeaningfulContent ? (
                          <div className={`text-gray-600 text-sm leading-relaxed ${isExpanded && hasHtmlContent ? 'bg-gray-50 p-4 rounded-lg border-l-4 border-blue-400' : ''}`}>
                            {isExpanded ? (
                              // When expanded, show HTML if available, otherwise simple full text
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
                        
                        {/* Expand/Collapse Button - Only show if there's meaningful content */}
                        {hasMeaningfulContent && (isLongEmail || hasHtmlContent) && (
                          <div className="mt-3 flex items-center justify-between">
                            <button
                              onClick={(e) => toggleEmailExpansion(email.id, e)}
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors hover:underline"
                            >
                              {isExpanded ? 'Show less' : hasHtmlContent ? 'View HTML' : 'Read more'}
                            </button>
                            {isExpanded && !hasHtmlContent && (
                              <span className="text-xs text-gray-400">
                                {emailBody.length} characters
                              </span>
                            )}
                          </div>
                        )}
                        
                        {email.attachments && email.attachments.length > 0 && (
                          <div className="mt-3 flex items-center gap-2 text-amber-600 text-sm">
                            📎 {email.attachments.length} attachment(s)
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 