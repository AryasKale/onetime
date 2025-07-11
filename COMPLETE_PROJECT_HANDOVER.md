# 📝 Complete Project Handover - OneTimeEmail Service

**Project:** Temporary Email Service  
**Technology:** Next.js 15 + TypeScript + Supabase + Mailgun  
**Purpose:** Professional disposable email service with analytics and security  
**Handover Date:** January 2024

---

## 📋 **Table of Contents**

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Database Design](#database-design)
4. [API Endpoints](#api-endpoints)
5. [Security System](#security-system)
6. [Code Structure](#code-structure)
7. [Environment Setup](#environment-setup)
8. [Deployment Process](#deployment-process)
9. [Monitoring & Analytics](#monitoring--analytics)
10. [Maintenance Tasks](#maintenance-tasks)
11. [Troubleshooting](#troubleshooting)
12. [Future Enhancements](#future-enhancements)

---

## 🎯 **Project Overview**

### **What This System Does:**
1. **Generates temporary email addresses** (like `abc123@onetimeemail.net`)
2. **Receives emails** sent to these addresses via Mailgun
3. **Stores emails** in Supabase database for users to read
4. **Bounces emails** sent to non-existent addresses
5. **Tracks comprehensive analytics** about usage and security
6. **Automatically cleans up** expired emails and inboxes
7. **Provides security protection** against spam and abuse

### **Key Features:**
- ✅ **Real-time email receiving** via Mailgun webhook
- ✅ **Professional bounce handling** with custom messages
- ✅ **Rate limiting** (10 emails/minute per sender)
- ✅ **Security validation** (HMAC signatures, content filtering)
- ✅ **Comprehensive analytics** (11 different metrics)
- ✅ **Automated cleanup** system
- ✅ **RESTful APIs** for all operations

---

## 🏗️ **System Architecture**

### **High-Level Flow:**
```
User → Frontend → API → Database
  ↓
Mailgun Webhook → Security Check → Store Email → Update Metrics
  ↓
Cleanup Process → Remove Expired → Update Analytics
```

### **Core Components:**

1. **Frontend (Next.js)**
   - User interface for email generation
   - Email inbox viewer
   - Real-time countdown timers

2. **Backend APIs (Next.js API Routes)**
   - Email creation (`/api/create-inbox`)
   - Email processing (`/api/mailgun-inbound`)
   - Analytics (`/api/metrics`)
   - Cleanup (`/api/cleanup-expired`)

3. **Database (Supabase/PostgreSQL)**
   - Email storage
   - User inbox management
   - Analytics tracking

4. **Email Service (Mailgun)**
   - Inbound email routing
   - Bounce message delivery
   - SMTP/API integration

### **Data Flow Diagram:**
```
Internet Email → Mailgun → Webhook → Security Check → Database
                                        ↓
                                   Bounce Response
                                        ↓
                                   Original Sender
```

---

## 🗄️ **Database Design**

### **Table 1: `inbox` - Email Address Management**

```sql
CREATE TABLE inbox (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email_address TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Purpose:** Stores temporary email addresses and their expiration status

**Fields Explained:**
- `id`: Unique identifier for each inbox
- `email_address`: The temporary email (e.g., `abc123@onetimeemail.net`)
- `expires_at`: When this inbox expires (user-defined duration)
- `is_active`: Whether inbox can receive emails (false = expired)
- `created_at`: When inbox was created

**Business Logic:**
- When user clicks "Generate Email" → creates new row
- When cleanup runs → sets `is_active = false` for expired inboxes
- Expired inboxes are kept for analytics (not deleted)

### **Table 2: `emails` - Email Content Storage**

```sql
CREATE TABLE emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  inbox_id UUID NOT NULL REFERENCES inbox(id) ON DELETE CASCADE,
  from_address TEXT NOT NULL,
  to_address TEXT NOT NULL,
  subject TEXT,
  body_plain TEXT,
  body_html TEXT,
  received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  message_id TEXT,
  attachments JSONB
);
```

**Purpose:** Stores actual email content received from Mailgun

**Fields Explained:**
- `id`: Unique identifier for each email
- `inbox_id`: Links to the inbox table (foreign key)
- `from_address`: Who sent the email
- `to_address`: Which temporary email received it
- `subject`: Email subject line
- `body_plain`: Text version of email
- `body_html`: HTML version of email
- `received_at`: When we received the email
- `message_id`: Mailgun's unique message identifier
- `attachments`: JSON data for file attachments

**Business Logic:**
- When email arrives → Mailgun webhook creates new row
- When cleanup runs → emails from expired inboxes are DELETED
- Emails are the "heavy" data that gets removed to save space

### **Table 3: `metrics` - Analytics Tracking**

```sql
CREATE TABLE metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL UNIQUE,
  metric_value DOUBLE PRECISION NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Purpose:** Tracks 11 different statistics about service usage

**All 11 Metrics Tracked:**
1. `total_emails_generated` - How many emails your app created
2. `total_inboxes_created` - How many inboxes your app created (same as above)
3. `total_emails_received` - Emails delivered to valid addresses
4. `total_emails_sent` - Bounce notifications sent to senders
5. `total_inboxes_expired` - Inboxes that naturally expired
6. `total_emails_expired` - Emails from expired inboxes
7. `total_expired_inboxes_cleaned` - Expired inboxes processed by cleanup
8. `total_expired_emails_deleted` - Emails deleted by cleanup
9. `total_bounce_notifications` - Emails bounced (inbox not found)
10. `total_suspicious_emails_blocked` - Malicious emails blocked
11. `total_rate_limited_emails` - Rate-limited requests

**Business Logic:**
- Every API action updates relevant metrics
- Metrics are used for analytics dashboard
- Values only increase (never decrease)

### **Database Functions:**

#### **Function 1: `increment_metric()`**
```sql
CREATE OR REPLACE FUNCTION increment_metric(
  metric_name_param TEXT, 
  increment_by DOUBLE PRECISION DEFAULT 1
) RETURNS DOUBLE PRECISION
```

**Purpose:** Safely increases a metric value by specified amount

**Usage:**
```sql
SELECT increment_metric('total_emails_received', 1);
```

#### **Function 2: `set_metric()`**
```sql
CREATE OR REPLACE FUNCTION set_metric(
  metric_name_param TEXT, 
  new_value DOUBLE PRECISION
) RETURNS DOUBLE PRECISION
```

**Purpose:** Sets a metric to a specific value

**Usage:**
```sql
SELECT set_metric('current_active_emails', 42);
```

### **Database Relationships:**
```
inbox (1) → emails (many)
- One inbox can have multiple emails
- When inbox expires, emails are deleted
- Inbox record is kept for analytics
```

---

## 🔗 **API Endpoints**

### **API 1: `/api/create-inbox` - Email Generation**

**Method:** POST  
**Purpose:** Creates new temporary email address  
**File:** `app/api/create-inbox/route.ts`

**Request:**
```json
{
  "duration": 30  // Optional: minutes (default: 10)
}
```

**Process:**
1. Validates duration (must be positive number)
2. Generates random 6-character email address
3. Calculates expiration time
4. Inserts into `inbox` table
5. Updates metrics (`total_inboxes_created`, `total_emails_generated`)
6. Returns email address and expiration info

**Response:**
```json
{
  "success": true,
  "inbox": {
    "id": "uuid-here",
    "email_address": "abc123@onetimeemail.net",
    "expires_at": "2024-01-15T11:00:00Z",
    "is_active": true
  }
}
```

**Error Handling:**
- Database connection errors
- Invalid duration values
- Duplicate email generation (retries)

### **API 2: `/api/mailgun-inbound` - Email Processing**

**Method:** POST  
**Purpose:** Receives emails from Mailgun webhook  
**File:** `app/api/mailgun-inbound/route.ts`

**Security Checks (in order):**
1. **HMAC Signature Verification**
   - Verifies request came from Mailgun
   - Uses `MAILGUN_WEBHOOK_SIGNING_KEY`
   - Prevents fake email injections

2. **Email Format Validation**
   - Checks if email matches pattern: `[a-z0-9]{6}@onetimeemail\.net`
   - Rejects invalid email formats

3. **Database Validation**
   - Checks if inbox exists in database
   - Checks if inbox is still active (not expired)

4. **Rate Limiting**
   - Max 10 emails per minute per sender
   - Max 15 emails per minute per recipient
   - Prevents spam abuse

5. **Content Validation**
   - Max 1MB email size
   - Checks for suspicious content
   - Blocks malicious emails

6. **Timestamp Validation**
   - Ensures email timestamp is within 5 minutes
   - Prevents replay attacks

**Process Flow:**
```
Email Arrives → Security Checks → Valid? → Store Email → Update Metrics
                                     ↓
                                Invalid? → Send Bounce → Update Metrics
```

**Bounce Message Template:**
```
Subject: Delivery Status Notification (Failure)
From: postmaster@onetimeemail.net
To: original_sender@example.com

This is an automated delivery status notification.

Your message could not be delivered to abc123@onetimeemail.net

Reason: Mailbox does not exist or has expired

This is a temporary email service. Email addresses expire after their set duration.
```

### **API 3: `/api/metrics` - Analytics Dashboard**

**Method:** GET  
**Purpose:** Returns all service statistics  
**File:** `app/api/metrics/route.ts`

**Response Categories:**
1. **Generation Statistics** - App usage metrics
2. **Email Statistics** - Email traffic metrics
3. **Expiry Statistics** - Expiration tracking
4. **Security Statistics** - Security events

**Calculated Insights:**
- `bounce_rate`: Percentage of emails that bounced
- `security_block_rate`: Percentage of emails blocked
- `active_inbox_percentage`: Percentage of inboxes still active
- `expiry_rate`: Percentage of generated emails that expired

**Method:** POST  
**Purpose:** Updates specific metrics (admin only)

**Request:**
```json
{
  "metric_name": "total_emails_received",
  "metric_value": 10,
  "action": "increment"  // or "set"
}
```

### **API 4: `/api/cleanup-expired` - Maintenance**

**Method:** GET  
**Purpose:** Returns cleanup status and information

**Method:** POST  
**Purpose:** Executes cleanup process  
**File:** `app/api/cleanup-expired/route.ts`

**Cleanup Process:**
1. **Find Expired Inboxes**
   ```sql
   SELECT * FROM inbox 
   WHERE expires_at < NOW() 
   AND is_active = true
   ```

2. **Delete Emails from Expired Inboxes**
   ```sql
   DELETE FROM emails 
   WHERE inbox_id IN (expired_inbox_ids)
   ```

3. **Mark Inboxes as Inactive**
   ```sql
   UPDATE inbox 
   SET is_active = false 
   WHERE id IN (expired_inbox_ids)
   ```

4. **Update Metrics**
   - `total_expired_inboxes_cleaned`
   - `total_expired_emails_deleted`
   - `total_inboxes_expired`
   - `total_emails_expired`

**Why This Approach:**
- **Emails deleted** = Saves storage space (large data)
- **Inboxes kept** = Preserves analytics (small data)
- **Metrics updated** = Tracks cleanup effectiveness

### **API 5: `/api/test-email` - Development Tool**

**Method:** POST  
**Purpose:** Sends test emails for development  
**File:** `app/api/test-email/route.ts`

**Usage:**
```json
{
  "to": "abc123@onetimeemail.net",
  "subject": "Test Email",
  "body": "This is a test email"
}
```

---

## 🔐 **Security System**

### **1. HMAC Signature Verification**

**Purpose:** Ensures webhook requests actually come from Mailgun

**Implementation:**
```typescript
function verifySignature(timestamp: string, token: string, signature: string) {
  const hmac = crypto.createHmac('sha256', MAILGUN_WEBHOOK_SIGNING_KEY)
  hmac.update(timestamp + token)
  const expectedSignature = hmac.digest('hex')
  return expectedSignature === signature
}
```

**Environment Variable:**
```env
MAILGUN_WEBHOOK_SIGNING_KEY=64c525a197cf6464fb0767a8701bd05d
```

### **2. Rate Limiting System**

**Implementation:**
```typescript
// Rate limit tracking
const senderRates = new Map<string, number[]>()
const recipientRates = new Map<string, number[]>()

// Check limits
const senderCount = getSenderEmailCount(sender, 60000) // 1 minute
const recipientCount = getRecipientEmailCount(recipient, 60000)

if (senderCount >= 10) return bounce('Rate limit exceeded')
if (recipientCount >= 15) return bounce('Rate limit exceeded')
```

**Limits:**
- 10 emails per minute per sender
- 15 emails per minute per recipient

### **3. Email Validation**

**Format Check:**
```typescript
function isValidEmailFormat(email: string): boolean {
  const pattern = /^[a-z0-9]{6}@onetimeemail\.net$/
  return pattern.test(email)
}
```

**Database Check:**
```typescript
const { data: inbox } = await supabase
  .from('inbox')
  .select('*')
  .eq('email_address', recipient)
  .eq('is_active', true)
  .single()

if (!inbox) return bounce('Inbox not found')
```

### **4. Content Validation**

**Size Limit:**
```typescript
const MAX_EMAIL_SIZE = 1024 * 1024 // 1MB
if (emailSize > MAX_EMAIL_SIZE) return bounce('Email too large')
```

**Suspicious Content Detection:**
```typescript
function hasSuspiciousContent(subject: string, body: string): boolean {
  const suspiciousPatterns = [
    /urgent.{0,20}action.{0,20}required/i,
    /click.{0,20}here.{0,20}immediately/i,
    /verify.{0,20}account.{0,20}now/i
  ]
  
  return suspiciousPatterns.some(pattern => 
    pattern.test(subject) || pattern.test(body)
  )
}
```

### **5. Timestamp Validation**

**Purpose:** Prevents replay attacks

```typescript
function isValidTimestamp(timestamp: string): boolean {
  const emailTime = new Date(parseInt(timestamp) * 1000)
  const now = new Date()
  const timeDiff = Math.abs(now.getTime() - emailTime.getTime())
  return timeDiff <= 5 * 60 * 1000 // 5 minutes tolerance
}
```

---

## 📁 **Code Structure**

### **Project Directory:**
```
my-nextjs-app/
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API endpoints
│   │   ├── create-inbox/  # Email generation
│   │   ├── mailgun-inbound/ # Email processing
│   │   ├── metrics/       # Analytics
│   │   ├── cleanup-expired/ # Maintenance
│   │   └── test-email/    # Development tools
│   ├── inbox/[email]/     # Email viewer pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── database/              # SQL migration files
│   ├── 01_create_inbox_table.sql
│   ├── 02_create_emails_table.sql
│   └── 06_create_metrics_table.sql
├── lib/                   # Utility functions
│   └── supabaseClient.ts  # Database connection
├── package.json           # Dependencies
└── next.config.ts         # Next.js configuration
```

### **Key Files Explained:**

#### **`lib/supabaseClient.ts` - Database Connection**
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

#### **`app/api/mailgun-inbound/route.ts` - Core Email Processing**
- 450+ lines of code
- Handles all email processing logic
- Implements all security checks
- Manages bounce notifications
- Updates metrics automatically

#### **`app/api/metrics/route.ts` - Analytics Engine**
- Organizes metrics into categories
- Calculates insights and percentages
- Provides real-time database counts
- Supports metric updates

#### **`app/api/cleanup-expired/route.ts` - Maintenance System**
- Identifies expired inboxes
- Deletes old emails
- Updates cleanup metrics
- Provides detailed reports

---

## 🌍 **Environment Setup**

### **Required Environment Variables:**

```env
# Supabase Database Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Mailgun Configuration  
MAILGUN_WEBHOOK_SIGNING_KEY=64c525a197cf6464fb0767a8701bd05d
MAILGUN_API_KEY=c5ea400f-00cde4cf
MAILGUN_DOMAIN=onetimeemail.net
```

### **Development Setup:**

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Set up Environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

3. **Run Database Migrations:**
   ```bash
   # In Supabase SQL Editor, run each file in order:
   # 01_create_inbox_table.sql
   # 02_create_emails_table.sql  
   # 06_create_metrics_table.sql
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```

5. **Configure Mailgun:**
   - Set up domain routing
   - Configure webhook URL
   - Test email delivery

### **Production Setup:**

1. **Deploy to Vercel:**
   ```bash
   npm run build
   vercel --prod
   ```

2. **Configure Environment Variables:**
   - Add all environment variables in Vercel dashboard
   - Ensure webhook URL points to production domain

3. **Set up DNS:**
   - Configure MX records for email domain
   - Set up CNAME records for Mailgun

---

## 🚀 **Deployment Process**

### **1. Vercel Deployment:**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod

# Set environment variables
vercel env add MAILGUN_API_KEY
vercel env add MAILGUN_WEBHOOK_SIGNING_KEY
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add MAILGUN_DOMAIN
```

### **2. Domain Configuration:**

**DNS Records:**
```
Type: MX
Name: @
Value: 10 mxa.mailgun.org
       10 mxb.mailgun.org

Type: CNAME
Name: email
Value: mailgun.org

Type: TXT
Name: @
Value: v=spf1 include:mailgun.org ~all
```

### **3. Mailgun Configuration:**

**Webhook URL:**
```
https://your-domain.com/api/mailgun-inbound
```

**Route Configuration:**
```
Priority: 10
Filter: match_recipient(".*@onetimeemail.net")
Action: forward("https://your-domain.com/api/mailgun-inbound")
```

### **4. SSL/Security:**
- Vercel automatically provides SSL certificates
- Webhook endpoints use HTTPS
- HMAC signatures provide additional security

---

## 📊 **Monitoring & Analytics**

### **Key Metrics to Watch:**

1. **Service Health:**
   - `bounce_rate` (should be low)
   - `security_block_rate` (indicates attack attempts)
   - `active_inbox_percentage` (usage patterns)

2. **Usage Patterns:**
   - `total_emails_generated` vs `total_emails_received`
   - `expiry_rate` (how many emails expire unused)

3. **System Performance:**
   - Database growth rate
   - Cleanup effectiveness
   - API response times

### **Monitoring Commands:**

```bash
# Check service health
curl https://your-domain.com/api/metrics

# Run manual cleanup
curl -X POST https://your-domain.com/api/cleanup-expired

# Create test email
curl -X POST https://your-domain.com/api/create-inbox \
  -H "Content-Type: application/json" \
  -d '{"duration": 10}'
```

### **Automated Monitoring:**

**Cron Job Setup:**
```bash
# Daily cleanup at 3 AM
0 3 * * * curl -X POST https://your-domain.com/api/cleanup-expired

# Hourly health check
0 * * * * curl https://your-domain.com/api/metrics
```

---

## 🔧 **Maintenance Tasks**

### **Daily Tasks:**
1. **Run Cleanup Process:**
   ```bash
   curl -X POST https://your-domain.com/api/cleanup-expired
   ```

2. **Check Metrics:**
   ```bash
   curl https://your-domain.com/api/metrics
   ```

3. **Monitor Error Logs:**
   - Check Vercel function logs
   - Review Mailgun delivery logs
   - Monitor Supabase database performance

### **Weekly Tasks:**
1. **Database Maintenance:**
   ```sql
   -- Check database size
   SELECT pg_size_pretty(pg_total_relation_size('emails'));
   SELECT pg_size_pretty(pg_total_relation_size('inbox'));
   
   -- Check for orphaned records
   SELECT COUNT(*) FROM emails e 
   LEFT JOIN inbox i ON e.inbox_id = i.id 
   WHERE i.id IS NULL;
   ```

2. **Security Review:**
   - Review bounce rate trends
   - Check for suspicious email patterns
   - Verify rate limiting effectiveness

### **Monthly Tasks:**
1. **Performance Optimization:**
   - Review database query performance
   - Optimize slow queries
   - Consider index additions

2. **Security Updates:**
   - Update dependencies
   - Review and update security patterns
   - Check for new attack vectors

---

## 🛠️ **Troubleshooting**

### **Common Issues:**

#### **Issue 1: Emails Not Being Received**

**Symptoms:**
- Emails sent to temporary addresses don't appear
- No bounce messages received

**Diagnosis:**
```bash
# Check webhook logs
curl https://your-domain.com/api/mailgun-inbound

# Check database
SELECT * FROM emails ORDER BY received_at DESC LIMIT 10;

# Check Mailgun logs
# (Check Mailgun dashboard for delivery attempts)
```

**Solutions:**
1. Verify webhook URL is correct
2. Check HMAC signature verification
3. Ensure email format matches validation pattern
4. Verify inbox exists and is active

#### **Issue 2: High Bounce Rate**

**Symptoms:**
- `bounce_rate` > 30%
- Many emails to non-existent addresses

**Diagnosis:**
```bash
# Check bounce metrics
curl https://your-domain.com/api/metrics | grep bounce

# Check recent bounces
SELECT * FROM metrics WHERE metric_name = 'total_bounce_notifications';
```

**Solutions:**
1. Review email generation patterns
2. Check for bot activity
3. Implement additional validation
4. Monitor sender patterns

#### **Issue 3: Database Growth**

**Symptoms:**
- Database size growing rapidly
- Slow query performance

**Diagnosis:**
```sql
-- Check table sizes
SELECT schemaname, tablename, 
       pg_size_pretty(pg_total_relation_size(tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public';

-- Check email count
SELECT COUNT(*) FROM emails;
SELECT COUNT(*) FROM inbox;
```

**Solutions:**
1. Run cleanup more frequently
2. Reduce email retention time
3. Optimize database queries
4. Consider email archiving

#### **Issue 4: Security Alerts**

**Symptoms:**
- High `security_block_rate`
- Suspicious email patterns

**Diagnosis:**
```bash
# Check security metrics
curl https://your-domain.com/api/metrics | grep security

# Review recent blocks
SELECT * FROM metrics WHERE metric_name LIKE '%blocked%';
```

**Solutions:**
1. Review and update content filters
2. Tighten rate limiting
3. Implement IP blocking
4. Update suspicious pattern detection

---

## 📈 **Performance Optimization**

### **Database Optimization:**

#### **Indexes:**
```sql
-- Email lookup optimization
CREATE INDEX idx_emails_inbox_id ON emails(inbox_id);
CREATE INDEX idx_emails_received_at ON emails(received_at);

-- Inbox lookup optimization  
CREATE INDEX idx_inbox_email_address ON inbox(email_address);
CREATE INDEX idx_inbox_expires_at ON inbox(expires_at);
CREATE INDEX idx_inbox_active ON inbox(is_active);

-- Metrics optimization
CREATE INDEX idx_metrics_name ON metrics(metric_name);
CREATE INDEX idx_metrics_updated ON metrics(updated_at);
```

#### **Query Optimization:**
```sql
-- Efficient expired inbox query
SELECT id, email_address FROM inbox 
WHERE expires_at < NOW() 
AND is_active = true;

-- Efficient email cleanup
DELETE FROM emails 
WHERE inbox_id IN (
  SELECT id FROM inbox 
  WHERE expires_at < NOW() 
  AND is_active = true
);
```

### **API Optimization:**

#### **Caching:**
```typescript
// Cache frequently accessed data
const metricsCache = new Map<string, { data: any, timestamp: number }>()

function getCachedMetrics() {
  const cached = metricsCache.get('metrics')
  if (cached && Date.now() - cached.timestamp < 60000) {
    return cached.data
  }
  return null
}
```

#### **Rate Limiting Optimization:**
```typescript
// Use Redis or database for persistent rate limiting
// Current implementation uses in-memory maps (resets on restart)
```

---

## 🔮 **Future Enhancements**

### **Short-term Improvements:**

1. **Email Attachments:**
   - Support file attachments
   - Virus scanning
   - Size limitations

2. **Email Forwarding:**
   - Forward emails to real addresses
   - Configurable forwarding rules

3. **Custom Domains:**
   - Support multiple domains
   - Domain-specific settings

4. **Advanced Analytics:**
   - Email open tracking
   - Click tracking
   - Sender reputation

### **Medium-term Improvements:**

1. **User Accounts:**
   - User registration
   - Email history
   - Custom settings

2. **API Keys:**
   - Developer API access
   - Rate limiting per API key
   - Usage analytics

3. **Email Templates:**
   - Custom bounce messages
   - Branded emails
   - Multi-language support

4. **Mobile App:**
   - React Native app
   - Push notifications
   - Offline support

### **Long-term Improvements:**

1. **Enterprise Features:**
   - Team management
   - Admin dashboard
   - Audit logging

2. **Advanced Security:**
   - Machine learning spam detection
   - Threat intelligence integration
   - Advanced threat protection

3. **Scalability:**
   - Microservices architecture
   - Database sharding
   - Load balancing

4. **Integration:**
   - Zapier integration
   - Webhook support
   - Third-party API connections

---

## 📚 **Code Examples**

### **Creating a New Email Address:**
```typescript
const response = await fetch('/api/create-inbox', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ duration: 30 })
})

const data = await response.json()
console.log(data.inbox.email_address) // abc123@onetimeemail.net
```

### **Checking Email Statistics:**
```typescript
const response = await fetch('/api/metrics')
const data = await response.json()

console.log('Total emails generated:', data.metrics.generation_statistics.total_emails_generated)
console.log('Current bounce rate:', data.insights.bounce_rate)
```

### **Running Cleanup:**
```typescript
const response = await fetch('/api/cleanup-expired', {
  method: 'POST'
})

const data = await response.json()
console.log('Cleaned up:', data.cleanup_summary.emails_deleted, 'emails')
```

### **Manual Metric Update:**
```typescript
const response = await fetch('/api/metrics', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    metric_name: 'total_emails_received',
    metric_value: 1,
    action: 'increment'
  })
})
```

---

## 🎓 **Learning Resources**

### **Technologies Used:**
- **Next.js 15:** [https://nextjs.org/docs](https://nextjs.org/docs)
- **TypeScript:** [https://www.typescriptlang.org/docs](https://www.typescriptlang.org/docs)
- **Supabase:** [https://supabase.com/docs](https://supabase.com/docs)
- **Mailgun:** [https://documentation.mailgun.com](https://documentation.mailgun.com)
- **PostgreSQL:** [https://www.postgresql.org/docs](https://www.postgresql.org/docs)

### **Key Concepts:**
- **HMAC Signatures:** Cryptographic message authentication
- **Rate Limiting:** Preventing abuse through request limiting
- **Webhook Processing:** Handling external API callbacks
- **Database Optimization:** Efficient data storage and retrieval
- **Email Bouncing:** Proper email delivery failure handling

---

## 📞 **Support & Contact**

### **Documentation Files:**
- `API_ENDPOINTS.md` - Complete API reference
- `CLEANUP_METRICS_GUIDE.md` - Metrics and cleanup details
- `MAILGUN_SETUP.md` - Mailgun configuration guide
- `SECURITY_PROTECTION.md` - Security implementation details

### **Emergency Contacts:**
- **Database Issues:** Check Supabase dashboard
- **Email Delivery:** Check Mailgun logs
- **API Errors:** Check Vercel function logs
- **Security Alerts:** Review metrics API

### **Backup & Recovery:**
- **Database:** Supabase provides automatic backups
- **Code:** Stored in Git repository
- **Environment:** Document all environment variables
- **Configuration:** Keep Mailgun settings documented

---

## ✅ **Handover Checklist**

### **Before Handover:**
- [ ] All environment variables documented
- [ ] Database migrations completed
- [ ] Mailgun configuration verified
- [ ] All APIs tested and working
- [ ] Metrics tracking operational
- [ ] Cleanup process tested
- [ ] Security measures verified
- [ ] Documentation complete

### **After Handover:**
- [ ] Access credentials transferred
- [ ] Monitoring alerts configured
- [ ] Backup procedures established
- [ ] Support contacts updated
- [ ] Change management process defined
- [ ] Security review scheduled
- [ ] Performance baseline established
- [ ] Enhancement roadmap prioritized

---

**End of Handover Document**

*This document contains all the technical details needed to understand, maintain, and enhance the OneTimeEmail service. Keep it updated as the system evolves.*

**Last Updated:** January 2024  
**Document Version:** 1.0  
**Next Review:** March 2024 