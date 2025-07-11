// Additional Schema.org structured data for SEO optimization
export const footerStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://onetimeemail.net/#website",
      "url": "https://onetimeemail.net",
      "name": "OneTimeEmail",
      "description": "Free temporary email service for privacy protection and spam prevention",
      "inLanguage": "en-US",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://onetimeemail.net/?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "SiteNavigationElement",
      "@id": "https://onetimeemail.net/#navigation",
      "name": "Main Navigation",
      "url": "https://onetimeemail.net"
    },
    {
      "@type": "ContactPage",
      "@id": "https://onetimeemail.net/contact",
      "url": "https://onetimeemail.net/contact",
      "name": "Contact OneTimeEmail",
      "description": "Get in touch with OneTimeEmail support team"
    },
    {
      "@type": "AboutPage", 
      "@id": "https://onetimeemail.net/about",
      "url": "https://onetimeemail.net/about",
      "name": "About OneTimeEmail",
      "description": "Learn about OneTimeEmail's mission to protect privacy through secure temporary email services"
    }
  ]
}

export const siteLinksSearchBoxSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://onetimeemail.net/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint", 
      "urlTemplate": "https://onetimeemail.net/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
} 