import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AdvancedSEO, { generateAdvancedViewport } from "./components/AdvancedSEO";
import Footer from "./components/Footer";

// Optimize font loading with display swap for better performance
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: 'OneTimeEmail - Temporary Email Service',
    template: '%s | OneTimeEmail'
  },
  description: 'Generate temporary email addresses instantly. Secure, private, and free disposable email service for online registrations and testing.',
  keywords: ['temporary email', 'disposable email', 'fake email', 'email generator', 'private email', 'temp email', 'anonymous email'],
  authors: [{ name: 'OneTimeEmail' }],
  creator: 'OneTimeEmail',
  publisher: 'OneTimeEmail',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://onetimeemail.net',
    title: 'OneTimeEmail - Temporary Email Service',
    description: 'Generate temporary email addresses instantly. Secure, private, and free disposable email service.',
    siteName: 'OneTimeEmail',
    images: [
      {
        url: 'https://onetimeemail.net/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OneTimeEmail - Temporary Email Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OneTimeEmail - Temporary Email Service',
    description: 'Generate temporary email addresses instantly. Secure, private, and free.',
    images: ['https://onetimeemail.net/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://onetimeemail.net',
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
  // iOS-specific meta tags
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'OneTimeEmail',
  },
  formatDetection: {
    telephone: false,
  },
};

// iOS-optimized viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // iOS-specific viewport settings
  viewportFit: 'cover',
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <AdvancedSEO />
        {/* iOS Safari specific meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="OneTimeEmail" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* DNS prefetch for improved performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* iOS Safari icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Prevent iOS Safari from auto-detecting phone numbers */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="date=no" />
        <meta name="format-detection" content="address=no" />
        <meta name="format-detection" content="email=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white flex flex-col safe-area-padding`}
        style={{
          // iOS Safari body fixes
          WebkitTextSizeAdjust: '100%',
          WebkitFontSmoothing: 'antialiased',
          textRendering: 'optimizeLegibility',
        }}
      >
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
