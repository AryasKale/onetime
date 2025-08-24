import type { Metadata, Viewport } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import GoogleAnalytics from "./components/GoogleAnalytics";
import GoogleAdSense from "./components/GoogleAdSense";
import StructuredData from "./components/StructuredData";

// Simplified, iOS-safe metadata
export const metadata: Metadata = {
  title: 'Free Email Generator - OneTimeEmail | Temporary & Disposable Email Addresses',
  description: 'Free email generator for temporary and disposable email addresses. Create fake email addresses instantly for verification, privacy protection, and spam prevention. No registration required.',
  keywords: ['email generator', 'temporary email', 'disposable email', 'fake email generator', 'temp mail', 'throwaway email', 'anonymous email', '10 minute email', 'temporary email address', 'disposable email service'],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Free Email Generator - OneTimeEmail | Temporary & Disposable Email Addresses',
    description: 'Free email generator for temporary and disposable email addresses. Create fake email addresses instantly for verification, privacy protection, and spam prevention.',
    url: 'https://onetimeemail.net',
    type: 'website',
    siteName: 'OneTimeEmail',
  },
};

// Simplified, iOS-safe viewport
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Minimal, iOS-safe meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* AdSense verification script - must be in head */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5173629853652958"
          crossOrigin="anonymous"
        />
        
        {/* AMP Auto Ads script - must be in head */}
        <script 
          async 
          custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
        />
        
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://cdn.ampproject.org" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://cdn.ampproject.org" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        
        {/* Structured Data for SEO */}
        <StructuredData />
      </head>
      <body className="min-h-screen bg-white flex flex-col font-sans antialiased">
        <GoogleAnalytics GA_MEASUREMENT_ID="G-DCD15YJ0R5" />
        <GoogleAdSense publisherId="ca-pub-5173629853652958" />
        <main className="flex-grow">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
