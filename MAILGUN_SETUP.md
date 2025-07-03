# 📧 Mailgun Setup Guide for One-Time Email

This guide walks you through setting up Mailgun to receive emails and forward them to your Next.js webhook API.

## 🎯 Prerequisites
- Your Next.js app deployed to a public URL (Vercel, Netlify, etc.)
- A domain name you own (or use Mailgun's sandbox for testing)
- Supabase database set up with the emails table

## 🚀 Step-by-Step Setup

### 1. Create Mailgun Account
1. Go to [mailgun.com](https://mailgun.com) and sign up
2. Verify your email address
3. Complete account verification (may require phone number)
4. **Free tier includes**: 5,000 emails/month for 3 months

### 2. Add Your Domain
1. In Mailgun dashboard: **Sending** → **Domains**
2. Click **"Add New Domain"**
3. Enter your domain:
   - Production: `yourdomain.com` or `mail.yourdomain.com`
   - Testing: Use Mailgun sandbox domain
4. Select region (US/EU)
5. Click **"Add Domain"**

### 3. Configure DNS Records
Add these DNS records to your domain provider:

```dns
# MX Records (Mail Exchange) - REQUIRED
Type: MX    Name: @    Value: 10 mxa.mailgun.org    TTL: 300
Type: MX    Name: @    Value: 10 mxb.mailgun.org    TTL: 300

# TXT Record for SPF - REQUIRED  
Type: TXT   Name: @    Value: v=spf1 include:mailgun.org ~all

# TXT Record for Domain Verification - REQUIRED
Type: TXT   Name: @    Value: [Mailgun will provide this]

# CNAME for Tracking - OPTIONAL
Type: CNAME Name: email Value: mailgun.org
```

⚠️ **DNS propagation can take 24-48 hours**

### 4. Verify Domain
1. Wait for DNS propagation
2. In Mailgun dashboard, click **"Verify DNS Settings"**
3. Status should show **"Active"** when ready

### 5. Configure Webhook URL
1. Go to **Sending** → **Webhooks**
2. Select your domain
3. Click **"Add Webhook"**
4. Choose event: **"Incoming Messages"**
5. Enter webhook URL:
   ```
   https://yourdomain.vercel.app/api/mailgun-inbound
   ```
6. Click **"Create Webhook"**

### 6. Set Up Email Routes
1. Go to **Receiving** → **Routes**  
2. Click **"Create Route"**
3. Configure:
   ```
   Priority: 10
   Filter Expression: match_recipient(".*@yourdomain.com")
   Actions: forward("https://yourdomain.vercel.app/api/mailgun-inbound")
   Description: Forward emails to webhook API
   ```
4. Click **"Create Route"**

### 7. Update Environment Variables
Add to your `.env.local`:

```env
# Existing Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Mailgun API credentials (for sending emails later)
MAILGUN_API_KEY=your_mailgun_private_api_key
MAILGUN_DOMAIN=yourdomain.com
MAILGUN_API_BASE_URL=https://api.mailgun.net/v3
```

### 8. Deploy Your Application
Deploy to a public URL so Mailgun can reach your webhook:

```bash
# Example with Vercel
npm install -g vercel
vercel --prod

# Example with Netlify
npm install -g netlify-cli
netlify deploy --prod
```

## 🧪 Testing Your Setup

### Test 1: Check API Endpoint
```bash
curl https://yourdomain.vercel.app/api/mailgun-inbound
```
Should return API documentation.

### Test 2: Create Test Inbox
```bash
curl -X POST https://yourdomain.vercel.app/api/create-inbox
```
Note the generated email address.

### Test 3: Send Test Email
Send an email to the generated address from any email provider (Gmail, Outlook, etc.)

### Test 4: Check Database
Verify the email appears in your Supabase `emails` table.

## 🔧 Common Issues & Solutions

### Issue: "Domain not found"
- **Solution**: Wait for DNS propagation (24-48 hours)
- **Check**: Verify MX records are correctly configured

### Issue: "Webhook timeout"
- **Solution**: Ensure your app is deployed and publicly accessible
- **Check**: Test webhook URL directly in browser

### Issue: "Inbox not found" error
- **Solution**: Make sure recipient email exactly matches database
- **Check**: Case sensitivity in email addresses

### Issue: "Database connection failed"
- **Solution**: Verify Supabase environment variables
- **Check**: Test Supabase connection independently

## 📋 Production Checklist

- [ ] Domain verified in Mailgun
- [ ] DNS records configured and propagated
- [ ] Webhook URL added and tested
- [ ] Email routes configured
- [ ] App deployed to public URL
- [ ] Environment variables set correctly
- [ ] Database tables created (emails, inbox)
- [ ] Real-time subscriptions enabled
- [ ] Test email successfully received

## 🎯 Next Steps

1. **Custom Domain**: Replace `@onetimeemail.net` with your domain in `create-inbox` API
2. **Email Validation**: Add spam filtering and validation rules
3. **Rate Limiting**: Implement rate limiting for webhook endpoint
4. **Monitoring**: Set up logging and monitoring for email processing
5. **Security**: Add webhook signature verification

## 📞 Support

- **Mailgun Docs**: [documentation.mailgun.com](https://documentation.mailgun.com)
- **Mailgun Support**: Available in dashboard
- **DNS Help**: Contact your domain provider
- **Webhook Testing**: Use tools like ngrok for local testing

---

**🚀 Your one-time email service is ready to receive real emails!** 