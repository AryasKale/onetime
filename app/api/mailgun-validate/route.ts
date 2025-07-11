import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

// 🔄 MAILGUN PRE-VALIDATION ENDPOINT
// This endpoint is called by Mailgun BEFORE accepting emails
// Returning specific status codes here WILL trigger proper email bounces
// This is the correct way to implement bounce notifications

export async function POST(request: NextRequest) {
  try {
    // Parse form data from Mailgun pre-validation webhook
    const formData = await request.formData()
    const recipient = formData.get('recipient') as string
    const sender = formData.get('sender') as string
    
    if (!recipient) {
      return NextResponse.json(
        { error: 'Missing recipient' },
        { status: 400 }
      )
    }

    console.log(`🔍 Pre-validating email for: ${recipient} from: ${sender}`)

    // 🛡️ SECURITY: Email format validation
    const emailPattern = /^[a-z0-9]{6}@onetimeemail\.net$/
    if (!emailPattern.test(recipient)) {
      console.warn(`⚠️ Invalid email format rejected: ${recipient}`)
      
      // 🔄 PROPER BOUNCING: Return 550 to trigger bounce at Mailgun level
      return NextResponse.json(
        { 
          error: 'Invalid email address',
          message: 'The email address format is not valid for this service.'
        },
        { status: 550 } // This WILL trigger a bounce message
      )
    }

    // 🛡️ SECURITY: Check if inbox exists in database
    const { data: inboxData, error: inboxError } = await supabase
      .from('inbox')
      .select('id, expires_at, is_active')
      .eq('email_address', recipient)
      .eq('is_active', true)
      .single()

    if (inboxError || !inboxData) {
      console.warn(`🚫 Inbox not found, bouncing: ${recipient}`)
      
      // 🔄 PROPER BOUNCING: Return 550 to trigger bounce at Mailgun level
      return NextResponse.json(
        { 
          error: 'Mailbox unavailable',
          message: 'The email address you are trying to reach is not available.'
        },
        { status: 550 } // This WILL trigger a bounce message
      )
    }

    // Check if inbox has expired
    const now = new Date()
    const expiresAt = new Date(inboxData.expires_at)
    
    if (now > expiresAt) {
      console.warn(`🚫 Inbox expired, bouncing: ${recipient}`)
      
      // 🔄 PROPER BOUNCING: Return 550 to trigger bounce at Mailgun level
      return NextResponse.json(
        { 
          error: 'Mailbox expired',
          message: 'The temporary email address has expired and is no longer accepting messages.'
        },
        { status: 550 } // This WILL trigger a bounce message
      )
    }

    console.log(`✅ Email validation passed for: ${recipient}`)

    // 🎯 ACCEPT: Return 200 to allow email processing
    // Don't process the email here, just validate it
    return NextResponse.json({
      success: true,
      message: 'Email accepted - will be processed by main webhook',
      recipient: recipient,
      inbox_id: inboxData.id
    })

  } catch (error) {
    console.error('Validation error:', error)
    
    // 🔄 TEMPORARY FAILURE: Return 451 for temporary issues
    return NextResponse.json(
      { 
        error: 'Temporary failure',
        message: 'Unable to validate recipient at this time. Please try again later.'
      },
      { status: 451 } // This will cause email to be retried
    )
  }
}

// Handle GET requests with API info
export async function GET() {
  return NextResponse.json({
    message: 'Mailgun Email Pre-Validation API',
    endpoint: '/api/mailgun-validate',
    method: 'POST',
    description: 'Validates recipient emails BEFORE Mailgun accepts them',
    purpose: 'Enables proper email bouncing for non-existent inboxes',
    status_codes: {
      200: 'Email accepted - will be processed',
      550: 'Email rejected - bounce will be sent to sender',
      451: 'Temporary failure - email will be retried'
    },
    setup_instructions: {
      step1: 'Configure Mailgun Route to call this endpoint first',
      step2: 'Set up conditional forwarding based on response',
      step3: 'Only forward to main webhook if validation passes'
    }
  })
} 