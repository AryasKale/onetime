'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

interface GoogleAnalyticsProps {
  GA_MEASUREMENT_ID?: string
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID = 'G-DCD15YJ0R5' }: GoogleAnalyticsProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Only load after mounting (works in any environment)
    if (!mounted) {
      return
    }

    // Initialize Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('js', new Date())
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true,
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        ads_data_redaction: true,
        cookie_flags: 'max-age=7200;secure;samesite=none',
        use_amp_client_id: false,
        restricted_data_processing: true,
        store_gac: false,
        debug_mode: process.env.NODE_ENV === 'development' // Enable debug in development
      })

      // Track custom events
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
      })
    }
  }, [GA_MEASUREMENT_ID, mounted])

  // Don't render before mounting
  if (!mounted) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false,
              ads_data_redaction: true,
              cookie_flags: 'max-age=7200;secure;samesite=none',
              use_amp_client_id: false,
              restricted_data_processing: true,
              store_gac: false,
              debug_mode: ${process.env.NODE_ENV === 'development'}
            });
          `,
        }}
      />
    </>
  )
}

// Helper functions for custom event tracking
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

export const trackEmailGeneration = (emailId: string) => {
  trackEvent('email_generated', {
    event_category: 'engagement',
    event_label: 'temporary_email',
    value: 1,
    email_id: emailId
  })
}

export const trackPageCategory = (category: string) => {
  trackEvent('page_category', {
    event_category: 'navigation',
    event_label: category,
    custom_parameter_1: category
  })
}

export const trackUserEngagement = (action: string, label?: string) => {
  trackEvent('user_engagement', {
    event_category: 'engagement',
    event_label: label || action,
    engagement_time_msec: Date.now()
  })
}

// Declare global gtag function
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
} 
