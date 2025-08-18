import type { Metadata, Viewport } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import GoogleAnalytics from "./components/GoogleAnalytics";
import GoogleAdSense from "./components/GoogleAdSense";

// Simplified, iOS-safe metadata
export const metadata: Metadata = {
  title: 'OneTimeEmail - Temporary Email Service',
  description: 'Generate temporary email addresses instantly. Secure, private, and free disposable email service.',
  keywords: ['temporary email', 'disposable email', 'fake email', 'email generator'],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'OneTimeEmail - Temporary Email Service',
    description: 'Generate temporary email addresses instantly. Secure, private, and free.',
    url: 'https://onetimeemail.net',
    type: 'website',
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
        
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://cdn.ampproject.org" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://cdn.ampproject.org" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
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
