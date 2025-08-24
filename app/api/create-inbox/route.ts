import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

// Generate a random email address
function generateRandomEmail(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const randomString = Array.from({ length: 6 }, () => 
    chars[Math.floor(Math.random() * chars.length)]
  ).join('')
  
  return `${randomString}@onetimeemail.net`
}

// Hash IP address for privacy
function hashIP(ip: string): string {
  let hash = 0
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return `ip_${Math.abs(hash).toString(36)}`
}

// Get client IP address
function getClientIP(request: NextRequest): string {
  // Check various headers for IP address
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfIP = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  if (cfIP) {
    return cfIP
  }
  
  return 'unknown'
}

export async function POST(request: NextRequest) {
  try {
    // Get tracking data from request body and headers
    const body = await request.json().catch(() => ({}))
    const userId = body.user_id || 'anonymous'
    const sessionId = body.session_id || 'unknown_session'
    const fingerprint = body.fingerprint || 'unknown_fingerprint'
    const browserInfo = body.browser_info || {}
    const creationInterval = body.creation_interval || 0
    
    // Get server-side data
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referer = request.headers.get('referer') || 'direct'
    const clientIP = getClientIP(request)
    const hashedIP = hashIP(clientIP)

    // 🛡️ LIGHTWEIGHT BOT PROTECTION CHECK (fast, no database queries)
    const { botProtectionLightweight } = await import('@/lib/botProtection-lightweight')
    
    const botCheck = await botProtectionLightweight.checkUserSafety({
      user_id: userId,
      fingerprint: fingerprint,
      ip_address: hashedIP,
      creation_interval: creationInterval,
      user_agent: userAgent,
    })

    if (botCheck.shouldBlock) {
      console.warn('Bot detected and blocked:', {
        userId,
        fingerprint,
        reason: botCheck.reason,
        riskLevel: botCheck.riskLevel,
        ip: hashedIP,
      })

      // Single consistent error message for all rate limiting
      const userMessage = 'You are going too fast, wait for 30 seconds before creating inbox.'
      const retryAfter = 30

      return NextResponse.json(
        { 
          error: 'Rate limit exceeded', 
          message: userMessage,
          retryAfter: retryAfter,
        },
        { status: 429 }
      )
    }
    
    // Generate a temporary email address
    const emailAddress = generateRandomEmail()
    
    // Set expiry time (10 minutes from now)
    const createdAt = new Date()
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 10)
    
    // Save to database with all tracking data
    const { data, error } = await supabase
      .from('inbox')
      .insert([{
        email_address: emailAddress,
        created_at: createdAt.toISOString(),
        expires_at: expiresAt.toISOString(),
        user_id: userId,
        ip_address: hashedIP,
        user_agent: userAgent,
        fingerprint: fingerprint,
        referer: referer,
        session_id: sessionId,
        creation_interval: creationInterval,
        browser_info: browserInfo
      }])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { 
          error: 'Service temporarily unavailable', 
          message: 'We\'re experiencing technical difficulties. Please try again in a few moments.',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined 
        },
        { status: 500 }
      )
    }

    // 📊 METRICS: Track inbox creation and email generation
    try {
      await supabase.rpc('increment_metric', {
        metric_name_param: 'total_inboxes_created',
        increment_by: 1
      })
      await supabase.rpc('increment_metric', {
        metric_name_param: 'total_emails_generated',
        increment_by: 1
      })
    } catch (metricError) {
      console.warn('Failed to track inbox creation metrics:', metricError)
    }

    return NextResponse.json({
      success: true,
      id: data.id,
      address: emailAddress,
      created_at: createdAt.toISOString(),
      expires_at: expiresAt.toISOString(),
      message: 'Inbox created successfully'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { 
        error: 'Service temporarily unavailable',
        message: 'We\'re experiencing technical difficulties. Please try again in a few moments.',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Create Inbox API - Use POST method to create a new temporary inbox',
    endpoint: '/api/create-inbox',
    method: 'POST',
    features: {
      domain: '@onetimeemail.net',
      expiry: '10 minutes',
      storage: 'inbox table'
    }
  })
} 
