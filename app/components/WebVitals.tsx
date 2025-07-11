'use client'

import { useEffect } from 'react'

interface SimpleMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
}

function sendToAnalytics(metric: SimpleMetric) {
  // Send to analytics service (replace with your preferred service)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Performance',
      value: Math.round(metric.value),
      custom_parameter_1: metric.rating,
      non_interaction: true,
    })
  }
  
  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Performance Metric:', metric.name, metric.value, metric.rating)
  }
}

export default function WebVitals() {
  useEffect(() => {
    // Track basic performance metrics without external dependencies
    if (typeof window !== 'undefined' && 'performance' in window) {
      
      // Track page load time
      const trackPageLoad = () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.fetchStart
          sendToAnalytics({
            name: 'Page Load Time',
            value: loadTime,
            rating: loadTime < 2000 ? 'good' : loadTime < 4000 ? 'needs-improvement' : 'poor'
          })
        }
      }

      // Track First Contentful Paint
      const trackFCP = () => {
        const paintEntries = performance.getEntriesByType('paint')
        const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint')
        if (fcpEntry) {
          sendToAnalytics({
            name: 'First Contentful Paint',
            value: fcpEntry.startTime,
            rating: fcpEntry.startTime < 1800 ? 'good' : fcpEntry.startTime < 3000 ? 'needs-improvement' : 'poor'
          })
        }
      }

      // Track Largest Contentful Paint using PerformanceObserver
      const trackLCP = () => {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            sendToAnalytics({
              name: 'Largest Contentful Paint',
              value: lastEntry.startTime,
              rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor'
            })
          })
          observer.observe({ entryTypes: ['largest-contentful-paint'] })
        } catch (e) {
          // PerformanceObserver not supported
        }
      }

      // Run measurements when page is loaded
      if (document.readyState === 'complete') {
        trackPageLoad()
        trackFCP()
        trackLCP()
      } else {
        window.addEventListener('load', () => {
          trackPageLoad()
          trackFCP()
          trackLCP()
        })
      }
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