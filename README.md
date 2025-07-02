# 📧 One-Time Email

A modern, secure temporary email service built with Next.js 15, React 19, and Tailwind CSS v4. Generate disposable email addresses that automatically expire, perfect for signups, verification, and avoiding spam.

## 🌟 Project Overview

One-Time Email provides users with temporary, disposable email addresses that self-destruct after a specified time period. This helps users protect their privacy, avoid spam, and maintain security when signing up for services or downloading content.

## 🚀 Features (Planned)

### ✅ Completed Features
- [x] **Modern Landing Page** - Clean, responsive design with gradient backgrounds
- [x] **Interactive Generate Inbox Button** - Calls API and displays results
- [x] **Professional UI/UX** - Email icons, feature highlights, and smooth animations
- [x] **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- [x] **Supabase Client Setup** - Database client configuration with TypeScript types
- [x] **API endpoint for inbox creation** (`/api/create-inbox`)
- [x] **Email generation functionality** with random addresses (@onetimeemail.net)
- [x] **10-minute expiry system** implementation
- [x] **Real-time countdown timer** - Shows remaining time with auto-expiry
- [x] **Copy to clipboard** functionality with visual feedback
- [x] **Loading states and error handling** for better UX
- [x] **Complete database schema** creation for temporary emails
- [x] **Real-time email subscriptions** - Live updates when emails arrive
- [x] **Email viewing interface** - Beautiful list of received messages
- [x] **Browser notifications** - Desktop alerts for new emails
- [x] **Test email functionality** - Send sample emails to test real-time updates

### 🔄 In Progress
- [ ] SMTP email reception integration
- [ ] Email detail view with full content display

### 📋 Upcoming Features
- [ ] **Temporary Email Generation** - Create unique, random email addresses
- [ ] **Real-time Inbox** - Live email viewing with WebSocket updates
- [ ] **Auto-Expiry System** - Emails automatically delete after 24 hours
- [ ] **Email Preview** - View email content, attachments, and metadata
- [ ] **Copy to Clipboard** - Easy sharing of temporary email addresses
- [ ] **Multiple Inbox Management** - Handle multiple temporary emails
- [ ] **Email Forwarding** - Forward important emails to real address
- [ ] **Custom Expiry Times** - Choose 1hr, 6hr, 24hr, or 7 days
- [ ] **Email Search & Filter** - Find specific emails quickly
- [ ] **Dark/Light Mode** - Theme switcher for user preference
- [ ] **API Integration** - RESTful API for developers
- [ ] **Rate Limiting** - Prevent abuse and spam
- [ ] **Analytics Dashboard** - Usage statistics and insights

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Modern utility-first styling
- **Heroicons/Lucide** - Beautiful SVG icons

### Backend
- **Supabase** - PostgreSQL database with real-time subscriptions
- **Next.js API Routes** - Server-side functionality
- **WebSocket/Server-Sent Events** - Real-time updates via Supabase
- **Row Level Security** - Secure data access with Supabase RLS
- **Email Processing** - SMTP server integration (planned)

### DevOps & Deployment
- **Vercel** - Primary deployment platform
- **GitHub Actions** - CI/CD pipeline
- **ESLint & Prettier** - Code quality and formatting

## 🏁 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- Supabase account (free tier available)

### Installation
```bash
# Clone the repository
git clone https://github.com/AryasKale/onetime.git
cd my-nextjs-app

# Install dependencies
npm install

# Install Supabase client
npm install @supabase/supabase-js

# Create environment variables file
cp .env.local.example .env.local
# Then edit .env.local with your Supabase credentials
```

### Supabase Setup
1. Create a new project at [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Go to Settings > API in your project dashboard
3. Copy your Project URL and anon/public key
4. Create a `.env.local` file in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

5. **Create Database Tables**: In Supabase SQL Editor, run `database/00_complete_setup.sql`
6. **Enable Real-time Updates**: In Supabase SQL Editor, run `database/05_enable_realtime.sql`

### Development
```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
my-nextjs-app/
├── app/
│   ├── page.tsx          # Home page with landing interface
│   ├── layout.tsx        # Root layout component
│   ├── globals.css       # Global styles and Tailwind imports
│   └── favicon.ico       # App favicon
├── lib/
│   └── supabaseClient.ts # Supabase client configuration
├── public/               # Static assets
├── .env.local            # Environment variables (not in repo)
├── next.config.ts        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🗂️ Development Progress

### Phase 1: Foundation ✅ (Completed)
- [x] Project setup with Next.js 15 + TypeScript
- [x] Tailwind CSS v4 integration
- [x] Landing page design and implementation
- [x] Responsive layout with modern UI components
- [x] Supabase client setup with TypeScript types
- [x] Environment variables configuration
- [x] Project documentation and README

### Phase 2: Core Functionality 🔄 (In Progress)
- [ ] Email generation system
- [ ] Inbox page and routing
- [ ] Basic CRUD operations for emails
- [ ] Temporary email validation
- [ ] Copy-to-clipboard functionality

### Phase 3: Real-time Features 📋 (Planned)
- [ ] WebSocket integration for live updates
- [ ] Real-time email notifications
- [ ] Auto-refresh inbox
- [ ] Email status indicators

### Phase 4: Advanced Features 📋 (Planned)
- [ ] Email forwarding system
- [ ] Custom expiry time selection
- [ ] Multiple inbox management
- [ ] Search and filter functionality
- [ ] Email attachments support

### Phase 5: Polish & Deploy 📋 (Planned)
- [ ] Performance optimization
- [ ] SEO improvements
- [ ] Error handling and user feedback
- [ ] Production deployment
- [ ] Analytics and monitoring

## 🎯 Current Sprint Goals

### Week 1: Foundation & UI
- ✅ Set up modern Next.js application
- ✅ Create beautiful landing page
- ✅ Implement responsive design
- 🔄 Build inbox generation functionality

### Week 2: Core Features
- [ ] Email generation and validation
- [ ] Inbox page with email list
- [ ] Email detail view
- [ ] Basic email operations

## 🤝 Contributing

This is a learning project built step-by-step. Contributions, suggestions, and feedback are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Demo**: Coming soon...
- **GitHub Repository**: [https://github.com/AryasKale/onetime](https://github.com/AryasKale/onetime)
- **Developer**: [Arya Kale](https://github.com/AryasKale)

---

**Last Updated**: December 2024  
**Version**: 0.1.0 (Development)

> 💡 This project is being built incrementally. Check back regularly for updates and new features!
