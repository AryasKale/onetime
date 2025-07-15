'use client'

import { useEffect, useState } from 'react'

interface VitalsMetric {
  id: string
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  entries: PerformanceEntry[]
}

function sendToAnalytics(metric: VitalsMetric) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      custom_parameter_1: metric.rating,
      non_interaction: true,
    })
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric.name, metric.value, metric.rating)
  }
}

// Native Core Web Vitals implementation - NO EXTERNAL PACKAGES
function observeCLS(callback: (metric: VitalsMetric) => void) {
  if (!('PerformanceObserver' in window)) return
  
  let clsValue = 0
  let clsEntries: PerformanceEntry[] = []
  
  try {
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
  } catch (error) {
    console.warn('CLS observation failed:', error)
  }
}

function observeFCP(callback: (metric: VitalsMetric) => void) {
  if (!('PerformanceObserver' in window)) return
  
  try {
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
  } catch (error) {
    console.warn('FCP observation failed:', error)
  }
}

function observeLCP(callback: (metric: VitalsMetric) => void) {
  if (!('PerformanceObserver' in window)) return
  
  try {
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
  } catch (error) {
    console.warn('LCP observation failed:', error)
  }
}

function observeTTFB(callback: (metric: VitalsMetric) => void) {
  if (!('performance' in window) || !('timing' in performance)) return
  
  try {
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
  } catch (error) {
    console.warn('TTFB observation failed:', error)
  }
}

export default function WebVitals() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return
    
    // Track Core Web Vitals with native implementations - NO WEB-VITALS PACKAGE
    observeCLS(sendToAnalytics)
    observeFCP(sendToAnalytics)
    observeLCP(sendToAnalytics)
    observeTTFB(sendToAnalytics)
    
    // Track custom performance metrics
    if ('performance' in window) {
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
  }, [mounted])

  return null
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
} 