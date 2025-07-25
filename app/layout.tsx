import type { Metadata, Viewport } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import GoogleAnalytics from "./components/GoogleAnalytics";

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
      </head>
      <body className="min-h-screen bg-white flex flex-col font-sans antialiased">
        <GoogleAnalytics GA_MEASUREMENT_ID="G-DCD15YJ0R5" />
        <main className="flex-grow">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
