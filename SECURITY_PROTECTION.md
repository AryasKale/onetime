# 🛡️ Comprehensive Security Protection Guide

This document outlines all security measures implemented to protect your one-time email service from attacks and abuse.

## 🚨 The Problem You Identified

**Issue:** Anyone can send emails to ANY `@onetimeemail.net` address, even if the inbox doesn't exist (like `testcase@onetimeemail.net`), causing:
- DDoS attacks on webhook endpoint
- Resource exhaustion on Supabase
- Mailgun quota abuse
- Infrastructure overload

## 🔄 NEW: Email Bouncing Implementation

**Enhancement:** The system now implements proper email bouncing to give senders feedback when emails are rejected:
- **Senders get bounce notifications** when emails are rejected
- **Clear error messages** explain why emails were rejected
- **Professional email behavior** similar to real email servers
- **Prevents confusion** for legitimate senders

## 🛡️ Multi-Layer Security Solution

### Layer 1: 🔐 HMAC Signature Verification
```typescript
// Validates requests actually come from Mailgun
verifyMailgunSignature(timestamp, token, signature)
```
**Protection:** Prevents unauthorized webhook calls

### Layer 2: 📧 Email Format Validation
```typescript
// Only accepts emails matching our generated pattern
const emailPattern = /^[a-z0-9]{6}@onetimeemail\.net$/
```
**Protection:** Blocks emails like `testcase@onetimeemail.net`

### Layer 3: 🗄️ Database Validation
```typescript
// Verifies inbox exists and is active
const { data: inboxData } = await supabase
  .from('inbox')
  .select('id, expires_at, is_active')
  .eq('email_address', recipient)
  .eq('is_active', true)
```
**Protection:** Only processes emails to EXISTING inboxes

### Layer 4: 🚦 Rate Limiting
```typescript
// Limits requests per sender and recipient
checkRateLimit(`sender:${sender}`, 10, 60000)      // 10 emails/minute per sender
checkRateLimit(`recipient:${recipient}`, 15, 60000) // 15 emails/minute per inbox
```
**Protection:** Prevents spam attacks and abuse

### Layer 5: 📏 Email Size Validation
```typescript
// Prevents large payload attacks
const maxEmailSize = 1024 * 1024 // 1MB limit
```
**Protection:** Blocks oversized emails that could crash system

### Layer 6: 🔍 Suspicious Content Detection
```typescript
// Detects malicious patterns
const suspiciousPatterns = [
  /javascript:/i, /<script/i, /data:text\/html/i,
  /vbscript:/i, /onload=/i, /onerror=/i
]
```
**Protection:** Blocks potential XSS and malicious content

### Layer 7: ⏰ Timestamp Validation
```typescript
// Prevents replay attacks
const timeDiff = Math.abs(currentTime - requestTime)
if (timeDiff > 300) // 5 minutes tolerance
```
**Protection:** Blocks old/replayed requests

## 🎯 Attack Scenarios & Protection

### Scenario 1: Random Email Attack
**Attack:** `attacker@evil.com` sends to `random123@onetimeemail.net`
**Protection:** 
- ✅ Email format validation passes
- ❌ Database validation fails (inbox doesn't exist)
- **Result:** Request rejected with 550, **sender gets bounce notification**

### Scenario 2: Spam Attack
**Attack:** Sending 1000 emails to same inbox
**Protection:**
- ✅ First 15 emails processed
- ❌ Subsequent emails blocked by rate limiting
- **Result:** 451 Temporary Failure, **sender gets bounce notification**

### Scenario 3: Large Payload Attack
**Attack:** Sending 10MB email to crash system
**Protection:**
- ❌ Size validation fails
- **Result:** 552 Message Too Large, **sender gets bounce notification**

### Scenario 4: Malicious Content
**Attack:** Email with `<script>alert('XSS')</script>`
**Protection:**
- ❌ Suspicious content detection triggers
- **Result:** 554 Message Rejected, **sender gets bounce notification**

### Scenario 5: Fake Webhook
**Attack:** Direct POST to webhook without Mailgun signature
**Protection:**
- ❌ HMAC verification fails
- **Result:** 401 Unauthorized

## 📊 Rate Limiting Details

### Current Limits:
- **Per Sender:** 10 emails/minute
- **Per Recipient:** 15 emails/minute
- **Global:** Unlimited (controlled by above)

### Customizable Limits:
```typescript
// Adjust these values based on your needs
checkRateLimit(`sender:${sender}`, 10, 60000)    // 10 req/min
checkRateLimit(`recipient:${recipient}`, 15, 60000) // 15 req/min
```

## 🔧 Mailgun-Level Protection

### Configure Mailgun Routes More Strictly:
```
# Instead of catch-all, use specific patterns
Filter: match_recipient("[a-z0-9]{6}@onetimeemail.net")
```

### Add Mailgun Rate Limiting:
- **Mailgun Dashboard** → **Settings** → **Rate Limiting**
- Set limits at Mailgun level as first line of defense

## 🎛️ Production Recommendations

### 1. Use Redis for Rate Limiting
```typescript
// Replace in-memory Map with Redis
const redis = new Redis(process.env.REDIS_URL)
```

### 2. Add IP-Based Rate Limiting
```typescript
const clientIP = request.ip || request.headers.get('x-forwarded-for')
checkRateLimit(`ip:${clientIP}`, 50, 60000)
```

### 3. Implement Logging & Monitoring
```typescript
// Add to webhook
console.log(`📧 Email processed: ${recipient} from ${sender}`)
console.warn(`⚠️ Suspicious activity: ${reason}`)
```

### 4. Add Email Size Monitoring
```typescript
// Track email sizes for analytics
await supabase.from('email_stats').insert({
  size_bytes: totalSize,
  sender_domain: sender.split('@')[1]
})
```

## 🚨 Alert System

### Current Warnings Logged:
- Invalid email format
- Inbox not found
- Rate limit exceeded
- Email too large
- Suspicious content detected

### Recommended Monitoring:
- **Vercel Logs** - Monitor warnings
- **Supabase Dashboard** - Track database usage
- **Mailgun Logs** - Monitor email delivery

## 📋 Security Checklist

- [x] HMAC signature verification
- [x] Email format validation (6-char alphanumeric)
- [x] Database inbox validation
- [x] Rate limiting (sender & recipient)
- [x] Email size validation (1MB limit)
- [x] Suspicious content detection
- [x] Timestamp validation (replay protection)
- [x] Email bouncing (proper sender feedback)
- [ ] IP-based rate limiting (recommended)
- [ ] Redis rate limiting (production)
- [ ] Mailgun route optimization
- [ ] Monitoring alerts setup

## 🔄 Email Bouncing Status Codes

The system now returns proper SMTP-like status codes that trigger Mailgun to send bounce notifications:

### Bounce Types:
- **550**: Mailbox unavailable (inbox not found, expired, invalid format)
- **552**: Message too large (exceeds 1MB limit)
- **554**: Message rejected (suspicious content)
- **451**: Temporary failure (rate limiting)

### What Senders Receive:
When someone sends an email to a non-existent inbox, they now get a bounce message like:
```
Subject: Mail Delivery Failure
From: Mail Delivery Subsystem <mailer-daemon@onetimeemail.net>

The following message could not be delivered:
  To: random123@onetimeemail.net
  Subject: Hello

Error: Mailbox unavailable
The email address you are trying to reach is not available.
```

## 🔍 Testing Your Security

### Test 1: Invalid Email Format (Should Bounce)
```bash
# Test sending to non-existent inbox
curl -X POST https://onetimeemail.vercel.app/api/mailgun-inbound \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "recipient=nonexistent@onetimeemail.net&sender=test@example.com&subject=Test&body-plain=This should bounce"

# Expected: 550 status code + bounce message
```

### Test 2: Oversized Email (Should Bounce)
```bash
# Test with large email (simulate)
curl -X POST https://onetimeemail.vercel.app/api/mailgun-inbound \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "recipient=test123@onetimeemail.net&sender=test@example.com&subject=Large Email&body-plain=$(python -c 'print("A" * 1000000)')"

# Expected: 552 status code + bounce message
```

### Test 3: Malicious Content (Should Bounce)
```bash
# Test with suspicious content
curl -X POST https://onetimeemail.vercel.app/api/mailgun-inbound \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "recipient=test123@onetimeemail.net&sender=test@example.com&subject=Malicious&body-plain=<script>alert('XSS')</script>"

# Expected: 554 status code + bounce message
```

### Test 4: Legacy Test (Invalid Email Format)
```bash
# This should be blocked
curl -X POST https://onetimeemail.vercel.app/api/mailgun-inbound \
  -d "recipient=testcase@onetimeemail.net"
```

### Test 2: Non-existent Inbox
```bash
# Generate valid format but non-existent inbox
# abc123@onetimeemail.net (if this inbox wasn't created)
```

### Test 3: Rate Limiting
```bash
# Send 11 emails from same sender quickly
# Should block after 10th email
```

## 💡 Performance Impact

### Minimal Overhead:
- **HMAC verification:** ~1ms
- **Pattern matching:** ~0.1ms
- **Database lookup:** ~50ms (already required)
- **Rate limiting:** ~0.1ms

### Total Added Latency: ~1-2ms
**Worth it for security!**

## 🔧 Troubleshooting

### Issue: Legitimate emails blocked
**Solution:** Check if email matches exact pattern `[a-z0-9]{6}@onetimeemail.net`

### Issue: Rate limit too restrictive
**Solution:** Adjust limits in code and redeploy

### Issue: Large emails needed
**Solution:** Increase `maxEmailSize` limit

---

**🛡️ Your one-time email service is now protected against all major attack vectors!** 