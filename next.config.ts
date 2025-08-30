import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: false, // Disabled for faster builds
  productionBrowserSourceMaps: false, // Faster builds, smaller bundles

  // Bundle optimization
  swcMinify: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Build optimization
  experimental: {
    optimizePackageImports: [],
    // Disable CSS optimization to avoid missing 'critters' dependency on this env
    optimizeCss: false,
    scrollRestoration: false, // Faster hydration
    typedRoutes: false, // Faster builds
  },

  // Output optimization
  output: 'standalone',
  generateEtags: false, // Faster builds



  // Optimize JavaScript for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Basic security headers (iOS-compatible)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // HSTS - HTTP Strict Transport Security
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // COOP - Cross-Origin Opener Policy (temporarily disabled for debugging)
          // {
          //   key: 'Cross-Origin-Opener-Policy',
          //   value: 'same-origin',
          // },
          // COEP - Cross-Origin Embedder Policy (temporarily disabled for debugging)
          // {
          //   key: 'Cross-Origin-Embedder-Policy',
          //   value: 'credentialless',
          // },
          // CSP - Content Security Policy (temporarily disabled for debugging)
          // {
          //   key: 'Content-Security-Policy',
          //   value: [
          //     "default-src 'self'",
          //     "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
          //     "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://region1.analytics.google.com",
          //     "img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com",
          //     "style-src 'self' 'unsafe-inline'",
          //     "font-src 'self' data:",
          //     "object-src 'none'",
          //     "base-uri 'self'",
          //     "form-action 'self'",
          //     "frame-ancestors 'none'",
          //     "upgrade-insecure-requests"
          //   ].join('; '),
          // },
        ],
      },
    ]
  },
  
  // SEO redirects
  async redirects() {
    return [
      {
        source: '/temp-email',
        destination: '/',
        permanent: true,
      },
      {
        source: '/temporary-email',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
