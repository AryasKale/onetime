// Stub implementation of web-vitals for development
// This provides empty functions to prevent runtime errors

interface Metric {
  id: string
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  entries: PerformanceEntry[]
}

export type ReportHandler = (metric: Metric) => void

// Stub functions - these don't do anything but prevent import errors
export function getCLS(onReport?: ReportHandler): void {
  // No-op stub
}

export function getFCP(onReport?: ReportHandler): void {
  // No-op stub
}

export function getFID(onReport?: ReportHandler): void {
  // No-op stub
}

export function getLCP(onReport?: ReportHandler): void {
  // No-op stub
}

export function getTTFB(onReport?: ReportHandler): void {
  // No-op stub
}

export function getINP(onReport?: ReportHandler): void {
  // No-op stub
}

// Default export for compatibility
export default {
  getCLS,
  getFCP,
  getFID,
  getLCP,
  getTTFB,
  getINP
} 