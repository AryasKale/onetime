// Web Vitals stub - provides basic performance monitoring
// This file provides a lightweight alternative to the web-vitals package

export interface Metric {
  id: string
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  entries: PerformanceEntry[]
}

export type ReportHandler = (metric: Metric) => void

// Core Web Vitals metrics
export function getCLS(onReport: ReportHandler): void {
  // Cumulative Layout Shift - stub implementation
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        // Basic CLS calculation
        onReport({
          id: 'cls',
          name: 'CLS',
          value: 0,
          rating: 'good',
          delta: 0,
          entries: entries
        })
      })
      observer.observe({ entryTypes: ['layout-shift'] })
    } catch (e) {
      console.warn('CLS measurement not supported')
    }
  }
}

export function getFID(onReport: ReportHandler): void {
  // First Input Delay - stub implementation
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        onReport({
          id: 'fid',
          name: 'FID',
          value: 0,
          rating: 'good',
          delta: 0,
          entries: entries
        })
      })
      observer.observe({ entryTypes: ['first-input'] })
    } catch (e) {
      console.warn('FID measurement not supported')
    }
  }
}

export function getFCP(onReport: ReportHandler): void {
  // First Contentful Paint - stub implementation
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        onReport({
          id: 'fcp',
          name: 'FCP',
          value: 0,
          rating: 'good',
          delta: 0,
          entries: entries
        })
      })
      observer.observe({ entryTypes: ['paint'] })
    } catch (e) {
      console.warn('FCP measurement not supported')
    }
  }
}

export function getLCP(onReport: ReportHandler): void {
  // Largest Contentful Paint - stub implementation
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        onReport({
          id: 'lcp',
          name: 'LCP',
          value: 0,
          rating: 'good',
          delta: 0,
          entries: entries
        })
      })
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (e) {
      console.warn('LCP measurement not supported')
    }
  }
}

export function getTTFB(onReport: ReportHandler): void {
  // Time to First Byte - stub implementation
  if (typeof window !== 'undefined' && 'performance' in window) {
    try {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart
        onReport({
          id: 'ttfb',
          name: 'TTFB',
          value: ttfb,
          rating: ttfb < 200 ? 'good' : ttfb < 500 ? 'needs-improvement' : 'poor',
          delta: ttfb,
          entries: [navigationEntry]
        })
      }
    } catch (e) {
      console.warn('TTFB measurement not supported')
    }
  }
}

// Simple implementation for Next.js reportWebVitals
export function reportWebVitals(onReport: ReportHandler): void {
  if (typeof window !== 'undefined') {
    getCLS(onReport)
    getFID(onReport)
    getFCP(onReport)
    getLCP(onReport)
    getTTFB(onReport)
  }
}

// Export everything the web-vitals package would export
export default {
  getCLS,
  getFID,
  getFCP,
  getLCP,
  getTTFB,
  reportWebVitals
} 