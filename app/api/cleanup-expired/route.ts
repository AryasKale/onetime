import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

// 🧹 CLEANUP & METRICS ENDPOINT
// This endpoint cleans up expired data and tracks statistics
// Can be called manually or via cron job

export async function POST(request: NextRequest) {
  try {
    console.log('🧹 Starting cleanup process...')

    const results = {
      expired_inboxes_cleaned: 0,
      expired_emails_deleted: 0,
      total_emails_before: 0,
      total_emails_after: 0,
      total_inboxes_before: 0,
      total_inboxes_after: 0
    }

    // 📊 Get current counts
    const { data: emailCountBefore } = await supabase
      .from('emails')
      .select('id', { count: 'exact', head: true })
    
    const { data: inboxCountBefore } = await supabase
      .from('inbox')
      .select('id', { count: 'exact', head: true })

    results.total_emails_before = emailCountBefore?.length || 0
    results.total_inboxes_before = inboxCountBefore?.length || 0

    console.log(`📊 Current counts - Emails: ${results.total_emails_before}, Inboxes: ${results.total_inboxes_before}`)

    // 🗑️ Step 1: Find expired inboxes
    const { data: expiredInboxes, error: expiredError } = await supabase
      .from('inbox')
      .select('id, email_address, expires_at')
      .lt('expires_at', new Date().toISOString())
      .eq('is_active', true)

    if (expiredError) {
      console.error('Error finding expired inboxes:', expiredError)
    } else {
      console.log(`🔍 Found ${expiredInboxes?.length || 0} expired inboxes`)
    }

    if (expiredInboxes && expiredInboxes.length > 0) {
      // 🗑️ Step 2: Delete emails from expired inboxes
      const expiredInboxIds = expiredInboxes.map(inbox => inbox.id)
      
      const { error: emailDeleteError, count: deletedEmailsCount } = await supabase
        .from('emails')
        .delete()
        .in('inbox_id', expiredInboxIds)

      if (emailDeleteError) {
        console.error('Error deleting emails:', emailDeleteError)
      } else {
        results.expired_emails_deleted = deletedEmailsCount || 0
        console.log(`🗑️ Deleted ${results.expired_emails_deleted} emails from expired inboxes`)
      }

      // 🗑️ Step 3: Mark expired inboxes as inactive
      const { error: inboxUpdateError, count: updatedInboxesCount } = await supabase
        .from('inbox')
        .update({ is_active: false })
        .in('id', expiredInboxIds)

      if (inboxUpdateError) {
        console.error('Error updating expired inboxes:', inboxUpdateError)
      } else {
        results.expired_inboxes_cleaned = updatedInboxesCount || 0
        console.log(`🗑️ Marked ${results.expired_inboxes_cleaned} inboxes as expired`)
      }
    }

    // 📊 Get counts after cleanup
    const { data: emailCountAfter } = await supabase
      .from('emails')
      .select('id', { count: 'exact', head: true })
    
    const { data: inboxCountAfter } = await supabase
      .from('inbox')
      .select('id', { count: 'exact', head: true })

    results.total_emails_after = emailCountAfter?.length || 0
    results.total_inboxes_after = inboxCountAfter?.length || 0

    // 📊 Step 4: Update metrics
    await updateMetrics(results)
    
    // 📊 Step 5: Track expired items
    if (results.expired_inboxes_cleaned > 0) {
      await trackExpiredMetrics(results.expired_inboxes_cleaned, results.expired_emails_deleted)
    }

    console.log('✅ Cleanup completed successfully')

    return NextResponse.json({
      success: true,
      message: 'Cleanup completed successfully',
      results: results,
      cleanup_summary: {
        emails_deleted: results.expired_emails_deleted,
        inboxes_cleaned: results.expired_inboxes_cleaned,
        space_saved: `${results.expired_emails_deleted} emails removed`,
        current_active_emails: results.total_emails_after,
        current_active_inboxes: results.total_inboxes_after
      }
    })

  } catch (error) {
    console.error('Cleanup error:', error)
    return NextResponse.json(
      { error: 'Cleanup process failed', details: error },
      { status: 500 }
    )
  }
}

// 📊 Function to update metrics
async function updateMetrics(results: any) {
  try {
    // Update cleanup metrics
    await supabase.rpc('increment_metric', {
      metric_name_param: 'total_expired_inboxes_cleaned',
      increment_by: results.expired_inboxes_cleaned
    })

    await supabase.rpc('increment_metric', {
      metric_name_param: 'total_expired_emails_deleted', 
      increment_by: results.expired_emails_deleted
    })

    // Update current totals
    await supabase.rpc('set_metric', {
      metric_name_param: 'current_active_emails',
      new_value: results.total_emails_after
    })

    await supabase.rpc('set_metric', {
      metric_name_param: 'current_active_inboxes',
      new_value: results.total_inboxes_after
    })

    console.log('📊 Metrics updated successfully')
  } catch (error) {
    console.error('Error updating metrics:', error)
  }
}

// 📊 Function to track expired items
async function trackExpiredMetrics(expiredInboxes: number, expiredEmails: number) {
  try {
    // Track total expired inboxes
    await supabase.rpc('increment_metric', {
      metric_name_param: 'total_inboxes_expired',
      increment_by: expiredInboxes
    })

    // Track total expired emails
    await supabase.rpc('increment_metric', {
      metric_name_param: 'total_emails_expired',
      increment_by: expiredEmails
    })

    console.log(`📊 Tracked ${expiredInboxes} expired inboxes and ${expiredEmails} expired emails`)
  } catch (error) {
    console.error('Error tracking expired metrics:', error)
  }
}

// Handle GET requests with API info
export async function GET() {
  try {
    // Get current metrics for display
    const { data: metrics, error } = await supabase
      .from('metrics')
      .select('metric_name, metric_value, updated_at')
      .order('metric_name')

    return NextResponse.json({
      message: 'Cleanup & Metrics API',
      endpoint: '/api/cleanup-expired',
      methods: {
        POST: 'Run cleanup process',
        GET: 'View current metrics'
      },
      description: 'Cleans up expired emails and inboxes, tracks statistics',
      current_metrics: metrics || [],
      usage: {
        manual_cleanup: 'POST to this endpoint to run cleanup',
        automated: 'Set up cron job to call this endpoint daily'
      }
    })
  } catch (error) {
    return NextResponse.json({
      message: 'Cleanup & Metrics API',
      error: 'Could not fetch current metrics'
    })
  }
} 