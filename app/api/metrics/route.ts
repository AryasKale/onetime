import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

// 📊 METRICS VIEWING ENDPOINT
// This endpoint provides analytics and statistics about the email service

export async function GET(request: NextRequest) {
  try {
    // Get all metrics from database
    const { data: metrics, error } = await supabase
      .from('metrics')
      .select('metric_name, metric_value, updated_at')
      .order('metric_name')

    if (error) {
      console.error('Error fetching metrics:', error)
      return NextResponse.json(
        { error: 'Failed to fetch metrics' },
        { status: 500 }
      )
    }

    // Get current active counts
    const { data: activeEmailsCount } = await supabase
      .from('emails')
      .select('id', { count: 'exact', head: true })

    const { data: activeInboxesCount } = await supabase
      .from('inbox')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true)

    const { data: totalInboxesCount } = await supabase
      .from('inbox')
      .select('id', { count: 'exact', head: true })

    // Organize metrics into categories
    const organizedMetrics = {
      generation_statistics: {
        total_emails_generated: getMetricValue(metrics, 'total_emails_generated'),
        total_inboxes_created: getMetricValue(metrics, 'total_inboxes_created'),
        current_active_inboxes: activeInboxesCount?.length || 0,
        total_inboxes_ever: totalInboxesCount?.length || 0
      },
      email_statistics: {
        total_emails_received: getMetricValue(metrics, 'total_emails_received'),
        total_emails_sent: getMetricValue(metrics, 'total_emails_sent'),
        current_active_emails: activeEmailsCount?.length || 0
      },
      expiry_statistics: {
        total_inboxes_expired: getMetricValue(metrics, 'total_inboxes_expired'),
        total_emails_expired: getMetricValue(metrics, 'total_emails_expired'),
        total_expired_inboxes_cleaned: getMetricValue(metrics, 'total_expired_inboxes_cleaned'),
        total_expired_emails_deleted: getMetricValue(metrics, 'total_expired_emails_deleted')
      },
      security_statistics: {
        total_bounce_notifications: getMetricValue(metrics, 'total_bounce_notifications'),
        total_suspicious_emails_blocked: getMetricValue(metrics, 'total_suspicious_emails_blocked'),
        total_rate_limited_emails: getMetricValue(metrics, 'total_rate_limited_emails')
      }
    }

    // Calculate additional insights
    const insights = {
      bounce_rate: calculatePercentage(
        organizedMetrics.security_statistics.total_bounce_notifications,
        organizedMetrics.email_statistics.total_emails_received + organizedMetrics.security_statistics.total_bounce_notifications
      ),
      security_block_rate: calculatePercentage(
        organizedMetrics.security_statistics.total_suspicious_emails_blocked + organizedMetrics.security_statistics.total_rate_limited_emails,
        organizedMetrics.email_statistics.total_emails_received + organizedMetrics.security_statistics.total_bounce_notifications + organizedMetrics.security_statistics.total_suspicious_emails_blocked + organizedMetrics.security_statistics.total_rate_limited_emails
      ),
      active_inbox_percentage: calculatePercentage(
        organizedMetrics.generation_statistics.current_active_inboxes,
        organizedMetrics.generation_statistics.total_inboxes_ever
      ),
      expiry_rate: calculatePercentage(
        organizedMetrics.expiry_statistics.total_inboxes_expired,
        organizedMetrics.generation_statistics.total_emails_generated
      )
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      metrics: organizedMetrics,
      insights: insights,
      raw_metrics: metrics || [],
      service_health: {
        status: 'healthy',
        total_processed: (organizedMetrics.email_statistics.total_emails_received || 0) + 
                        (organizedMetrics.security_statistics.total_bounce_notifications || 0) + 
                        (organizedMetrics.security_statistics.total_suspicious_emails_blocked || 0),
        database_storage: {
          active_emails: organizedMetrics.email_statistics.current_active_emails,
          active_inboxes: organizedMetrics.generation_statistics.current_active_inboxes
        }
      }
    })

  } catch (error) {
    console.error('Metrics API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to get metric value by name
function getMetricValue(metrics: any[], metricName: string): number {
  const metric = metrics?.find(m => m.metric_name === metricName)
  return metric ? metric.metric_value : 0
}

// Helper function to calculate percentage
function calculatePercentage(part: number, total: number): string {
  if (total === 0) return '0%'
  return `${((part / total) * 100).toFixed(1)}%`
}

// Handle POST requests for metric updates (admin only)
export async function POST(request: NextRequest) {
  try {
    const { metric_name, metric_value, action = 'set' } = await request.json()

    if (!metric_name || metric_value === undefined) {
      return NextResponse.json(
        { error: 'metric_name and metric_value are required' },
        { status: 400 }
      )
    }

    let result
    if (action === 'increment') {
      result = await supabase.rpc('increment_metric', {
        metric_name_param: metric_name,
        increment_by: metric_value
      })
    } else {
      result = await supabase.rpc('set_metric', {
        metric_name_param: metric_name,
        new_value: metric_value
      })
    }

    if (result.error) {
      return NextResponse.json(
        { error: 'Failed to update metric', details: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Metric ${metric_name} ${action}ed successfully`,
      new_value: metric_value
    })

  } catch (error) {
    console.error('Metrics update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 