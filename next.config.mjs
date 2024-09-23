import withPWA from 'next-pwa'

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://cdn.get-snappy.co.kr'.replace(/^https?:\/\//, ''),
        port: '',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `https://api.get-snappy.co.kr/api/v1/:path*`,
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
