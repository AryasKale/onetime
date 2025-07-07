import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { createHmac } from 'crypto'

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
    
    // Verify HMAC signature
    if (!timestamp || !token || !signature) {
      console.error('Missing Mailgun signature fields')
      return NextResponse.json(
        { error: 'Missing signature fields' },
        { status: 401 }
      )
    }

    if (!verifyMailgunSignature(timestamp, token, signature)) {
      console.error('Invalid Mailgun signature')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    // Check timestamp to prevent replay attacks (optional but recommended)
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

    console.log('✅ Mailgun signature verified successfully')
    
    // Extract required fields from Mailgun webhook
    const recipient = formData.get('recipient') as string
    const sender = formData.get('sender') as string
    const subject = formData.get('subject') as string || ''
    const bodyPlain = formData.get('body-plain') as string || ''
    const bodyHtml = formData.get('body-html') as string || ''
    const attachmentCount = parseInt(formData.get('attachment-count') as string || '0')
    
    // Validate required fields
    if (!recipient || !sender) {
      return NextResponse.json(
        { error: 'Missing required fields: recipient and sender' },
        { status: 400 }
      )
    }

    console.log(`Received email for: ${recipient} from: ${sender}`)

    // Find the corresponding inbox by email address
    const { data: inboxData, error: inboxError } = await supabase
      .from('inbox')
      .select('id, expires_at, is_active')
      .eq('email_address', recipient)
      .eq('is_active', true)
      .single()

    if (inboxError || !inboxData) {
      console.error('Inbox not found:', inboxError)
      return NextResponse.json(
        { error: 'Inbox not found or inactive', recipient },
        { status: 404 }
      )
    }

    // Check if inbox has expired
    const now = new Date()
    const expiresAt = new Date(inboxData.expires_at)
    
    if (now > expiresAt) {
      console.log(`Email rejected - inbox expired: ${recipient}`)
      return NextResponse.json(
        { error: 'Inbox has expired', recipient, expires_at: inboxData.expires_at },
        { status: 410 }
      )
    }

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