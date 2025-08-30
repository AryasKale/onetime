import { Metadata } from 'next'

interface StructuredDataProps {
  type: 'website' | 'article' | 'faq' | 'contact' | 'organization'
  data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type === 'website' ? 'WebSite' : type.charAt(0).toUpperCase() + type.slice(1),
      name: 'OneTimeEmail',
      url: 'https://onetimeemail.net',
      description: 'Secure anonymous email service with automatic data deletion and zero tracking for maximum digital privacy',
    }

    switch (type) {
      case 'website':
        return {
          ...baseData,
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://onetimeemail.net/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
          publisher: {
            '@type': 'Organization',
            name: 'OneTimeEmail',
            logo: {
              '@type': 'ImageObject',
              url: 'https://onetimeemail.net/logo.png',
            },
          },
        }

      case 'organization':
        return {
          ...baseData,
          '@type': 'Organization',
          logo: 'https://onetimeemail.net/logo.png',
          sameAs: [
            'https://onetimeemail.net',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '',
            contactType: 'customer service',
            email: 'onetimeemailsaas@gmail.com',
            availableLanguage: 'English',
          },
          foundingDate: '2024',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'US',
          },
        }

      case 'contact':
        return {
          ...baseData,
          '@type': 'ContactPage',
          mainEntity: {
            '@type': 'Organization',
            name: 'OneTimeEmail',
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              email: 'onetimeemailsaas@gmail.com',
              url: 'https://onetimeemail.net/contact',
            },
          },
        }

      case 'article':
        return {
          ...baseData,
          '@type': 'Article',
          headline: data.title || 'OneTimeEmail Guide',
          author: {
            '@type': 'Organization',
            name: 'OneTimeEmail',
          },
          publisher: {
            '@type': 'Organization',
            name: 'OneTimeEmail',
          },
          datePublished: data.datePublished || new Date().toISOString(),
          dateModified: data.dateModified || new Date().toISOString(),
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url || 'https://onetimeemail.net',
          },
        }

      default:
        return baseData
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData(), null, 2),
      }}
    />
  )
}

// FAQ Structured Data Component
export function FAQStructuredData({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData, null, 2),
      }}
    />
  )
}

// Service Structured Data Component
export function ServiceStructuredData() {
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'OneTimeEmail',
    description: 'Free temporary email service for privacy protection and spam prevention',
    provider: {
      '@type': 'Organization',
      name: 'OneTimeEmail',
      url: 'https://onetimeemail.net',
    },
    serviceType: 'Email Service',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Temporary Email Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Temporary Email Generation',
            description: 'Generate disposable email addresses instantly',
          },
          price: '0',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Privacy Protection',
            description: 'Complete privacy protection with automatic data deletion',
          },
          price: '0',
          priceCurrency: 'USD',
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceData, null, 2),
      }}
    />
  )
}
