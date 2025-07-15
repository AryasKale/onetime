// Type declarations for web-vitals
// This file provides type definitions without requiring the actual web-vitals package

declare module 'web-vitals' {
  interface Metric {
    id: string
    name: string
    value: number
    rating: 'good' | 'needs-improvement' | 'poor'
    delta: number
    entries: PerformanceEntry[]
  }

  export type ReportHandler = (metric: Metric) => void

  export function getCLS(onReport?: ReportHandler): void
  export function getFCP(onReport?: ReportHandler): void
  export function getFID(onReport?: ReportHandler): void
  export function getLCP(onReport?: ReportHandler): void
  export function getTTFB(onReport?: ReportHandler): void
  export function getINP(onReport?: ReportHandler): void
} 