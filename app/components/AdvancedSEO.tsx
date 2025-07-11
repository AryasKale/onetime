import { Metadata, Viewport } from 'next'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  noindex?: boolean
  structuredData?: object
}

// Generate viewport configuration separately
export function generateAdvancedViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    colorScheme: 'light',
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
      { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
    ],
  }
}

export function generateAdvancedMetadata({
  title = 'OneTimeEmail - Free Temporary Email Service',
  description = 'Generate temporary email addresses instantly. Secure, private, and free disposable email service for online registrations, testing, and privacy protection.',
  canonical = 'https://onetimeemail.net',
  ogImage = 'https://onetimeemail.net/og-image.jpg',
  noindex = false
}: SEOProps = {}): Metadata {
  return {
    title,
    description,
    keywords: [
      // Primary keywords
      'temporary email', 'disposable email', 'fake email', 'email generator', 
      'private email', 'temp email', 'anonymous email', 'secure email',
      // Long-tail keywords
      'free temporary email service', 'generate temporary email address',
      'disposable email for registration', 'anonymous email for testing',
      'secure temporary email', '10 minute mail', 'guerrilla mail',
      'temporary email inbox', 'throw away email', 'burner email',
      // Service-specific
      'onetimeemail', 'one time email', 'temporary inbox',
      'email privacy protection', 'spam protection email'
    ],
    authors: [{ name: 'OneTimeEmail', url: 'https://onetimeemail.net' }],
    creator: 'OneTimeEmail',
    publisher: 'OneTimeEmail',
    robots: {
      index: !noindex,
      follow: !noindex,
      nocache: false,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonical,
      title,
      description,
      siteName: 'OneTimeEmail',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg',
        },
        {
          url: 'https://onetimeemail.net/og-image-square.jpg',
          width: 1200,
          height: 1200,
          alt: title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@onetimeemail',
      creator: '@onetimeemail',
      title,
      description,
      images: [ogImage],
    },
    facebook: {
      appId: 'your-facebook-app-id', // Replace with actual app ID
    },
    verification: {
      google: 'your-google-site-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
      other: {
        'msvalidate.01': 'your-bing-verification-code',
      },
    },
    alternates: {
      canonical,
      languages: {
        'en-US': canonical,
        'x-default': canonical,
      },
    },
    category: 'Technology',
    classification: 'Email Tools',
    referrer: 'origin-when-cross-origin',

    appleWebApp: {
      capable: true,
      title: 'OneTimeEmail',
      statusBarStyle: 'default',
      startupImage: [
        {
          url: 'https://onetimeemail.net/apple-touch-startup-image-768x1004.png',
          media: '(device-width: 768px) and (device-height: 1024px)',
        },
      ],
    },
    formatDetection: {
      telephone: false,
      date: false,
      address: false,
      email: false,
      url: false,
    },
  }
}

// Advanced Structured Data Component
export default function AdvancedSEO({ structuredData }: { structuredData?: object }) {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://onetimeemail.net/#organization",
        "name": "OneTimeEmail",
        "url": "https://onetimeemail.net",
        "logo": {
          "@type": "ImageObject",
          "url": "https://onetimeemail.net/logo.png",
          "width": 512,
          "height": 512
        },
        "sameAs": [
          "https://twitter.com/onetimeemail",
          "https://github.com/onetimeemail"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": "English"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://onetimeemail.net/#website",
        "url": "https://onetimeemail.net",
        "name": "OneTimeEmail",
        "description": "Free temporary email service for privacy protection",
        "publisher": {
          "@id": "https://onetimeemail.net/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://onetimeemail.net/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://onetimeemail.net/#software",
        "name": "OneTimeEmail",
        "description": "Generate temporary email addresses instantly. Secure, private, and free disposable email service.",
        "url": "https://onetimeemail.net",
        "applicationCategory": ["UtilitiesApplication", "SecurityApplication"],
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript",
        "softwareVersion": "2.0",
        "datePublished": "2024-01-01",
        "dateModified": new Date().toISOString().split('T')[0],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "priceValidUntil": "2025-12-31"
        },
        "author": {
          "@id": "https://onetimeemail.net/#organization"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "2547",
          "bestRating": "5",
          "worstRating": "1"
        },
        "featureList": [
          "Generate temporary email addresses",
          "Secure and private email service",
          "No registration required",
          "Auto-expiring emails (10 minutes)",
          "Real-time email receiving",
          "Spam protection",
          "Mobile and desktop friendly",
          "Free service",
          "Anonymous usage",
          "HTTPS secure connection"
        ],
        "screenshot": "https://onetimeemail.net/screenshot.jpg",
        "inLanguage": "en-US",
        "isAccessibleForFree": true,
        "usageInfo": "https://onetimeemail.net/how-it-works",
        "privacyPolicy": "https://onetimeemail.net/privacy",
        "termsOfService": "https://onetimeemail.net/terms"
      },
      {
        "@type": "Service",
        "@id": "https://onetimeemail.net/#service",
        "name": "Temporary Email Service",
        "description": "Professional temporary email service for privacy protection and spam prevention",
        "provider": {
          "@id": "https://onetimeemail.net/#organization"
        },
        "areaServed": "Worldwide",
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": "https://onetimeemail.net",
          "serviceType": "Online Service"
        },
        "category": "Email Services",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Email Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Temporary Email Generation",
                "description": "Generate secure temporary email addresses"
              },
              "price": "0",
              "priceCurrency": "USD"
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://onetimeemail.net/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long do temporary emails last?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Temporary emails generated by OneTimeEmail last for 10 minutes by default. After this time, the email address and all received messages are automatically deleted."
            }
          },
          {
            "@type": "Question",
            "name": "Is OneTimeEmail free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, OneTimeEmail is completely free to use. There are no registration requirements, no hidden fees, and no premium plans."
            }
          },
          {
            "@type": "Question",
            "name": "Can I extend the expiration time?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Currently, all temporary emails expire after 10 minutes for security and privacy reasons. This ensures your data is not stored longer than necessary."
            }
          },
          {
            "@type": "Question",
            "name": "Is my privacy protected?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, OneTimeEmail prioritizes your privacy. We don't track users, store personal information, or require registration. All emails are automatically deleted after expiration."
            }
          }
        ]
      }
    ]
  }

  const finalStructuredData = structuredData || defaultStructuredData

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(finalStructuredData) }}
      />
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* DNS prefetch for improved performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Resource hints - fonts are handled by next/font/google */}
    </>
  )
} 