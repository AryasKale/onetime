import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(request: NextRequest) {
  try {
    const { inbox_id } = await request.json()

    if (!inbox_id) {
      return NextResponse.json(
        { error: 'inbox_id is required' },
        { status: 400 }
      )
    }

    // Generate a random test email
    const testSenders = [
      'newsletter@example.com',
      'support@testsite.com',
      'noreply@service.com',
      'admin@platform.io',
      'hello@startup.dev'
    ]

    const testSubjects = [
      'Welcome to our service!',
      'Your verification code',
      'Account confirmation required',
      'Special offer just for you',
      'Weekly newsletter',
      'Password reset request',
      'Your order has been confirmed'
    ]

    const testBodies = [
      'Thank you for signing up! Please verify your email address by clicking the link below.',
      'Your verification code is: 123456. This code will expire in 10 minutes.',
      'Welcome to our platform! We\'re excited to have you on board.',
      'Don\'t miss out on our special 50% discount offer. Valid until the end of this week!',
      'Here\'s your weekly roundup of what\'s been happening in your account.',
      'We received a request to reset your password. If this wasn\'t you, please ignore this email.',
      'Your order #12345 has been confirmed and will be shipped within 2-3 business days.'
    ]

    const randomSender = testSenders[Math.floor(Math.random() * testSenders.length)]
    const baseSubject = testSubjects[Math.floor(Math.random() * testSubjects.length)]
    const randomSubject = `Test Email - ${baseSubject}`
    const randomBody = testBodies[Math.floor(Math.random() * testBodies.length)]

    // Get the inbox email address
    const { data: inboxData, error: inboxError } = await supabase
      .from('inbox')
      .select('email_address')
      .eq('id', inbox_id)
      .single()

    if (inboxError || !inboxData) {
      return NextResponse.json(
        { error: 'Inbox not found' },
        { status: 404 }
      )
    }

    // Insert test email
    const { data, error } = await supabase
      .from('emails')
      .insert([{
        inbox_id: inbox_id,
        sender: randomSender,
        recipient: inboxData.email_address,
        subject: randomSubject,
        body: randomBody,
        html_body: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">${randomSubject}</h2>
          <p style="color: #666; line-height: 1.6;">${randomBody}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">This is a test email for demonstration purposes.</p>
        </div>`,
        received_at: new Date().toISOString(),
        is_read: false,
        attachments: [],
        headers: {
          'message-id': `<${Date.now()}@testmail.com>`,
          'content-type': 'text/html; charset=UTF-8'
        },
        size_bytes: randomBody.length
      }])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to send test email', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      email: data,
      message: 'Test email sent successfully'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Test Email API - Use POST with inbox_id to send a test email',
    endpoint: '/api/test-email',
    method: 'POST',
    body: {
      inbox_id: 'your-inbox-id-here'
    }
  })
} 
