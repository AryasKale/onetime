'use client'

import { useEffect, useState } from 'react'

type ConsentState = 'unknown' | 'granted' | 'denied'

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = localStorage.getItem('cmp_consent_v2')
    if (!stored) {
      setVisible(true)
    }
  }, [])

  const updateConsent = (analytics: ConsentState, ads: ConsentState) => {
    if (typeof window === 'undefined') return
    const granted = analytics === 'granted' && ads === 'granted'
    try {
      // Persist a minimal flag
      localStorage.setItem('cmp_consent_v2', JSON.stringify({ analytics, ads }))
    } catch {}

    // Update Google Consent Mode v2
    ;(window as any).dataLayer = (window as any).dataLayer || []
    const gtag = (...args: any[]) => { ;(window as any).dataLayer.push(args) }
    gtag('consent', 'update', {
      analytics_storage: analytics,
      ad_storage: ads,
      ad_user_data: ads,
      ad_personalization: 'denied',
    })

    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-3xl m-4 rounded-xl border border-gray-200 bg-white shadow-xl p-4">
        <h2 className="text-sm font-semibold text-gray-900">Privacy choices</h2>
        <p className="text-sm text-gray-600 mt-1">
          We use privacy-safe analytics and ads (Consent Mode v2). Choose how your data is used. You can change this later from the footer link.
        </p>
        <div className="mt-3 flex gap-2 justify-end">
          <button
            onClick={() => updateConsent('denied', 'denied')}
            className="px-3 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Reject all
          </button>
          <button
            onClick={() => updateConsent('granted', 'denied')}
            className="px-3 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Allow analytics only
          </button>
          <button
            onClick={() => updateConsent('granted', 'granted')}
            className="px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Allow all
          </button>
        </div>
      </div>
    </div>
  )
}


