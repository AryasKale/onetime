'use client'

import { useEffect } from 'react'
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

interface VitalsMetric {
  id: string
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  entries: PerformanceEntry[]
}

function sendToAnalytics(metric: VitalsMetric) {
  // Send to analytics service (replace with your preferred service)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      custom_parameter_1: metric.rating,
      non_interaction: true,
    })
  }
  
  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric.name, metric.value, metric.rating)
  }
}

export default function WebVitals() {
  useEffect(() => {
    // Track all Core Web Vitals
    getCLS(sendToAnalytics)
    getFID(sendToAnalytics)
    getFCP(sendToAnalytics)
    getLCP(sendToAnalytics)
    getTTFB(sendToAnalytics)
    
    // Track custom performance metrics
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Track page load time
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
        sendToAnalytics({
          id: 'page-load-time',
          name: 'Page Load Time',
          value: loadTime,
          rating: loadTime < 2000 ? 'good' : loadTime < 4000 ? 'needs-improvement' : 'poor',
          delta: 0,
          entries: []
        })
      })
      
      // Track DOM content loaded
      document.addEventListener('DOMContentLoaded', () => {
        const domTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart
        sendToAnalytics({
          id: 'dom-content-loaded',
          name: 'DOM Content Loaded',
          value: domTime,
          rating: domTime < 1000 ? 'good' : domTime < 2000 ? 'needs-improvement' : 'poor',
          delta: 0,
          entries: []
        })
      })
    }
  }, [])

  return null // This component doesn't render anything
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
} 