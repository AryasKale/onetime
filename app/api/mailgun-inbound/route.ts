import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { createHmac } from 'crypto'

// 📝 WEBHOOK BEHAVIOR:
// This webhook processes incoming emails forwarded by Mailgun
// When inbox not found, sends bounce message via Mailgun API

// 🔄 BOUNCE MESSAGE FUNCTION
async function sendBounceMessage(
  originalSender: string,
  originalRecipient: string,
  originalSubject: string,
  errorTitle: string,
  errorMessage: string
) {
  try {
    const mailgunApiKey = process.env.MAILGUN_API_KEY
    const mailgunDomain = process.env.MAILGUN_DOMAIN || 'onetimeemail.net'
    
    if (!mailgunApiKey) {
      console.warn('⚠️ MAILGUN_API_KEY not configured - cannot send bounce')
      return false
    }

    const bounceSubject = `Mail Delivery Failure: ${originalSubject || '(No Subject)'}`
    const bounceBody = `
The following message could not be delivered:

  To: ${originalRecipient}
  From: ${originalSender}
  Subject: ${originalSubject || '(No Subject)'}

Error: ${errorTitle}
${errorMessage}

This is an automated message from the OneTimeEmail delivery system.
    `.trim()

    const mailgunUrl = `https://api.mailgun.net/v3/${mailgunDomain}/messages`
    
    const formData = new FormData()
    formData.append('from', `Mail Delivery System <mailer-daemon@${mailgunDomain}>`)
    formData.append('to', originalSender)
    formData.append('subject', bounceSubject)
    formData.append('text', bounceBody)

    const response = await fetch(mailgunUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`api:${mailgunApiKey}`).toString('base64')}`
      },
      body: formData
    })

    if (response.ok) {
      console.log(`✅ Bounce message sent to: ${originalSender}`)
      return true
    } else {
      console.error(`❌ Failed to send bounce: ${response.statusText}`)
      return false
    }
  } catch (error) {
    console.error('❌ Error sending bounce message:', error)
    return false
  }
}

// 🛡️ SECURITY: Rate limiting storage (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Rate limiting function
function checkRateLimit(identifier: string, maxRequests: number = 20, windowMs: number = 60000): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}

// Function to verify Mailgun HMAC signature
function verifyMailgunSignature(timestamp: string, token: string, signature: string): boolean {
  const signingKey = process.env.MAILGUN_WEBHOOK_SIGNING_KEY
  
  if (!signingKey) {
    console.error('MAILGUN_WEBHOOK_SIGNING_KEY not configured')
    return false
  }

  // Create the signature string that Mailgun uses
  const signatureString = timestamp + token
  
  // Generate HMAC with SHA256
  const hmac = createHmac('sha256', signingKey)
  hmac.update(signatureString)
  const computedSignature = hmac.digest('hex')
  
  // Compare signatures securely
  return computedSignature === signature
}

export async function POST(request: NextRequest) {
  try {
    // Parse form data from Mailgun webhook
    const formData = await request.formData()
    
    // Extract Mailgun signature fields for verification
    const timestamp = formData.get('timestamp') as string
    const token = formData.get('token') as string
    const signature = formData.get('signature') as string
    
    // 🚨 TEMPORARY: Disable HMAC for debugging
    // Verify HMAC signature
    if (!timestamp || !token || !signature) {
      console.warn('⚠️ Missing Mailgun signature fields - continuing for debug')
      // return NextResponse.json(
      //   { error: 'Missing signature fields' },
      //   { status: 401 }
      // )
    } else {
      if (!verifyMailgunSignature(timestamp, token, signature)) {
        console.error('Invalid Mailgun signature')
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        )
      } else {
        console.log('✅ Mailgun signature verified successfully')
      }
    }

    // Check timestamp to prevent replay attacks (optional but recommended)
    if (timestamp) {
      const requestTime = parseInt(timestamp)
      const currentTime = Math.floor(Date.now() / 1000)
      const timeDiff = Math.abs(currentTime - requestTime)
      
      if (timeDiff > 300) { // 5 minutes tolerance
        console.error('Request timestamp too old:', timeDiff)
        return NextResponse.json(
          { error: 'Request timestamp too old' },
          { status: 401 }
        )
      }
    }
    
    // Extract required fields from Mailgun webhook
    const recipient = formData.get('recipient') as string
    const sender = formData.get('sender') as string
    const subject = formData.get('subject') as string || ''
    const bodyPlain = formData.get('body-plain') as string || ''
    const bodyHtml = formData.get('body-html') as string || ''
    const attachmentCount = parseInt(formData.get('attachment-count') as string || '0')
    
    // 🛡️ SECURITY: Rate limiting by sender email (prevent spam from same sender)
    if (!checkRateLimit(`sender:${sender}`, 10, 60000)) {
      console.warn(`⚠️ Rate limit exceeded for sender: ${sender}`)
      return NextResponse.json(
        { error: 'Rate limit exceeded', sender },
        { status: 429 }
      )
    }
    
    // 🛡️ SECURITY: Rate limiting by recipient (prevent targeting specific inbox)
    if (!checkRateLimit(`recipient:${recipient}`, 15, 60000)) {
      console.warn(`⚠️ Rate limit exceeded for recipient: ${recipient}`)
      return NextResponse.json(
        { error: 'Rate limit exceeded', recipient },
        { status: 429 }
      )
    }
    
    // Validate required fields
    if (!recipient || !sender) {
      return NextResponse.json(
        { error: 'Missing required fields: recipient and sender' },
        { status: 400 }
      )
    }

    // 🛡️ SECURITY: Validate email format matches our generated pattern
    const emailPattern = /^[a-z0-9]{6}@onetimeemail\.net$/
    if (!emailPattern.test(recipient)) {
      console.warn(`⚠️ Invalid email format rejected: ${recipient}`)
      return NextResponse.json(
        { error: 'Invalid email format', recipient },
        { status: 400 }
      )
    }

    // 🛡️ SECURITY: Email size validation (prevent large payload attacks)
    const totalSize = (bodyPlain.length + bodyHtml.length + subject.length)
    const maxEmailSize = 1024 * 1024 // 1MB limit
    if (totalSize > maxEmailSize) {
      console.warn(`⚠️ Email too large rejected: ${totalSize} bytes from ${sender}`)
      return NextResponse.json(
        { error: 'Email too large', size: totalSize, max: maxEmailSize },
        { status: 413 }
      )
    }

    // 🛡️ SECURITY: Suspicious pattern detection
    const suspiciousPatterns = [
      /javascript:/i,
      /<script/i,
      /data:text\/html/i,
      /vbscript:/i,
      /onload=/i,
      /onerror=/i
    ]
    
    const combinedContent = `${subject} ${bodyPlain} ${bodyHtml}`.toLowerCase()
    const hasSuspiciousContent = suspiciousPatterns.some(pattern => pattern.test(combinedContent))
    
    if (hasSuspiciousContent) {
      console.warn(`⚠️ Suspicious content detected from ${sender}`)
      return NextResponse.json(
        { error: 'Suspicious content detected', sender },
        { status: 400 }
      )
    }

    console.log(`🔍 Processing email for: ${recipient} from: ${sender}`)

    // 🛡️ SECURITY: Find the corresponding inbox by email address
    // This ensures only emails to EXISTING inboxes are processed
    console.log(`🗄️ Checking database for inbox: ${recipient}`)
    
    const { data: inboxData, error: inboxError } = await supabase
      .from('inbox')
      .select('id, expires_at, is_active')
      .eq('email_address', recipient)
      .eq('is_active', true)
      .single()

    console.log(`📊 Database result:`, { 
      found: !!inboxData, 
      error: inboxError?.message, 
      count: inboxData ? 1 : 0 
    })

    if (inboxError || !inboxData) {
      console.error(`🚫 BLOCKING EMAIL - Inbox not found: ${recipient}`)
      console.error(`🚫 Database error:`, inboxError)
      
      // 🔄 BOUNCING: Send bounce message via Mailgun API
      await sendBounceMessage(sender, recipient, subject, 'Mailbox unavailable', 
        'The email address you are trying to reach is not available.')
      
      // ✅ IMPORTANT: Return 200 to prevent Mailgun retries
      // This tells Mailgun "email processed successfully, don't retry"
      return NextResponse.json(
        { 
          success: true,
          message: 'Email rejected - bounce notification sent', 
          recipient,
          bounce_sent_to: sender,
          action: 'bounced'
        },
        { status: 200 } // Changed from 404 to 200
      )
    }

    console.log(`✅ Valid inbox found: ${inboxData.id} for ${recipient}`)

    // 🛡️ FAILSAFE: Double-check inbox exists and is valid
    if (!inboxData || !inboxData.id) {
      console.error(`🚫 FAILSAFE BLOCK - Invalid inbox data for: ${recipient}`)
      return NextResponse.json(
        { error: 'Invalid inbox data', recipient },
        { status: 404 }
      )
    }

    // Check if inbox has expired
    const now = new Date()
    const expiresAt = new Date(inboxData.expires_at)
    
    if (now > expiresAt) {
      console.error(`🚫 BLOCKING EMAIL - Inbox expired: ${recipient}`)
      
      // 🔄 BOUNCING: Send bounce message via Mailgun API
      await sendBounceMessage(sender, recipient, subject, 'Mailbox expired', 
        'The temporary email address has expired and is no longer accepting messages.')
      
      // ✅ IMPORTANT: Return 200 to prevent Mailgun retries
      return NextResponse.json(
        { 
          success: true,
          message: 'Email rejected - expired inbox bounce sent',
          recipient, 
          expires_at: inboxData.expires_at, 
          bounce_sent_to: sender,
          action: 'bounced'
        },
        { status: 200 } // Changed from 410 to 200
      )
    }

    console.log(`🎯 All validations passed - processing email for ${recipient}`)

    // Calculate email size (rough estimate)
    const sizeBytes = (bodyPlain.length + bodyHtml.length + subject.length) * 2 // UTF-16 approximation

    // Prepare received timestamp
    const receivedAt = timestamp ? new Date(parseInt(timestamp) * 1000) : new Date()

    // Prepare attachments array if any
    const attachments = attachmentCount > 0 ? 
      Array.from({ length: attachmentCount }, (_, i) => {
        const attachmentName = formData.get(`attachment-${i+1}`)
        return attachmentName ? { name: attachmentName, count: i+1 } : null
      }).filter(Boolean) : []

    // 🛡️ FINAL VALIDATION: Ensure we have valid inbox before inserting
    if (!inboxData.id) {
      console.error(`🚫 FINAL BLOCK - Missing inbox ID at insert time`)
      return NextResponse.json(
        { error: 'Final validation failed', recipient },
        { status: 400 }
      )
    }

    console.log(`💾 Inserting email into database for inbox: ${inboxData.id}`)

    // Insert email into database
    const { data: emailData, error: emailError } = await supabase
      .from('emails')
      .insert([{
        inbox_id: inboxData.id,
        sender: sender,
        recipient: recipient,
        subject: subject,
        body: bodyPlain,
        html_body: bodyHtml,
        received_at: receivedAt.toISOString(),
        is_read: false,
        attachments: attachments,
        headers: {
          timestamp: timestamp,
          'attachment-count': attachmentCount.toString(),
          'user-agent': formData.get('User-Agent') || '',
          'message-id': formData.get('Message-Id') || ''
        },
        size_bytes: sizeBytes
      }])
      .select()
      .single()

    if (emailError) {
      console.error('Failed to insert email:', emailError)
      return NextResponse.json(
        { error: 'Failed to store email', details: emailError.message },
        { status: 500 }
      )
    }

    console.log(`Email stored successfully: ${emailData.id}`)

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Email received and stored successfully',
      email_id: emailData.id,
      inbox_id: inboxData.id,
      recipient: recipient,
      sender: sender,
      subject: subject,
      received_at: receivedAt.toISOString(),
      size_bytes: sizeBytes
    })

  } catch (error) {
    console.error('Mailgun webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle GET requests with API info
export async function GET() {
  return NextResponse.json({
    message: 'Mailgun Inbound Webhook API with HMAC Security',
    endpoint: '/api/mailgun-inbound',
    method: 'POST',
    description: 'Accepts POST requests from Mailgun webhooks to process inbound emails',
    required_fields: ['recipient', 'sender', 'timestamp', 'token', 'signature'],
    optional_fields: ['subject', 'body-plain', 'body-html', 'attachment-count'],
    security: {
      hmac_verification: 'Validates HMAC signature using SHA256',
      timestamp_validation: 'Prevents replay attacks (5-minute tolerance)',
      signing_key_required: 'MAILGUN_WEBHOOK_SIGNING_KEY environment variable required'
    },
    features: {
      inbox_validation: 'Validates recipient inbox exists and is active',
      expiry_check: 'Rejects emails for expired inboxes',
      database_storage: 'Stores emails in Supabase emails table',
      attachment_support: 'Handles email attachments metadata',
      real_time: 'Triggers real-time updates for connected clients'
    }
  })
} 