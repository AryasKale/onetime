'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

interface GoogleAdSenseProps {
  publisherId?: string
}

export default function GoogleAdSense({ publisherId = 'ca-pub-5173629853652958' }: GoogleAdSenseProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render in development or before mounting
  if (process.env.NODE_ENV !== 'production' || !mounted) {
    return null
  }

  return (
    <>
      {/* AMP Auto Ads Script - loads the amp-auto-ads library */}
      <Script
        async
        custom-element="amp-auto-ads"
        src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
        strategy="afterInteractive"
      />
      
      {/* AMP Auto Ads Component - placed after body tag */}
      <amp-auto-ads
        type="adsense"
        data-ad-client={publisherId}
      />
    </>
  )
}

// Helper function to manually trigger ad refresh if needed
export const refreshAds = () => {
  if (typeof window !== 'undefined' && window.adsbygoogle) {
    try {
      window.adsbygoogle.push({})
    } catch (error) {
      console.warn('AdSense refresh failed:', error)
    }
  }
}

// Declare global adsbygoogle for TypeScript
declare global {
  interface Window {
    adsbygoogle?: any[]
  }
}
