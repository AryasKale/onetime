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

    // �� Get current counts (FIXED: Proper Supabase count syntax)
    const { count: emailCountBefore } = await supabase
      .from('emails')
      .select('*', { count: 'exact', head: true })
    
    const { count: inboxCountBefore } = await supabase
      .from('inbox')
      .select('*', { count: 'exact', head: true })

    results.total_emails_before = emailCountBefore || 0
    results.total_inboxes_before = inboxCountBefore || 0

    console.log(`📊 Current counts - Emails: ${results.total_emails_before}, Inboxes: ${results.total_inboxes_before}`)

    // 🗑️ Step 1: Find expired inboxes
    const { data: expiredInboxes, error: expiredError } = await supabase
      .from('inbox')
      .select('id, email_address, expires_at')
      .lt('expires_at', new Date().toISOString())
      .eq('is_active', true)

    if (expiredError) {
      console.error('Error finding expired inboxes:', expiredError)
      throw expiredError
    } else {
      console.log(`🔍 Found ${expiredInboxes?.length || 0} expired inboxes`)
    }

    if (expiredInboxes && expiredInboxes.length > 0) {
      // 🗑️ Step 2: Delete emails from expired inboxes
      const expiredInboxIds = expiredInboxes.map(inbox => inbox.id)
      
      // First, count emails that will be deleted
      const { count: emailsToDelete } = await supabase
        .from('emails')
        .select('*', { count: 'exact', head: true })
        .in('inbox_id', expiredInboxIds)

      console.log(`📧 Found ${emailsToDelete || 0} emails to delete from expired inboxes`)

      // Delete the emails
      const { error: emailDeleteError } = await supabase
        .from('emails')
        .delete()
        .in('inbox_id', expiredInboxIds)

      if (emailDeleteError) {
        console.error('Error deleting emails:', emailDeleteError)
        throw emailDeleteError
      } else {
        results.expired_emails_deleted = emailsToDelete || 0
        console.log(`🗑️ Deleted ${results.expired_emails_deleted} emails from expired inboxes`)
      }

      // 🗑️ Step 3: Mark expired inboxes as inactive
      const { error: inboxUpdateError } = await supabase
        .from('inbox')
        .update({ is_active: false })
        .in('id', expiredInboxIds)

      if (inboxUpdateError) {
        console.error('Error updating expired inboxes:', inboxUpdateError)
        throw inboxUpdateError
      } else {
        results.expired_inboxes_cleaned = expiredInboxes.length
        console.log(`🗑️ Marked ${results.expired_inboxes_cleaned} inboxes as expired`)
      }
    }

    // 📊 Get counts after cleanup
    const { count: emailCountAfter } = await supabase
      .from('emails')
      .select('*', { count: 'exact', head: true })
    
    const { count: inboxCountAfter } = await supabase
      .from('inbox')
      .select('*', { count: 'exact', head: true })

    results.total_emails_after = emailCountAfter || 0
    results.total_inboxes_after = inboxCountAfter || 0

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

// GET endpoint to check cleanup status
export async function GET() {
  try {
    // Get current expired inboxes count
    const { count: expiredCount } = await supabase
      .from('inbox')
      .select('*', { count: 'exact', head: true })
      .lt('expires_at', new Date().toISOString())
      .eq('is_active', true)

    // Get total counts
    const { count: totalEmails } = await supabase
      .from('emails')
      .select('*', { count: 'exact', head: true })

    const { count: totalInboxes } = await supabase
      .from('inbox')
      .select('*', { count: 'exact', head: true })

    const { count: activeInboxes } = await supabase
      .from('inbox')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)

    return NextResponse.json({
      success: true,
      status: {
        expired_inboxes_pending_cleanup: expiredCount || 0,
        total_emails: totalEmails || 0,
        total_inboxes: totalInboxes || 0,
        active_inboxes: activeInboxes || 0,
        inactive_inboxes: (totalInboxes || 0) - (activeInboxes || 0),
        cleanup_needed: (expiredCount || 0) > 0
      },
      actions: {
        manual_cleanup: "POST /api/cleanup-expired",
        view_metrics: "GET /api/metrics"
      }
    })
  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json(
      { error: 'Failed to check cleanup status', details: error },
      { status: 500 }
    )
  }
}

// 📊 Function to update metrics with proper error handling
async function updateMetrics(results: any) {
  try {
    console.log('📊 Updating metrics...')

    // Update cleanup metrics
    if (results.expired_inboxes_cleaned > 0) {
      await incrementMetric('total_expired_inboxes_cleaned', results.expired_inboxes_cleaned)
      await incrementMetric('total_expired_emails_deleted', results.expired_emails_deleted)
    }

    // Update current totals
    await setMetric('current_active_emails', results.total_emails_after)
    await setMetric('current_active_inboxes', results.total_inboxes_after)

    console.log('📊 Metrics updated successfully')
  } catch (error) {
    console.error('Error updating metrics:', error)
  }
}

// 📊 Function to track expired metrics
async function trackExpiredMetrics(expiredInboxes: number, expiredEmails: number) {
  try {
    await incrementMetric('total_inboxes_expired', expiredInboxes)
    await incrementMetric('total_emails_expired', expiredEmails)
    console.log(`📊 Tracked ${expiredInboxes} expired inboxes and ${expiredEmails} expired emails`)
  } catch (error) {
    console.error('Error tracking expired metrics:', error)
  }
}

// Helper function to increment metrics
async function incrementMetric(metricName: string, incrementBy: number = 1) {
  const { error } = await supabase.rpc('increment_metric', {
    metric_name_param: metricName,
    increment_by: incrementBy
  })
  
  if (error) {
    console.error(`Error incrementing metric ${metricName}:`, error)
  }
}

// Helper function to set metrics
async function setMetric(metricName: string, newValue: number) {
  const { error } = await supabase.rpc('set_metric', {
    metric_name_param: metricName,
    new_value: newValue
  })
  
  if (error) {
    console.error(`Error setting metric ${metricName}:`, error)
  }
} 