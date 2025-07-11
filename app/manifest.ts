import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OneTimeEmail - Temporary Email Service',
    short_name: 'OneTimeEmail',
    description: 'Generate temporary email addresses instantly. Secure, private, and free disposable email service.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en-US',
    dir: 'ltr',
    categories: ['utilities', 'productivity', 'privacy'],
    screenshots: [
      {
        src: '/screenshots/desktop-1.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Desktop view of OneTimeEmail service'
      },
      {
        src: '/screenshots/mobile-1.png',
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Mobile view of OneTimeEmail service'
      }
    ],
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16 32x32',
        type: 'image/x-icon'
      }
    ],
    shortcuts: [
      {
        name: 'Generate Email',
        short_name: 'Generate',
        description: 'Quickly generate a new temporary email',
        url: '/?action=generate'
      },
      {
        name: 'How It Works',
        short_name: 'Guide',
        description: 'Learn how to use temporary emails',
        url: '/how-it-works'
      }
    ],
    related_applications: [],
    prefer_related_applications: false
  }
} 