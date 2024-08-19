import withPWA from 'next-pwa'

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  // reactStrictMode: true,
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
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dnd-11th-6.s3.ap-northeast-2.amazonaws.com',
        port: '',
      },
    ],
  },
})
