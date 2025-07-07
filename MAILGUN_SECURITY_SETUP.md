# 🔐 Mailgun HMAC Security Setup

This guide shows how to set up HMAC verification for your Mailgun webhook to ensure secure email processing.

## 🎯 Why HMAC Verification?

- **Prevents unauthorized access** to your webhook endpoint
- **Validates requests** actually come from Mailgun
- **Prevents replay attacks** using timestamp validation
- **Industry standard** for webhook security

## 🔑 Step 1: Get Your Webhook Signing Key

### From Mailgun Dashboard:
1. **Sign in** to [mailgun.com](https://mailgun.com)
2. **Go to** Settings → **Webhooks**
3. **Select your domain** (onetimeemail.net)
4. **Find "HTTP webhook signing key"**
5. **Copy the key** (looks like: `key-1234567890abcdef...`)

### Alternative Location:
- **Settings** → **API Keys**
- **Look for "Webhook signing key"**

## 🔧 Step 2: Add Environment Variable

### In Vercel:
1. **Go to** [vercel.com](https://vercel.com) dashboard
2. **Select your project** (onetimeemail)
3. **Settings** → **Environment Variables**
4. **Add new variable:**
   ```
   Name: MAILGUN_WEBHOOK_SIGNING_KEY
   Value: key-1234567890abcdef... (your actual key)
   ```
5. **Click "Save"**

### In Local Development:
Create or update `.env.local`:
```env
# Existing Supabase variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# New Mailgun security variable
MAILGUN_WEBHOOK_SIGNING_KEY=key-1234567890abcdef...
```

## 🚀 Step 3: Redeploy Your App

1. **In Vercel dashboard:**
   - Go to **Deployments** tab
   - Click **"Redeploy"** on latest deployment
2. **Or push new commit** to trigger auto-deployment

## 🧪 Step 4: Test Security

### Test Valid Request:
- **Send test email** to generated inbox
- **Check logs** for "✅ Mailgun signature verified successfully"

### Test Invalid Request:
- **Try accessing webhook directly** in browser
- **Should get 401 error** with "Missing signature fields"

## 🔍 Verification Commands

### Test Webhook Endpoint:
```bash
curl https://onetimeemail.vercel.app/api/mailgun-inbound
```
Should return API documentation.

### Test Invalid POST:
```bash
curl -X POST https://onetimeemail.vercel.app/api/mailgun-inbound
```
Should return 401 error.

## 🛡️ Security Features Added

### ✅ HMAC Signature Verification:
- Uses SHA256 algorithm
- Compares computed vs provided signature
- Prevents forged requests

### ✅ Timestamp Validation:
- Prevents replay attacks
- 5-minute tolerance window
- Rejects old requests

### ✅ Environment Variable Protection:
- Signing key stored securely
- Not exposed in client-side code
- Configurable per environment

## 📋 Security Checklist

- [ ] Webhook signing key obtained from Mailgun
- [ ] Environment variable added to Vercel
- [ ] App redeployed with new variable
- [ ] Test email successfully processed
- [ ] Direct webhook access blocked (401 error)
- [ ] Logs show signature verification success

## 🔧 Troubleshooting

### Issue: "MAILGUN_WEBHOOK_SIGNING_KEY not configured"
**Solution:** Add the environment variable in Vercel and redeploy

### Issue: "Invalid signature"
**Solution:** Verify the signing key is correct from Mailgun dashboard

### Issue: "Request timestamp too old"
**Solution:** Check server time synchronization (usually temporary)

### Issue: "Missing signature fields"
**Solution:** Ensure Mailgun is configured to send signatures

## 🎯 Testing Your Setup

1. **Generate test inbox**
2. **Send email to generated address**
3. **Check Vercel logs** for verification messages
4. **Verify email appears** in your app
5. **Try direct webhook access** (should be blocked)

## 📞 Support

- **Mailgun Docs**: [documentation.mailgun.com](https://documentation.mailgun.com/en/latest/api-webhooks.html)
- **HMAC Security**: Industry standard for webhook verification
- **Vercel Logs**: Available in dashboard for debugging

---

**🛡️ Your webhook is now secure with HMAC verification!** 