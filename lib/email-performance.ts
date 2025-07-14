// Email Performance Optimization Utilities
// This file contains utilities to improve email display speed and responsiveness

export interface EmailCache {
  [inboxId: string]: {
    emails: any[]
    lastUpdated: Date
    ttl: number
  }
}

// In-memory cache for faster email retrieval
const emailCache: EmailCache = {}

export function getCachedEmails(inboxId: string): any[] | null {
  const cached = emailCache[inboxId]
  if (!cached) return null
  
  const now = new Date()
  const expired = (now.getTime() - cached.lastUpdated.getTime()) > cached.ttl
  
  if (expired) {
    delete emailCache[inboxId]
    return null
  }
  
  return cached.emails
}

export function setCachedEmails(inboxId: string, emails: any[], ttlMs: number = 30000): void {
  emailCache[inboxId] = {
    emails: [...emails],
    lastUpdated: new Date(),
    ttl: ttlMs
  }
}

export function clearEmailCache(inboxId?: string): void {
  if (inboxId) {
    delete emailCache[inboxId]
  } else {
    Object.keys(emailCache).forEach(key => delete emailCache[key])
  }
}

// Optimized email sorting for better performance
export function sortEmailsByDate(emails: any[]): any[] {
  return emails.sort((a, b) => {
    const dateA = new Date(a.received_at).getTime()
    const dateB = new Date(b.received_at).getTime()
    return dateB - dateA // Most recent first
  })
}

// Debounced email processing for better UX
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Optimized real-time subscription configuration
export const realtimeConfig = {
  config: {
    presence: {
      key: 'email-inbox',
    },
    broadcast: {
      self: false,
    },
    postgres_changes: {
      ack: true,
    },
  },
  // More aggressive polling for critical updates
  fastPollInterval: 1000, // 1 second for new emails
  normalPollInterval: 5000, // 5 seconds for regular updates
  slowPollInterval: 10000, // 10 seconds for background updates
}

// Email processing optimizations
export function processEmailForDisplay(email: any): any {
  return {
    ...email,
    // Pre-calculate display properties for better performance
    displaySender: email.sender.split('@')[0],
    displaySubject: email.subject || '(No Subject)',
    displayBody: email.body?.substring(0, 200) || '',
    hasLongBody: (email.body?.length || 0) > 200,
    hasHtmlContent: email.html_body && email.html_body.trim() !== '',
    displayTime: formatEmailTime(email.received_at),
    senderInitials: email.sender.split('@')[0].substring(0, 2).toUpperCase(),
    senderColor: getSenderColor(email.sender),
  }
}

function formatEmailTime(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
  return date.toLocaleDateString()
}

function getSenderColor(sender: string): string {
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
    'bg-indigo-500', 'bg-yellow-500', 'bg-red-500', 'bg-gray-500'
  ]
  const colorIndex = sender.charCodeAt(0) % colors.length
  return colors[colorIndex]
}

// Performance monitoring
export class EmailPerformanceMonitor {
  private static instance: EmailPerformanceMonitor
  private metrics: { [key: string]: number[] } = {}
  
  static getInstance(): EmailPerformanceMonitor {
    if (!this.instance) {
      this.instance = new EmailPerformanceMonitor()
    }
    return this.instance
  }
  
  recordMetric(name: string, value: number): void {
    if (!this.metrics[name]) {
      this.metrics[name] = []
    }
    this.metrics[name].push(value)
    
    // Keep only last 100 measurements
    if (this.metrics[name].length > 100) {
      this.metrics[name] = this.metrics[name].slice(-100)
    }
  }
  
  getAverageMetric(name: string): number {
    const values = this.metrics[name]
    if (!values || values.length === 0) return 0
    
    return values.reduce((sum, val) => sum + val, 0) / values.length
  }
  
  getMetrics(): { [key: string]: { average: number, count: number } } {
    const result: { [key: string]: { average: number, count: number } } = {}
    
    for (const [name, values] of Object.entries(this.metrics)) {
      result[name] = {
        average: this.getAverageMetric(name),
        count: values.length
      }
    }
    
    return result
  }
}

// Optimized email fetching with caching
export async function fetchEmailsOptimized(
  supabase: any,
  inboxId: string,
  useCache: boolean = true
): Promise<any[]> {
  const monitor = EmailPerformanceMonitor.getInstance()
  const startTime = performance.now()
  
  try {
    // Check cache first
    if (useCache) {
      const cached = getCachedEmails(inboxId)
      if (cached) {
        monitor.recordMetric('email_fetch_cache_hit', performance.now() - startTime)
        return cached.map(processEmailForDisplay)
      }
    }
    
    // Fetch from database
    const { data, error } = await supabase
      .from('emails')
      .select('*')
      .eq('inbox_id', inboxId)
      .order('received_at', { ascending: false })
      .limit(50) // Limit to 50 most recent emails for performance
    
    if (error) {
      console.error('Error fetching emails:', error)
      monitor.recordMetric('email_fetch_error', performance.now() - startTime)
      return []
    }
    
    const emails = data || []
    
    // Cache the results
    if (useCache && emails.length > 0) {
      setCachedEmails(inboxId, emails, 15000) // Cache for 15 seconds
    }
    
    monitor.recordMetric('email_fetch_success', performance.now() - startTime)
    return emails.map(processEmailForDisplay)
    
  } catch (error) {
    console.error('Error in fetchEmailsOptimized:', error)
    monitor.recordMetric('email_fetch_error', performance.now() - startTime)
    return []
  }
} 