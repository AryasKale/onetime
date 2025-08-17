# Bot Analytics Admin API

Complete admin API for monitoring and managing bot protection system.

## Setup

Add to your `.env.local`:
```
ADMIN_API_KEY=your_secret_admin_key_here
```

## Endpoints

### GET `/api/admin/bot-analytics`

**Authentication:** Bearer token required
```bash
Authorization: Bearer YOUR_ADMIN_API_KEY
```

#### Get Bot Statistics (Default)
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  "http://localhost:3000/api/admin/bot-analytics?action=stats"
```

**Response:**
```json
{
  "last_24h": {
    "total_detections": 45,
    "blocked_attempts": 23,
    "allowed_attempts": 22,
    "risk_breakdown": {
      "critical": 15,
      "high": 8,
      "medium": 12,
      "low": 10
    }
  },
  "currently_blocked": {
    "total": 12,
    "by_type": {
      "users": 3,
      "fingerprints": 7,
      "ips": 2
    }
  }
}
```

#### Get Recent Detection Logs
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  "http://localhost:3000/api/admin/bot-analytics?action=recent-logs"
```

#### Get Blocked Entities
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  "http://localhost:3000/api/admin/bot-analytics?action=blocked-entities"
```

#### Get Top Offenders (Last 7 Days)
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  "http://localhost:3000/api/admin/bot-analytics?action=top-offenders"
```

### POST `/api/admin/bot-analytics`

#### Block an Entity
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "block",
    "entity_type": "fingerprint",
    "entity_value": "fp_abusive_bot",
    "reason": "Manual block - confirmed bot behavior"
  }' \
  "http://localhost:3000/api/admin/bot-analytics"
```

#### Unblock an Entity
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "unblock",
    "entity_type": "fingerprint",
    "entity_value": "fp_false_positive"
  }' \
  "http://localhost:3000/api/admin/bot-analytics"
```

## Entity Types

- `user_id` - Block specific user
- `fingerprint` - Block device/browser
- `ip_address` - Block IP address

## Features Implemented

✅ **Real-time Detection Logging** - All bot detection events logged to database  
✅ **Enhanced Analytics** - Detailed stats with entity counts and context  
✅ **Permanent Blocking** - Persistent blocks that survive server restarts  
✅ **Auto-blocking** - Automatic blocking of repeat offenders (3+ critical violations in 24h)  
✅ **Admin Dashboard API** - Full analytics and management capabilities  

## Database Integration

The system now uses these tables:

- `bot_detection_logs` - Every detection event with full context
- `blocked_entities` - Permanently blocked users/devices/IPs
- `inbox` - Enhanced with tracking columns for analysis

## Next Steps

Consider adding:
- Web UI dashboard (React/Vue frontend)
- Email alerts for critical bot attacks
- Advanced ML-based bot detection
- Rate limiting by country/region
- Custom blocking rules

## Bot Protection SQL Queries

### Detection Analytics

#### Recent Bot Activity (Last 24 Hours)
```sql
SELECT 
  detected_at,
  user_id,
  fingerprint,
  risk_level,
  was_blocked,
  detection_reason,
  creation_interval
FROM bot_detection_logs 
WHERE detected_at > NOW() - INTERVAL '24 hours'
ORDER BY detected_at DESC
LIMIT 50;
```

#### Risk Level Breakdown
```sql
SELECT 
  risk_level,
  was_blocked,
  COUNT(*) as count,
  ROUND(AVG(creation_interval), 2) as avg_interval
FROM bot_detection_logs 
WHERE detected_at > NOW() - INTERVAL '24 hours'
GROUP BY risk_level, was_blocked
ORDER BY risk_level, was_blocked;
```

#### Top Offending Fingerprints (Last 7 Days)
```sql
SELECT 
  fingerprint,
  COUNT(*) as total_attempts,
  COUNT(*) FILTER (WHERE was_blocked = true) as blocked_attempts,
  COUNT(*) FILTER (WHERE risk_level = 'critical') as critical_attempts,
  MIN(detected_at) as first_seen,
  MAX(detected_at) as last_seen
FROM bot_detection_logs 
WHERE detected_at > NOW() - INTERVAL '7 days'
GROUP BY fingerprint
HAVING COUNT(*) FILTER (WHERE was_blocked = true) > 2
ORDER BY blocked_attempts DESC, total_attempts DESC
LIMIT 20;
```

#### Speed Violation Analysis
```sql
SELECT 
  CASE 
    WHEN creation_interval < 5 THEN 'Ultra Fast (0-5s)'
    WHEN creation_interval < 10 THEN 'Very Fast (5-10s)'
    WHEN creation_interval < 20 THEN 'Fast (10-20s)'
    WHEN creation_interval < 30 THEN 'Too Fast (20-30s)'
    ELSE 'Normal (30s+)'
  END as speed_category,
  COUNT(*) as attempts,
  COUNT(*) FILTER (WHERE was_blocked = true) as blocked
FROM bot_detection_logs 
WHERE detected_at > NOW() - INTERVAL '24 hours'
  AND creation_interval IS NOT NULL
GROUP BY 
  CASE 
    WHEN creation_interval < 5 THEN 'Ultra Fast (0-5s)'
    WHEN creation_interval < 10 THEN 'Very Fast (5-10s)'
    WHEN creation_interval < 20 THEN 'Fast (10-20s)'
    WHEN creation_interval < 30 THEN 'Too Fast (20-30s)'
    ELSE 'Normal (30s+)'
  END
ORDER BY MIN(creation_interval);
```

#### IP Address Analysis
```sql
SELECT 
  ip_address,
  COUNT(*) as total_attempts,
  COUNT(DISTINCT fingerprint) as unique_devices,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(*) FILTER (WHERE was_blocked = true) as blocked_attempts,
  MAX(total_ip_inboxes) as max_ip_inboxes
FROM bot_detection_logs 
WHERE detected_at > NOW() - INTERVAL '24 hours'
GROUP BY ip_address
HAVING COUNT(*) > 5
ORDER BY blocked_attempts DESC, total_attempts DESC;
```

### Blocking System Analytics

#### Currently Blocked Entities
```sql
SELECT 
  entity_type,
  entity_value,
  reason,
  risk_level,
  blocked_by,
  blocked_at,
  auto_expires_at
FROM blocked_entities 
WHERE is_active = true
ORDER BY blocked_at DESC;
```

#### Auto-Block Effectiveness
```sql
-- Check if auto-blocked entities stopped attempting
SELECT 
  be.entity_value as blocked_fingerprint,
  be.blocked_at,
  be.reason,
  COUNT(bdl.id) as attempts_after_block
FROM blocked_entities be
LEFT JOIN bot_detection_logs bdl ON bdl.fingerprint = be.entity_value 
  AND bdl.detected_at > be.blocked_at
WHERE be.entity_type = 'fingerprint' 
  AND be.is_active = true
  AND be.blocked_by = 'auto-system'
GROUP BY be.entity_value, be.blocked_at, be.reason
ORDER BY be.blocked_at DESC;
```

#### Repeat Offender Candidates (Not Yet Auto-Blocked)
```sql
SELECT 
  fingerprint,
  COUNT(*) as critical_violations,
  MAX(detected_at) as last_violation,
  STRING_AGG(DISTINCT detection_reason, '; ') as violation_types
FROM bot_detection_logs 
WHERE detected_at > NOW() - INTERVAL '24 hours'
  AND was_blocked = true
  AND risk_level = 'critical'
  AND fingerprint NOT IN (
    SELECT entity_value FROM blocked_entities 
    WHERE entity_type = 'fingerprint' AND is_active = true
  )
GROUP BY fingerprint
HAVING COUNT(*) >= 3
ORDER BY critical_violations DESC, last_violation DESC;
```

### Performance Monitoring

#### Hourly Detection Patterns
```sql
SELECT 
  DATE_TRUNC('hour', detected_at) as hour,
  COUNT(*) as total_detections,
  COUNT(*) FILTER (WHERE was_blocked = true) as blocked,
  COUNT(*) FILTER (WHERE risk_level = 'critical') as critical,
  COUNT(DISTINCT fingerprint) as unique_devices
FROM bot_detection_logs 
WHERE detected_at > NOW() - INTERVAL '24 hours'
GROUP BY DATE_TRUNC('hour', detected_at)
ORDER BY hour DESC;
```

#### Detection Rate Trends (Last 7 Days)
```sql
SELECT 
  DATE(detected_at) as date,
  COUNT(*) as total_detections,
  COUNT(*) FILTER (WHERE was_blocked = true) as blocked_attempts,
  COUNT(DISTINCT fingerprint) as unique_devices,
  COUNT(DISTINCT ip_address) as unique_ips,
  ROUND(
    COUNT(*) FILTER (WHERE was_blocked = true)::DECIMAL / COUNT(*) * 100, 
    2
  ) as block_rate_percent
FROM bot_detection_logs 
WHERE detected_at > NOW() - INTERVAL '7 days'
GROUP BY DATE(detected_at)
ORDER BY date DESC;
```

#### System Health Check
```sql
-- Recent activity summary
SELECT 
  'Last Hour' as period,
  COUNT(*) as detections,
  COUNT(*) FILTER (WHERE was_blocked = true) as blocked
FROM bot_detection_logs 
WHERE detected_at > NOW() - INTERVAL '1 hour'

UNION ALL

SELECT 
  'Last 24 Hours' as period,
  COUNT(*) as detections,
  COUNT(*) FILTER (WHERE was_blocked = true) as blocked
FROM bot_detection_logs 
WHERE detected_at > NOW() - INTERVAL '24 hours'

UNION ALL

SELECT 
  'Last 7 Days' as period,
  COUNT(*) as detections,
  COUNT(*) FILTER (WHERE was_blocked = true) as blocked
FROM bot_detection_logs 
WHERE detected_at > NOW() - INTERVAL '7 days';
```

### Investigation Queries

#### Specific Fingerprint Activity
```sql
-- Replace 'fp_s8gbq2' with the fingerprint you want to investigate
SELECT 
  detected_at,
  user_id,
  detection_reason,
  risk_level,
  was_blocked,
  creation_interval,
  total_fingerprint_inboxes
FROM bot_detection_logs 
WHERE fingerprint = 'fp_s8gbq2'
ORDER BY detected_at DESC;
```

#### Failed vs Successful Inbox Creations
```sql
SELECT 
  DATE_TRUNC('hour', detected_at) as hour,
  COUNT(*) FILTER (WHERE was_blocked = false) as successful_creations,
  COUNT(*) FILTER (WHERE was_blocked = true) as blocked_attempts,
  ROUND(
    COUNT(*) FILTER (WHERE was_blocked = true)::DECIMAL / 
    COUNT(*) * 100, 2
  ) as block_rate_percent
FROM bot_detection_logs 
WHERE detected_at > NOW() - INTERVAL '24 hours'
GROUP BY DATE_TRUNC('hour', detected_at)
ORDER BY hour DESC;
```

## Quick Analysis Commands

```bash
# Get detection stats via API
curl -H "Authorization: Bearer test_admin_key_123" \
  "http://localhost:3000/api/admin/bot-analytics?action=stats" | jq .

# Get recent logs  
curl -H "Authorization: Bearer test_admin_key_123" \
  "http://localhost:3000/api/admin/bot-analytics?action=recent-logs" | jq '.recent_logs[0:10]'

# Get top offenders
curl -H "Authorization: Bearer test_admin_key_123" \
  "http://localhost:3000/api/admin/bot-analytics?action=top-offenders" | jq .top_offenders
```

## Security

- Admin API requires bearer token authentication
- All database operations use parameterized queries
- Error details hidden in production
- Auto-blocking prevents API abuse 
