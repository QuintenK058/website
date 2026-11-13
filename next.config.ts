import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: { formats: ['image/avif', 'image/webp'] },
  async redirects() {
    return [
      { source: '/diensten/development', destination: '/diensten/onderhoud', permanent: true },
      { source: '/diensten/development/:slug(maatwerk|koppelingen)', destination: '/diensten/onderhoud/:slug', permanent: true },
      { source: '/diensten/consultancy/:slug(e-commerce|online-marketing)', destination: '/diensten/consultancy', permanent: true },
      { source: '/diensten/ai/strategie-en-sparring', destination: '/diensten/consultancy', permanent: true },
      { source: '/website-check', destination: '/online-check', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
