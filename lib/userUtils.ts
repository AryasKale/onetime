// Enhanced user identification utility with bot detection
// Generates user IDs and collects browser data for bot detection

export function generateUserId(): string {
  // Generate a random user ID with timestamp and random string
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8)
  return `user_${timestamp}_${randomStr}`
}

export function generateSessionId(): string {
  // Generate a session ID
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 10)
  return `session_${timestamp}_${randomStr}`
}

export function generateFingerprint(): string {
  // Generate a simple browser fingerprint for bot detection
  if (typeof window === 'undefined') {
    return 'server_fingerprint'
  }

  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx!.textBaseline = 'top'
    ctx!.font = '14px Arial'
    ctx!.fillText('Browser fingerprint', 2, 2)
    
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset(),
      canvas.toDataURL()
    ].join('|')
    
    // Create a simple hash of the fingerprint
    let hash = 0
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    
    return `fp_${Math.abs(hash).toString(36)}`
  } catch (error) {
    return `fp_fallback_${Date.now().toString(36)}`
  }
}

export function getBrowserInfo(): object {
  if (typeof window === 'undefined') {
    return { environment: 'server' }
  }

  try {
    return {
      screen_width: screen.width,
      screen_height: screen.height,
      screen_depth: screen.colorDepth,
      timezone_offset: new Date().getTimezoneOffset(),
      language: navigator.language,
      languages: navigator.languages,
      platform: navigator.platform,
      cookies_enabled: navigator.cookieEnabled,
      online: navigator.onLine,
      touch_support: 'ontouchstart' in window,
      local_storage: typeof(Storage) !== 'undefined',
      session_storage: typeof(sessionStorage) !== 'undefined'
    }
  } catch (error) {
    return { error: 'Could not collect browser info' }
  }
}

export function getUserId(): string {
  // Check if we're in browser environment
  if (typeof window === 'undefined') {
    return 'server_user'
  }

  try {
    // Get existing user ID from localStorage
    let userId = localStorage.getItem('onetimeemail_user_id')
    
    // If no user ID exists, generate a new one
    if (!userId) {
      userId = generateUserId()
      localStorage.setItem('onetimeemail_user_id', userId)
    }
    
    return userId
  } catch (error) {
    // Fallback if localStorage is not available
    console.warn('localStorage not available, using fallback user ID')
    return `fallback_${Date.now()}`
  }
}

export function getSessionId(): string {
  if (typeof window === 'undefined') {
    return 'server_session'
  }

  try {
    // Get existing session ID from sessionStorage
    let sessionId = sessionStorage.getItem('onetimeemail_session_id')
    
    // If no session ID exists, generate a new one
    if (!sessionId) {
      sessionId = generateSessionId()
      sessionStorage.setItem('onetimeemail_session_id', sessionId)
    }
    
    return sessionId
  } catch (error) {
    return `session_fallback_${Date.now()}`
  }
}

export function getLastInboxCreation(): Date | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const lastCreation = localStorage.getItem('onetimeemail_last_inbox_creation')
    return lastCreation ? new Date(lastCreation) : null
  } catch (error) {
    return null
  }
}

export function setLastInboxCreation(): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.setItem('onetimeemail_last_inbox_creation', new Date().toISOString())
  } catch (error) {
    console.warn('Could not save last inbox creation time')
  }
}

export function getCreationInterval(): number {
  const lastCreation = getLastInboxCreation()
  if (!lastCreation) {
    return 0 // First inbox creation
  }
  
  const now = new Date()
  const intervalMs = now.getTime() - lastCreation.getTime()
  return Math.floor(intervalMs / 1000) // Convert to seconds
}

export function resetUserId(): string {
  // Generate a new user ID and store it
  const newUserId = generateUserId()
  
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('onetimeemail_user_id', newUserId)
    } catch (error) {
      console.warn('Could not save new user ID to localStorage')
    }
  }
  
  return newUserId
}

export function getTrackingData() {
  return {
    user_id: getUserId(),
    session_id: getSessionId(),
    fingerprint: generateFingerprint(),
    browser_info: getBrowserInfo(),
    creation_interval: getCreationInterval()
  }
} 
