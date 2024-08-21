import withPWA from 'next-pwa'

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_IMAGE_BASE_URL.replace(
          /^https?:\/\//,
          '',
        ),
        port: '',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/:path*`,
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
