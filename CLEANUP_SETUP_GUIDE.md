# 🧹 Database Cleanup Setup Guide

Your OneTimeEmail app now has a complete **automated cleanup system** to remove expired emails and update metrics. This guide will help you set it up and use it effectively.

## 🔧 **Setup Steps**

### **Step 1: Install Database Functions**

Run these SQL scripts in your **Supabase SQL Editor**:

1. **First, create the metrics table:**
   ```sql
   -- Copy and run: database/06_create_metrics_table.sql
   ```

2. **Then, install cleanup functions:**
   ```sql
   -- Copy and run: database/07_cleanup_functions.sql
   ```

### **Step 2: Test Manual Cleanup**

```bash
# For local development
npm run cleanup

# For production
npm run cleanup:prod
```

### **Step 3: Set Up Automatic Cleanup**

Choose one of the automation options below:

---

## 🤖 **Automation Options**

### **Option 1: GitHub Actions (Recommended)**

1. **Add Repository Secret:**
   - Go to GitHub repo → Settings → Secrets → Actions
   - Add secret: `CLEANUP_URL` = `https://your-domain.com/api/cleanup-expired`

2. **Enable Workflow:**
   - The workflow file is already created: `.github/workflows/cleanup-cron.yml`
   - It runs daily at 3 AM UTC
   - You can also trigger it manually

3. **Monitor Results:**
   - Check GitHub Actions tab for cleanup logs
   - Each run shows detailed cleanup statistics

### **Option 2: Vercel Cron Jobs (Pro Plan Required)**

```typescript
// vercel.json
{
  "crons": [
    {
      "path": "/api/cleanup-expired",
      "schedule": "0 3 * * *"
    }
  ]
}
```

### **Option 3: External Cron Service**

Use services like [cron-job.org](https://cron-job.org) or [EasyCron](https://www.easycron.com):

- **URL:** `https://your-domain.com/api/cleanup-expired`
- **Method:** `POST`
- **Schedule:** Daily (e.g., `0 3 * * *`)
- **Headers:** `Content-Type: application/json`

### **Option 4: Server Cron Job**

If you have a server, add to crontab:

```bash
# Run daily at 3 AM
0 3 * * * curl -X POST https://your-domain.com/api/cleanup-expired
```

---

## 🚀 **Usage**

### **Manual Cleanup**

```bash
# Local development
npm run cleanup

# Production
CLEANUP_URL=https://your-domain.com/api/cleanup-expired npm run cleanup

# Or directly via curl
curl -X POST https://your-domain.com/api/cleanup-expired
```

### **Check Status**

```bash
# Check what needs cleanup
curl https://your-domain.com/api/cleanup-expired

# View metrics
curl https://your-domain.com/api/metrics
```

### **Example Output**

```json
{
  "success": true,
  "results": {
    "expired_inboxes_cleaned": 15,
    "expired_emails_deleted": 47,
    "total_emails_before": 152,
    "total_emails_after": 105
  },
  "cleanup_summary": {
    "emails_deleted": 47,
    "inboxes_cleaned": 15,
    "space_saved": "47 emails removed",
    "current_active_emails": 105,
    "current_active_inboxes": 23
  }
}
```

---

## 📊 **What Gets Cleaned Up**

### **Expired Emails:**
- ✅ **Deleted:** Emails from expired inboxes (saves storage)
- ✅ **Metrics Updated:** Tracks deletion count
- ✅ **Space Saved:** Reduces database size

### **Expired Inboxes:**
- ✅ **Marked Inactive:** `is_active = false` (preserves analytics)
- ✅ **Not Deleted:** Keeps records for metrics
- ✅ **Stops Receiving:** No new emails accepted

### **Metrics Updated:**
- `total_expired_inboxes_cleaned` - Count of cleaned inboxes
- `total_expired_emails_deleted` - Count of deleted emails
- `current_active_emails` - Current email count
- `current_active_inboxes` - Current active inbox count

---

## 🔍 **Monitoring**

### **Database Queries**

```sql
-- Check expired inboxes pending cleanup
SELECT COUNT(*) as expired_pending 
FROM inbox 
WHERE expires_at < NOW() AND is_active = true;

-- View cleanup metrics
SELECT * FROM metrics_summary 
WHERE metric_name LIKE '%expired%' 
OR metric_name LIKE '%current%';

-- Get cleanup statistics
SELECT * FROM get_cleanup_stats();
```

### **API Endpoints**

```bash
# Current status
GET /api/cleanup-expired

# Run cleanup
POST /api/cleanup-expired

# View all metrics
GET /api/metrics
```

---

## 🛠️ **Troubleshooting**

### **Common Issues:**

#### **"Function does not exist" Error**
```bash
# Solution: Run database setup
npm run db:setup
# Then run the SQL scripts in Supabase
```

#### **"Permission denied" Error**
```sql
-- Grant permissions in Supabase SQL Editor
GRANT EXECUTE ON FUNCTION cleanup_expired_data() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_metric(TEXT, DOUBLE PRECISION) TO anon, authenticated;
```

#### **GitHub Actions Not Working**
1. Check repository secrets are set
2. Verify `CLEANUP_URL` is correct
3. Check Actions tab for error logs

#### **Cleanup Not Running**
1. Test manual cleanup first: `npm run cleanup`
2. Check API endpoint is accessible
3. Verify cron job schedule
4. Check server logs for errors

### **Manual Database Cleanup**

If you need to clean up immediately via SQL:

```sql
-- Emergency cleanup (run in Supabase SQL Editor)
SELECT * FROM cleanup_expired_data();

-- View results
SELECT 
  expired_inboxes_cleaned,
  expired_emails_deleted,
  cleanup_timestamp
FROM cleanup_expired_data();
```

---

## 📈 **Benefits**

### **Storage Savings:**
- **Reduces database size** by removing old emails
- **Improves performance** with fewer records
- **Saves costs** on database storage

### **Better Analytics:**
- **Tracks cleanup efficiency**
- **Monitors service usage**
- **Provides insights** on email patterns

### **Automated Maintenance:**
- **No manual intervention** required
- **Reliable scheduling** with multiple options
- **Error handling** and notifications

---

## 🎯 **Recommended Schedule**

- **Daily Cleanup:** Best for active services
- **Hourly Cleanup:** For high-volume services
- **Weekly Cleanup:** For low-volume or testing

**Current Setup:** Daily at 3 AM UTC (GitHub Actions)

---

## 🔧 **Customization**

### **Change Cleanup Frequency**

Edit `.github/workflows/cleanup-cron.yml`:

```yaml
schedule:
  # Every 6 hours
  - cron: '0 */6 * * *'
  # Every hour
  - cron: '0 * * * *'
  # Weekly on Sunday
  - cron: '0 3 * * 0'
```

### **Custom Cleanup Logic**

Modify `database/07_cleanup_functions.sql` to:
- Keep emails for longer (e.g., 24 hours after expiry)
- Add additional metrics
- Implement soft deletes
- Add notification logic

---

## ✅ **Verification**

After setup, verify everything works:

1. **Test Manual Cleanup:**
   ```bash
   npm run cleanup
   ```

2. **Check Metrics:**
   ```bash
   curl https://your-domain.com/api/metrics
   ```

3. **Verify Automation:**
   - GitHub Actions: Check Actions tab
   - Cron service: Check service logs
   - Vercel: Check function logs

4. **Monitor Database:**
   ```sql
   SELECT * FROM metrics_summary;
   ```

---

## 🎉 **You're All Set!**

Your OneTimeEmail service now has:
- ✅ **Automatic cleanup** of expired data
- ✅ **Comprehensive metrics** tracking
- ✅ **Multiple automation** options
- ✅ **Easy monitoring** and troubleshooting

The cleanup system will keep your database clean and provide valuable insights into your service usage! 🚀 