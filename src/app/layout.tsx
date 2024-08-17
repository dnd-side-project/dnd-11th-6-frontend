import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Snappy',
  description: '즐거운 모임의 순간들을 스냅피와 함께하세요!',
  themeColor: '#9aa7fe',
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/icon-512x512.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <div className="flex justify-center">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </body>
    </html>
  )
}
