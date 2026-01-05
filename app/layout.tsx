import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Footer from "./components/Footer";
import GoogleAnalytics from "./components/GoogleAnalytics";
import ClientStructuredData from "./components/ClientStructuredData";
import ConsentBanner from "@/app/components/ConsentBanner";


// Simplified, iOS-safe metadata
export const metadata: Metadata = {
  title: 'Free Email Generator - OneTimeEmail | Temporary & Disposable Email Addresses',
  description: 'Free email generator for temporary and disposable email addresses. Create fake email addresses instantly for verification, privacy protection, and spam prevention. No registration required.',
  keywords: ['email generator', 'temporary email', 'disposable email', 'fake email generator', 'temp mail', 'throwaway email', 'anonymous email', '10 minute email', 'temporary email address', 'disposable email service'],
  metadataBase: new URL('https://onetimeemail.net'),
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
  alternates: {
    canonical: 'https://onetimeemail.net/',
  },
  openGraph: {
    title: 'Free Email Generator - OneTimeEmail | Temporary & Disposable Email Addresses',
    description: 'Free email generator for temporary and disposable email addresses. Create fake email addresses instantly for verification, privacy protection, and spam prevention.',
    url: 'https://onetimeemail.net/',
    type: 'website',
    siteName: 'OneTimeEmail',
    images: [
      {
        url: 'https://onetimeemail.net/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'OneTimeEmail - Free Temporary Email Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@onetimeemail',
    creator: '@onetimeemail',
    title: 'Free Email Generator - OneTimeEmail',
    description: 'Generate temporary and disposable email addresses instantly. Perfect for online registrations, privacy protection, and spam prevention.',
    images: ['https://onetimeemail.net/og-image.jpg'],
  },
};

// Simplified, iOS-safe viewport
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3B82F6',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href="https://onetimeemail.net/" />
        
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="9YY_9vo4jDR0SRq0NSR-uf0mfburPgWcoBimwD5vggY" />
        
        {/* Minimal, iOS-safe meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Google Consent Mode v2 default (runs before any Google tags) */}
        <Script id="gcm-default" strategy="beforeInteractive">{
          `window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('consent', 'default', {
             ad_storage: 'denied',
             analytics_storage: 'granted',
             ad_user_data: 'denied',
             ad_personalization: 'denied',
             functionality_storage: 'granted',
             security_storage: 'granted',
             wait_for_update: 500
           });`
        }</Script>
        
        {/* AdSense - load after interactive to respect consent mode default */}
        <Script
          id="adsbygoogle-src"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5173629853652958"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        
        {/* Enhanced Performance optimizations */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Mobile optimization */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="OneTimeEmail" />
        <meta name="application-name" content="OneTimeEmail" />

        {/* Material Design Icons */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        
        {/* Custom Favicon and Icons */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <meta name="theme-color" content="#3B82F6" />

        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        

      </head>
      <body className="min-h-screen bg-white flex flex-col font-sans antialiased">
        <GoogleAnalytics GA_MEASUREMENT_ID="G-DCD15YJ0R5" />
        <ConsentBanner />
        <ClientStructuredData />
        <main className="flex-grow">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
