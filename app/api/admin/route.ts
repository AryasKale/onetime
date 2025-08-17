import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabaseClient';

export async function GET(request: NextRequest) {
  try {
    // Simple auth check
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const action = url.searchParams.get('action') || 'stats';

    switch (action) {
      case 'stats':
        return await getBotStats();
      case 'recent-logs':
        return await getRecentLogs();
      case 'blocked-entities':
        return await getBlockedEntities();
      case 'top-offenders':
        return await getTopOffenders();
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function getBotStats() {
  const [detectionStats, blockStats] = await Promise.all([
    // Detection stats from last 24 hours
    supabase
      .from('bot_detection_logs')
      .select('risk_level, was_blocked')
      .gte('detected_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
    
    // Current blocked entities
    supabase
      .from('blocked_entities')
      .select('entity_type, risk_level')
      .eq('is_active', true)
  ]);

  const logs = detectionStats.data || [];
  const blocked = blockStats.data || [];

  const stats = {
    last_24h: {
      total_detections: logs.length,
      blocked_attempts: logs.filter(l => l.was_blocked).length,
      allowed_attempts: logs.filter(l => !l.was_blocked).length,
      risk_breakdown: {
        critical: logs.filter(l => l.risk_level === 'critical').length,
        high: logs.filter(l => l.risk_level === 'high').length,
        medium: logs.filter(l => l.risk_level === 'medium').length,
        low: logs.filter(l => l.risk_level === 'low').length,
      }
    },
    currently_blocked: {
      total: blocked.length,
      by_type: {
        users: blocked.filter(b => b.entity_type === 'user_id').length,
        fingerprints: blocked.filter(b => b.entity_type === 'fingerprint').length,
        ips: blocked.filter(b => b.entity_type === 'ip_address').length,
      }
    }
  };

  return NextResponse.json(stats);
}

async function getRecentLogs() {
  const { data, error } = await supabase
    .from('bot_detection_logs')
    .select('*')
    .order('detected_at', { ascending: false })
    .limit(50);

  if (error) throw error;

  return NextResponse.json({
    recent_logs: data,
    count: data?.length || 0
  });
}

async function getBlockedEntities() {
  const { data, error } = await supabase
    .from('blocked_entities')
    .select('*')
    .eq('is_active', true)
    .order('blocked_at', { ascending: false });

  if (error) throw error;

  return NextResponse.json({
    blocked_entities: data,
    count: data?.length || 0
  });
}

async function getTopOffenders() {
  const { data, error } = await supabase
    .from('bot_detection_logs')
    .select('fingerprint, user_id, ip_address, was_blocked')
    .eq('was_blocked', true)
    .gte('detected_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()) // Last 7 days
    .order('detected_at', { ascending: false });

  if (error) throw error;

  // Count violations by entity
  const fpCounts: { [key: string]: number } = {};
  const userCounts: { [key: string]: number } = {};
  const ipCounts: { [key: string]: number } = {};

  data?.forEach(log => {
    fpCounts[log.fingerprint] = (fpCounts[log.fingerprint] || 0) + 1;
    userCounts[log.user_id] = (userCounts[log.user_id] || 0) + 1;
    ipCounts[log.ip_address] = (ipCounts[log.ip_address] || 0) + 1;
  });

  // Get top 10 offenders
  const topFingerprints = Object.entries(fpCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([fp, count]) => ({ fingerprint: fp, violations: count }));

  const topUsers = Object.entries(userCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([user, count]) => ({ user_id: user, violations: count }));

  const topIPs = Object.entries(ipCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([ip, count]) => ({ ip_address: ip, violations: count }));

  return NextResponse.json({
    top_offenders: {
      fingerprints: topFingerprints,
      users: topUsers,
      ips: topIPs
    },
    period: 'last_7_days'
  });
}

// POST endpoint for managing blocks
export async function POST(request: NextRequest) {
  try {
    // Simple auth check
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, entity_type, entity_value, reason } = body;

    if (action === 'block') {
      const { error } = await supabase.rpc('block_entity', {
        entity_type_param: entity_type,
        entity_value_param: entity_value,
        reason_param: reason || 'Manual block by admin',
        risk_level_param: 'high',
        blocked_by_param: 'admin'
      });

      if (error) throw error;

      return NextResponse.json({ 
        success: true, 
        message: `Blocked ${entity_type}: ${entity_value}` 
      });
    }

    if (action === 'unblock') {
      const { error } = await supabase.rpc('unblock_entity', {
        entity_type_param: entity_type,
        entity_value_param: entity_value
      });

      if (error) throw error;

      return NextResponse.json({ 
        success: true, 
        message: `Unblocked ${entity_type}: ${entity_value}` 
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
