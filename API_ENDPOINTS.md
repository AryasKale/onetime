# 🔗 OneTimeEmail API Reference

Complete API documentation for the temporary email service.

## 📊 **Metrics API**

### `GET /api/metrics`
View all service statistics and analytics.

**Response:**
```json
{
  "success": true,
  "timestamp": "2024-01-15T10:30:00Z",
  "metrics": {
    "generation_statistics": {
      "total_emails_generated": 89,
      "total_inboxes_created": 89,
      "current_active_inboxes": 12,
      "total_inboxes_ever": 89
    },
    "email_statistics": {
      "total_emails_received": 127,
      "total_emails_sent": 23,
      "current_active_emails": 42
    },
    "expiry_statistics": {
      "total_inboxes_expired": 77,
      "total_emails_expired": 85,
      "total_expired_inboxes_cleaned": 77,
      "total_expired_emails_deleted": 85
    },
    "security_statistics": {
      "total_bounce_notifications": 23,
      "total_suspicious_emails_blocked": 5,
      "total_rate_limited_emails": 8
    }
  },
  "insights": {
    "bounce_rate": "15.3%",
    "security_block_rate": "8.7%",
    "active_inbox_percentage": "13.5%",
    "expiry_rate": "86.5%"
  }
}
```

### `POST /api/metrics`
Update specific metrics (admin only).

**Request:**
```json
{
  "metric_name": "total_emails_received",
  "metric_value": 10,
  "action": "increment"  // or "set"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Metric total_emails_received incremented successfully",
  "new_value": 137
}
```

## 🧹 **Cleanup API**

### `GET /api/cleanup-expired`
View cleanup status and current metrics.

**Response:**
```json
{
  "message": "Cleanup & Metrics API",
  "endpoint": "/api/cleanup-expired",
  "methods": {
    "POST": "Run cleanup process",
    "GET": "View current metrics"
  },
  "description": "Cleans up expired emails and inboxes, tracks statistics",
  "current_metrics": [...],
  "usage": {
    "manual_cleanup": "POST to this endpoint to run cleanup",
    "automated": "Set up cron job to call this endpoint daily"
  }
}
```

### `POST /api/cleanup-expired`
Execute cleanup process for expired data.

**Response:**
```json
{
  "success": true,
  "message": "Cleanup completed successfully",
  "results": {
    "expired_inboxes_cleaned": 5,
    "expired_emails_deleted": 12,
    "total_emails_before": 127,
    "total_emails_after": 115,
    "total_inboxes_before": 89,
    "total_inboxes_after": 89
  },
  "cleanup_summary": {
    "emails_deleted": 12,
    "inboxes_cleaned": 5,
    "space_saved": "12 emails removed",
    "current_active_emails": 115,
    "current_active_inboxes": 84
  }
}
```

## 📮 **Inbox Creation API**

### `POST /api/create-inbox`
Generate new temporary email address.

**Request:**
```json
{
  "duration": 10  // Optional: minutes (default: 10)
}
```

**Response:**
```json
{
  "success": true,
  "inbox": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email_address": "abc123@onetimeemail.net",
    "expires_at": "2024-01-15T11:00:00Z",
    "is_active": true,
    "created_at": "2024-01-15T10:50:00Z"
  },
  "message": "Temporary inbox created successfully"
}
```

## 📧 **Email Handling API**

### `POST /api/mailgun-inbound`
Webhook endpoint for receiving emails from Mailgun.

**Headers Required:**
- `X-Mailgun-Signature-Timestamp`
- `X-Mailgun-Signature-Token` 
- `X-Mailgun-Signature`

**Request:** (Form data from Mailgun)
```
sender: sender@example.com
recipient: abc123@onetimeemail.net
subject: Test Email
body-plain: Email content...
```

**Response:**
```json
{
  "success": true,
  "message": "Email processed successfully",
  "email_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Error Responses:**
```json
// Invalid signature
{
  "success": false,
  "message": "Invalid signature",
  "bounce_sent": false
}

// Inbox not found
{
  "success": false,
  "message": "Inbox not found - bounce notification sent",
  "bounce_sent": true
}

// Rate limited
{
  "success": false,
  "message": "Rate limit exceeded",
  "bounce_sent": false
}
```

## 🧪 **Test Email API**

### `POST /api/test-email`
Send test email for development/testing.

**Request:**
```json
{
  "to": "abc123@onetimeemail.net",
  "subject": "Test Email",
  "body": "This is a test email"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Test email sent successfully",
  "email_id": "test-email-123"
}
```

## 🔐 **Authentication & Security**

### **Environment Variables Required:**
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
MAILGUN_WEBHOOK_SIGNING_KEY=your_mailgun_signing_key
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=onetimeemail.net
```

### **Security Features:**
- **HMAC Signature Verification** (Mailgun webhook)
- **Rate Limiting** (10 emails/minute per sender)
- **Email Validation** (format checking)
- **Suspicious Content Detection**
- **Timestamp Validation** (5-minute tolerance)

## 📊 **Usage Examples**

### **Get Service Statistics:**
```bash
curl -X GET https://your-domain.com/api/metrics
```

### **Create New Email:**
```bash
curl -X POST https://your-domain.com/api/create-inbox \
  -H "Content-Type: application/json" \
  -d '{"duration": 30}'
```

### **Run Cleanup:**
```bash
curl -X POST https://your-domain.com/api/cleanup-expired
```

### **Update Metrics:**
```bash
curl -X POST https://your-domain.com/api/metrics \
  -H "Content-Type: application/json" \
  -d '{"metric_name": "total_emails_received", "metric_value": 1, "action": "increment"}'
```

## 🎯 **Base URLs**

### **Development:**
```
http://localhost:3000/api/
```

### **Production:**
```
https://your-domain.com/api/
```

## 📈 **Monitoring & Analytics**

All endpoints automatically track:
- **Request counts** via metrics
- **Error rates** via security statistics  
- **Performance data** via timestamps
- **Usage patterns** via generation statistics

## 🔄 **Automation**

### **Cron Job Setup:**
```bash
# Daily cleanup at 3 AM
0 3 * * * curl -X POST https://your-domain.com/api/cleanup-expired

# Hourly metrics check
0 * * * * curl -X GET https://your-domain.com/api/metrics
```

---

**API Version:** 1.0  
**Last Updated:** January 2024  
**Contact:** Your support email 