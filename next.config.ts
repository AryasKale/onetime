import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Basic performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  
  // Turbopack configuration (stable)
  turbopack: {
    resolveAlias: {
      'web-vitals': './lib/web-vitals-stub.ts',
    },
  },
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
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
