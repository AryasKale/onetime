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

## Security

- Admin API requires bearer token authentication
- All database operations use parameterized queries
- Error details hidden in production
- Auto-blocking prevents API abuse 
