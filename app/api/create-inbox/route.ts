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

export async function POST(request: NextRequest) {
  try {
    // Generate a temporary email address
    const emailAddress = generateRandomEmail()
    
    // Set expiry time (10 minutes from now)
    const createdAt = new Date()
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 10)
    
    // Save to database
    const { data, error } = await supabase
      .from('inbox')
      .insert([{
        email_address: emailAddress,
        created_at: createdAt.toISOString(),
        expires_at: expiresAt.toISOString()
      }])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to create inbox', details: error.message },
        { status: 500 }
      )
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
      { error: 'Internal server error' },
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