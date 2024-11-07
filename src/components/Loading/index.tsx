'use client'

import Lottie from 'lottie-react'
import cn from '@/utils/cn'
import loadingAnimation from 'public/lotties/loading.json'

interface LoadingProps {
  fullScreen?: boolean
  className?: string
  size?: number
}

export default function Loading({
  fullScreen = true,
  className,
  size = 300,
}: LoadingProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        fullScreen && 'min-h-screen',
        className,
      )}
    >
      <Lottie
        animationData={loadingAnimation}
        loop={false}
        style={{ width: size, height: size }}
      />
    </div>
  )
}

export type { LoadingProps }
