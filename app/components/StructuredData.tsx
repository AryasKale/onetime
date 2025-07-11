'use client'

import { useState, useEffect } from 'react'

export default function StructuredData() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "OneTimeEmail",
    "description": "Generate temporary email addresses instantly. Secure, private, and free disposable email service.",
    "url": "https://onetimeemail.net",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "author": {
      "@type": "Organization",
      "name": "OneTimeEmail",
      "url": "https://onetimeemail.net"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1000",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "Generate temporary email addresses",
      "Secure and private",
      "No registration required",
      "Auto-expiring emails",
      "Spam protection",
      "Mobile friendly"
    ],
    "screenshot": "https://onetimeemail.net/screenshot.jpg",
    "softwareVersion": "1.0",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 