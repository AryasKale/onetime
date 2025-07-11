'use client'

import { useEffect } from 'react'

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

// Native Core Web Vitals implementation
function observeCLS(callback: (metric: VitalsMetric) => void) {
  if (!('PerformanceObserver' in window)) return
  
  let clsValue = 0
  let clsEntries: PerformanceEntry[] = []
  
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if ((entry as any).hadRecentInput) continue
      clsValue += (entry as any).value
      clsEntries.push(entry)
    }
    
    callback({
      id: 'cls',
      name: 'CLS',
      value: clsValue,
      rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor',
      delta: clsValue,
      entries: clsEntries
    })
  }).observe({ type: 'layout-shift', buffered: true })
}

function observeFCP(callback: (metric: VitalsMetric) => void) {
  if (!('PerformanceObserver' in window)) return
  
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        callback({
          id: 'fcp',
          name: 'FCP',
          value: entry.startTime,
          rating: entry.startTime < 1800 ? 'good' : entry.startTime < 3000 ? 'needs-improvement' : 'poor',
          delta: entry.startTime,
          entries: [entry]
        })
      }
    }
  }).observe({ type: 'paint', buffered: true })
}

function observeLCP(callback: (metric: VitalsMetric) => void) {
  if (!('PerformanceObserver' in window)) return
  
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries()
    const lastEntry = entries[entries.length - 1]
    
    callback({
      id: 'lcp',
      name: 'LCP', 
      value: lastEntry.startTime,
      rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor',
      delta: lastEntry.startTime,
      entries: [lastEntry]
    })
  }).observe({ type: 'largest-contentful-paint', buffered: true })
}

function observeTTFB(callback: (metric: VitalsMetric) => void) {
  if (!('performance' in window) || !('timing' in performance)) return
  
  window.addEventListener('load', () => {
    const { responseStart, navigationStart } = performance.timing
    const ttfb = responseStart - navigationStart
    
    callback({
      id: 'ttfb',
      name: 'TTFB',
      value: ttfb,
      rating: ttfb < 800 ? 'good' : ttfb < 1800 ? 'needs-improvement' : 'poor',
      delta: ttfb,
      entries: []
    })
  })
}

export default function WebVitals() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Track Core Web Vitals with native implementations
    observeCLS(sendToAnalytics)
    observeFCP(sendToAnalytics)
    observeLCP(sendToAnalytics)
    observeTTFB(sendToAnalytics)
    
    // Track custom performance metrics
    if ('performance' in window) {
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