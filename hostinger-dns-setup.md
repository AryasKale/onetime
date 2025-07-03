# 🌐 Hostinger DNS Setup for Mailgun

Complete guide for adding DNS records to your Hostinger domain for Mailgun email receiving.

## 🚀 Step-by-Step Instructions

### 1. Access Hostinger DNS Management
1. Log in to [hostinger.com](https://hostinger.com)
2. Click **"Domains"** in the main menu
3. Find your domain → click **"Manage"**
4. Go to **"DNS / Nameservers"** tab
5. Select **"DNS Zone Editor"**

### 2. Add MX Records (Required)
Click **"Add Record"** and add these two MX records:

**First MX Record:**
```
Type: MX
Name: @ (or leave empty)
Priority: 10
Value: mxa.mailgun.org
TTL: 300 (or Auto)
```

**Second MX Record:**
```
Type: MX
Name: @ (or leave empty)
Priority: 10
Value: mxb.mailgun.org
TTL: 300 (or Auto)
```

### 3. Add TXT Records (Required)

**SPF Record:**
```
Type: TXT
Name: @ (or leave empty)
Value: v=spf1 include:mailgun.org ~all
TTL: 300
```

**Domain Verification Record:**
```
Type: TXT
Name: @ (or leave empty)
Value: [Get this from Mailgun dashboard - Domain Settings]
TTL: 300
```

### 4. Add CNAME Record (Optional)
```
Type: CNAME
Name: email
Value: mailgun.org
TTL: 300
```

### 5. Save and Wait
1. Click **"Save"** or **"Apply Changes"**
2. Wait 1-24 hours for DNS propagation

## 🔍 Verification Commands

After adding records, verify them using these commands:

```bash
# Check MX records
nslookup -type=MX yourdomain.com

# Check TXT records  
nslookup -type=TXT yourdomain.com

# Alternative verification
dig MX yourdomain.com
dig TXT yourdomain.com
```

## 📋 Hostinger-Specific Notes

### Interface Tips:
- **"@" symbol** = your root domain (yourdomain.com)
- **TTL** can be "Auto" or 300-3600 seconds
- **Priority** for MX records should be 10
- **Changes** may take 15-30 minutes to show in Hostinger

### Common Issues:
- **Can't find DNS Zone Editor?** Look under "Advanced" or "DNS Management"
- **"@" not working?** Try leaving the Name field completely empty
- **Changes not saving?** Refresh the page and try again

### Visual Example:
```
┌─────────────────────────────────────────────────────┐
│ Add DNS Record                                      │
├─────────────────────────────────────────────────────┤
│ Type: [MX ▼]                                       │
│ Name: [@                    ]                      │
│ Priority: [10              ]                      │
│ Value: [mxa.mailgun.org    ]                      │
│ TTL: [Auto ▼]                                     │
│                                                    │
│ [Cancel] [Add Record]                             │
└─────────────────────────────────────────────────────┘
```

## ⚡ Quick Setup Checklist

- [ ] Access Hostinger DNS Zone Editor
- [ ] Add first MX record (mxa.mailgun.org)
- [ ] Add second MX record (mxb.mailgun.org)  
- [ ] Add SPF TXT record
- [ ] Add Mailgun verification TXT record
- [ ] Add email CNAME record (optional)
- [ ] Save all changes
- [ ] Wait for DNS propagation (1-24 hours)
- [ ] Verify with nslookup or dig commands

## 🎯 Next Steps After DNS Setup

1. **Wait for propagation** (check with `nslookup`)
2. **Verify domain** in Mailgun dashboard
3. **Set up webhook URL** in Mailgun
4. **Create email routes** in Mailgun
5. **Test email receiving** with your app

## 📞 Support

- **Hostinger Support**: Live chat available in dashboard
- **DNS Help**: [Hostinger DNS Documentation](https://support.hostinger.com/en/articles/1583227-how-to-edit-dns-zone)
- **Verification Tools**: Use online DNS checkers like whatsmydns.net

---
**🚀 Your Hostinger domain is ready for Mailgun email receiving!** 