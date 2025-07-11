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
};

export const viewport: Viewport = generateAdvancedViewport();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <AdvancedSEO />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* DNS prefetch for improved performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white flex flex-col`}
      >
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
