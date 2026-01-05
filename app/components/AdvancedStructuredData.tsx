import React from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface HowToStep {
  name: string
  text: string
  image?: string
}

interface ArticleAuthor {
  name: string
  jobTitle: string
  description: string
  url?: string
}

interface AdvancedStructuredDataProps {
  type: 'faq' | 'howto' | 'article' | 'organization' | 'course' | 'qa'
  data: any
}

export function FAQStructuredData({ faqs }: { faqs: FAQItem[] }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  )
}

export function HowToStructuredData({ 
  name, 
  description, 
  steps, 
  totalTime,
  estimatedCost 
}: { 
  name: string
  description: string
  steps: HowToStep[]
  totalTime?: string
  estimatedCost?: string
}) {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "totalTime": totalTime,
    "estimatedCost": estimatedCost,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "image": step.image
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
    />
  )
}

export function ArticleStructuredData({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url,
  wordCount,
  keywords
}: {
  headline: string
  description: string
  author: ArticleAuthor
  datePublished: string
  dateModified?: string
  image?: string
  url: string
  wordCount?: number
  keywords?: string[]
}) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "image": image || "https://onetimeemail.net/og-image.jpg",
    "author": {
      "@type": "Person",
      "name": author.name,
      "jobTitle": author.jobTitle,
      "description": author.description,
      "url": author.url,
      "worksFor": {
        "@type": "Organization",
        "name": "OneTimeEmail",
        "url": "https://onetimeemail.net"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "OneTimeEmail",
      "url": "https://onetimeemail.net",
      "logo": {
        "@type": "ImageObject",
        "url": "https://onetimeemail.net/icon-512.png"
      }
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "wordCount": wordCount,
    "keywords": keywords,
    "articleSection": "Privacy & Security",
    "inLanguage": "en-US"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  )
}

export function OrganizationStructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OneTimeEmail",
    "alternateName": "OneTimeEmail Privacy Platform",
    "url": "https://onetimeemail.net",
    "logo": "https://onetimeemail.net/icon-512.png",
    "description": "Leading privacy education platform and temporary email service provider. Expert-driven content and tools for digital privacy protection.",
    "foundingDate": "2024",
    "founders": [
      {
        "@type": "Person",
        "name": "Dr. Sarah Richardson",
        "jobTitle": "Lead Cybersecurity Researcher"
      }
    ],
    "employee": [
      {
        "@type": "Person",
        "name": "Dr. Sarah Richardson",
        "jobTitle": "Lead Cybersecurity Researcher",
        "alumniOf": "Stanford University"
      },
      {
        "@type": "Person",
        "name": "Michael Chen",
        "jobTitle": "Privacy Law Expert",
        "alumniOf": "Harvard Law School"
      },
      {
        "@type": "Person",
        "name": "Alex Kumar",
        "jobTitle": "Security Architect",
        "alumniOf": "MIT"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": "https://onetimeemail.net/contact"
    },
    "sameAs": [
      "https://twitter.com/onetimeemail",
      "https://linkedin.com/company/onetimeemail"
    ],
    "knowsAbout": [
      "Email Privacy",
      "Digital Security",
      "Cybersecurity",
      "Data Protection",
      "Privacy Law",
      "Encryption",
      "Anonymous Communication"
    ],
    "areaServed": "Worldwide",
    "serviceType": [
      "Privacy Education",
      "Security Training",
      "Temporary Email Services",
      "Privacy Consulting"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  )
}

export function CourseStructuredData({
  name,
  description,
  provider,
  instructor,
  courseMode,
  duration,
  skillLevel,
  learningOutcomes,
  price
}: {
  name: string
  description: string
  provider: string
  instructor: ArticleAuthor
  courseMode: string
  duration: string
  skillLevel: string
  learningOutcomes: string[]
  price?: string
}) {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "url": "https://onetimeemail.net"
    },
    "instructor": {
      "@type": "Person",
      "name": instructor.name,
      "jobTitle": instructor.jobTitle,
      "description": instructor.description
    },
    "courseMode": courseMode,
    "timeRequired": duration,
    "skillLevel": skillLevel,
    "learningResourceType": "Course",
    "educationalLevel": skillLevel,
    "teaches": learningOutcomes,
    "inLanguage": "en-US",
    "isAccessibleForFree": price ? false : true,
    "offers": price ? {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "USD"
    } : undefined
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
    />
  )
}

export function QAStructuredData({
  questions
}: {
  questions: Array<{
    question: string
    answer: string
    author: string
    dateCreated: string
    upvotes?: number
  }>
}) {
  const qaSchema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    "mainEntity": questions.map(qa => ({
      "@type": "Question",
      "name": qa.question,
      "text": qa.question,
      "dateCreated": qa.dateCreated,
      "author": {
        "@type": "Person",
        "name": qa.author
      },
      "upvoteCount": qa.upvotes || 0,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": qa.answer,
        "dateCreated": qa.dateCreated,
        "upvoteCount": qa.upvotes || 0,
        "author": {
          "@type": "Person",
          "name": "OneTimeEmail Expert Team"
        }
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(qaSchema) }}
    />
  )
}

export function BreadcrumbStructuredData({
  items
}: {
  items: Array<{
    name: string
    url: string
  }>
}) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  )
}

export function WebsiteStructuredData() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "OneTimeEmail",
    "alternateName": "OneTimeEmail Privacy Platform",
    "url": "https://onetimeemail.net",
    "description": "The world's most comprehensive email privacy education platform, featuring expert guides, professional techniques, and practical tools for digital protection.",
    "inLanguage": "en-US",
    "copyrightYear": "2024",
    "copyrightHolder": {
      "@type": "Organization",
      "name": "OneTimeEmail"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://onetimeemail.net/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "OneTimeEmail"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  )
}

export default function AdvancedStructuredData({ type, data }: AdvancedStructuredDataProps) {
  switch (type) {
    case 'faq':
      return <FAQStructuredData faqs={data.faqs} />
    case 'howto':
      return <HowToStructuredData {...data} />
    case 'article':
      return <ArticleStructuredData {...data} />
    case 'organization':
      return <OrganizationStructuredData />
    case 'course':
      return <CourseStructuredData {...data} />
    case 'qa':
      return <QAStructuredData questions={data.questions} />
    default:
      return null
  }
}
