# 🌐 Custom Domain Setup Guide - onetimeemail.net

**Goal:** Change from `your-app.vercel.app` to `onetimeemail.net`  
**Platform:** Vercel + Custom Domain  
**Requirements:** Domain registrar access + Vercel project access

---

## 🎯 **Step-by-Step Setup Process**

### **Step 1: Add Custom Domain in Vercel**

1. **Go to Vercel Dashboard:**
   ```
   https://vercel.com/dashboard
   ```

2. **Select Your Project:**
   - Click on your temporary email project
   - Go to **Settings** tab
   - Click on **Domains** in the sidebar

3. **Add Custom Domain:**
   ```
   Domain: onetimeemail.net
   ```
   - Click **Add Domain**
   - Vercel will show DNS configuration needed

4. **Get DNS Records:**
   Vercel will provide records like:
   ```
   Type: A
   Name: @
   Value: 76.76.19.61

   Type: CNAME  
   Name: www
   Value: cname.vercel-dns.com
   ```

### **Step 2: Configure DNS at Your Domain Registrar**

**Go to your domain registrar (GoDaddy, Namecheap, etc.):**

1. **Add A Record:**
   ```
   Type: A
   Name: @ (or leave blank)
   Value: 76.76.19.61
   TTL: 300 (or Auto)
   ```

2. **Add CNAME Record:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 300 (or Auto)
   ```

3. **Add MX Records (for email):**
   ```
   Type: MX
   Name: @ (or leave blank)
   Priority: 10
   Value: mxa.mailgun.org

   Type: MX
   Name: @ (or leave blank)
   Priority: 10
   Value: mxb.mailgun.org
   ```

4. **Add TXT Record (for SPF):**
   ```
   Type: TXT
   Name: @ (or leave blank)
   Value: v=spf1 include:mailgun.org ~all
   ```

### **Step 3: Wait for DNS Propagation**

**Check propagation status:**
```bash
# Check A record
nslookup onetimeemail.net

# Check MX records
nslookup -type=MX onetimeemail.net

# Online checker
https://www.whatsmydns.net/
```

**Expected results:**
```
onetimeemail.net → 76.76.19.61
MX records → mxa.mailgun.org, mxb.mailgun.org
```

**⏱️ DNS propagation can take 5 minutes to 24 hours**

### **Step 4: Verify Domain in Vercel**

1. **Go back to Vercel Dashboard**
2. **Check domain status:**
   - Should show ✅ **Valid Configuration**
   - SSL certificate will be automatically issued

3. **Test the website:**
   ```
   https://onetimeemail.net
   ```
   - Should load your temporary email service
   - Should have SSL certificate (🔒 in browser)

### **Step 5: Update Mailgun Webhook URL**

1. **Go to Mailgun Dashboard:**
   ```
   https://app.mailgun.com/
   ```

2. **Update Webhook URL:**
   - Go to **Sending** → **Webhooks**
   - Find your webhook
   - Update URL from:
     ```
     https://your-app.vercel.app/api/mailgun-inbound
     ```
   - To:
     ```
     https://onetimeemail.net/api/mailgun-inbound
     ```

3. **Update Route (if using routes):**
   - Go to **Receiving** → **Routes**
   - Update forward URL to:
     ```
     https://onetimeemail.net/api/mailgun-inbound
     ```

### **Step 6: Test Email Functionality**

1. **Create test email:**
   ```bash
   curl -X POST https://onetimeemail.net/api/create-inbox \
     -H "Content-Type: application/json" \
     -d '{"duration": 10}'
   ```

2. **Send test email:**
   ```bash
   # Send email to the generated address
   # Check if it arrives properly
   ```

3. **Check metrics:**
   ```bash
   curl https://onetimeemail.net/api/metrics
   ```

---

## 🔧 **Domain Configuration Summary**

### **DNS Records Needed:**
```
# Website hosting
A     @     76.76.19.61
CNAME www   cname.vercel-dns.com

# Email routing  
MX    @     10 mxa.mailgun.org
MX    @     10 mxb.mailgun.org
TXT   @     v=spf1 include:mailgun.org ~all
```

### **Vercel Configuration:**
- ✅ Custom domain: `onetimeemail.net`
- ✅ SSL certificate: Auto-issued
- ✅ Redirect: `www.onetimeemail.net` → `onetimeemail.net`

### **Mailgun Configuration:**
- ✅ Webhook: `https://onetimeemail.net/api/mailgun-inbound`
- ✅ Domain: `onetimeemail.net`
- ✅ Routes: Updated to new domain

---

## 🎯 **Updated URLs**

### **Before (Vercel subdomain):**
```
Website: https://your-app.vercel.app
API: https://your-app.vercel.app/api/metrics
Webhook: https://your-app.vercel.app/api/mailgun-inbound
```

### **After (Custom domain):**
```
Website: https://onetimeemail.net
API: https://onetimeemail.net/api/metrics
Webhook: https://onetimeemail.net/api/mailgun-inbound
```

---

## ✅ **Verification Checklist**

### **DNS Verification:**
- [ ] A record points to Vercel IP
- [ ] CNAME record for www subdomain
- [ ] MX records point to Mailgun servers
- [ ] SPF record includes Mailgun
- [ ] DNS propagation complete

### **Vercel Verification:**
- [ ] Domain shows as "Valid Configuration"
- [ ] SSL certificate issued automatically
- [ ] Website loads on custom domain
- [ ] All API endpoints accessible

### **Mailgun Verification:**
- [ ] Webhook URL updated to new domain
- [ ] Routes updated to new domain
- [ ] Domain verification complete
- [ ] Email sending/receiving working

### **Application Verification:**
- [ ] Email generation working
- [ ] Email receiving working
- [ ] Bounce notifications working
- [ ] Metrics tracking working
- [ ] Cleanup process working

---

## 🚨 **Common Issues & Solutions**

### **Issue 1: DNS Not Propagating**
**Problem:** Domain not resolving after DNS changes

**Solution:**
```bash
# Check current DNS
nslookup onetimeemail.net

# Flush local DNS cache
# Windows:
ipconfig /flushdns

# Mac:
sudo dscacheutil -flushcache

# Wait 15-30 minutes and try again
```

### **Issue 2: SSL Certificate Not Issued**
**Problem:** Website shows "Not Secure" or SSL error

**Solution:**
1. Wait 5-10 minutes after DNS propagation
2. Check Vercel dashboard for SSL status
3. Try accessing site in incognito mode
4. Contact Vercel support if issue persists

### **Issue 3: Emails Not Being Received**
**Problem:** Emails sent to temporary addresses not arriving

**Solution:**
1. Check Mailgun webhook URL is updated
2. Verify MX records are correct
3. Test webhook directly:
   ```bash
   curl https://onetimeemail.net/api/mailgun-inbound
   ```
4. Check Mailgun logs for delivery attempts

### **Issue 4: API Endpoints Not Working**
**Problem:** API calls failing on new domain

**Solution:**
1. Check if domain is fully propagated
2. Verify SSL certificate is working
3. Test API endpoints:
   ```bash
   curl https://onetimeemail.net/api/metrics
   ```
4. Check Vercel function logs

---

## 🎉 **Success Verification**

### **Final Tests:**
1. **Website Access:**
   ```
   https://onetimeemail.net ✅
   ```

2. **Email Generation:**
   ```bash
   curl -X POST https://onetimeemail.net/api/create-inbox
   ```

3. **Email Receiving:**
   - Send email to generated address
   - Check if it arrives in database

4. **Metrics Dashboard:**
   ```bash
   curl https://onetimeemail.net/api/metrics
   ```

### **Performance Check:**
- **Load Time:** Should be fast (< 2 seconds)
- **SSL Rating:** Should be A+ on SSL Labs
- **DNS Response:** Should be fast (< 100ms)

---

## 📋 **Post-Setup Tasks**

### **Update Documentation:**
- [ ] Update `API_ENDPOINTS.md` with new domain
- [ ] Update `COMPLETE_PROJECT_HANDOVER.md` references
- [ ] Update any hardcoded URLs in code

### **Monitor Performance:**
- [ ] Set up uptime monitoring
- [ ] Monitor SSL certificate expiry
- [ ] Track DNS performance

### **Security Review:**
- [ ] Verify HTTPS enforcement
- [ ] Check webhook security
- [ ] Review domain security settings

---

## 🔗 **Quick Reference Commands**

```bash
# Check website
curl -I https://onetimeemail.net

# Test API
curl https://onetimeemail.net/api/metrics

# Create test email
curl -X POST https://onetimeemail.net/api/create-inbox \
  -H "Content-Type: application/json" \
  -d '{"duration": 10}'

# Check DNS
nslookup onetimeemail.net
nslookup -type=MX onetimeemail.net

# Check SSL
curl -I https://onetimeemail.net | grep -i ssl
```

---

**Your custom domain `onetimeemail.net` is now ready for production! 🚀**

*Remember to update any documentation, bookmarks, or external references to use the new domain.* 