import withPWA from 'next-pwa'
import { API_BASE_URL, IMAGE_BASE_URL } from '@/constant/base_url'

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: IMAGE_BASE_URL.replace(/^https?:\/\//, ''),
        port: '',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${API_BASE_URL}/:path*`,
      },
    ]
  },
  async headers() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/:path*',
          headers: [
            { key: 'Cache-Control', value: 'no-store, must-revalidate' },
          ],
        },
      ]
    }
    return []
  },
}

const pwaConfig = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
}

export default withPWA(pwaConfig)(nextConfig)
