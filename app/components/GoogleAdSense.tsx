'use client'

import { useEffect, useState } from 'react'

interface GoogleAdSenseProps {
  adSlotId?: string
}

// Non-AMP AdSense: renders a responsive ad unit after consent
export default function GoogleAdSense({ adSlotId }: GoogleAdSenseProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || process.env.NODE_ENV !== 'production') return
    if (typeof window === 'undefined') return
    if (!(window as any).adsbygoogle) {
      ;(window as any).adsbygoogle = []
    }
    try {
      ;(window as any).adsbygoogle.push({})
    } catch (e) {
      // ignore
    }
  }, [mounted])

  if (process.env.NODE_ENV !== 'production' || !mounted) return null

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-5173629853652958"
      data-ad-slot={adSlotId || ''}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}

// Declare global adsbygoogle for TypeScript
declare global {
  interface Window {
    adsbygoogle?: any[]
  }
}
