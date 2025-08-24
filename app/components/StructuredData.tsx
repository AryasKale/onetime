'use client'

import { useState, useEffect } from 'react'

// Structured Data for SEO - JSON-LD Schema
export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "OneTimeEmail",
    "alternateName": "Free Email Generator",
    "description": "Free email generator for creating temporary and disposable email addresses. Generate fake emails instantly for verification, privacy protection, and spam prevention.",
    "url": "https://onetimeemail.net",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1247",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "Generate temporary email addresses instantly",
      "Auto-delete after 10 minutes",
      "No registration required",
      "Receive emails in real-time",
      "Privacy protection",
      "Spam prevention",
      "Free to use",
      "Works across all browser tabs"
    ],
    "creator": {
      "@type": "Organization",
      "name": "OneTimeEmail",
      "url": "https://onetimeemail.net"
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "keywords": "email generator, temporary email, disposable email, fake email generator, temp mail, throwaway email, anonymous email",
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does the email generator work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our email generator creates temporary email addresses instantly. Simply click 'Generate Email' and you'll receive a disposable email address that automatically expires after 10 minutes."
          }
        },
        {
          "@type": "Question", 
          "name": "Is the temporary email service free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, OneTimeEmail is completely free to use. There are no registration requirements or hidden fees."
          }
        },
        {
          "@type": "Question",
          "name": "How long do temporary emails last?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Generated email addresses automatically expire and self-destruct after 10 minutes for maximum privacy and security."
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 
