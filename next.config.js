/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    // TypeScript strict mode enabled for production builds
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  generateEtags: true,
  // Optimisations pour la production
  compress: true,
  productionBrowserSourceMaps: false,
  // Amélioration des performances SSR/SSG
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 5,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'v5.airtableusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.airtableusercontent.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable experimental features carefully
  experimental: {
    // optimizeCss: true, // Enable only if you have @next/bundle-analyzer installed
    scrollRestoration: true,
  },
  // Optimisations SWC compiler pour navigateurs modernes
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Download-Options',
            value: 'noopen',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
