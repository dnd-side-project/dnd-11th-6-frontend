import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import AlertInfo from '../../../public/icons/alert-circle.svg'

type ToastType = 'default' | 'info' | 'warning' | 'success'
type ToastPosition = 'top' | 'bottom'

interface ToastProps {
  message: string
  type?: ToastType
  position?: ToastPosition
  duration?: number
  onClose?: () => void
  link?: string
}

function Toast({
  message,
  type = 'default',
  position = 'top',
  duration = 3000,
  onClose,
  link,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    const enterTimer = setTimeout(() => setIsVisible(true), 10)

    const exitTimer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    return () => {
      clearTimeout(enterTimer)
      clearTimeout(exitTimer)
    }
  }, [duration])

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        setShouldRender(false)
        if (onClose) onClose()
      }, 300)

      return () => clearTimeout(timer)
    }
    return () => {}
  }, [isVisible, onClose])

  function getTypeStyles(): string {
    switch (type) {
      case 'info':
        return 'bg-gray-900 bg-opacity-80 text-white'
      case 'warning':
        return 'bg-error-600 text-white'
      case 'success':
        return 'bg-success-600 text-white'
      default:
        return 'bg-gray-900 bg-opacity-80 text-white'
    }
  }

  if (!shouldRender) return null

  const positionClass = position === 'top' ? 'top-0' : 'bottom-0'
  const visibilityClass = isVisible ? 'opacity-100' : 'opacity-0'
  const transformClass = isVisible
    ? 'translate-y-0'
    : position === 'top'
      ? '-translate-y-full'
      : 'translate-y-full'

  return (
    <div
      className={`fixed ${positionClass} left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out ${visibilityClass} ${transformClass}`}
      style={{ transitionProperty: 'opacity, transform' }}
    >
      <div
        className={`flex items-center px-[18px] py-[14px] rounded-[14px] ${getTypeStyles()} whitespace-nowrap`}
      >
        {type === 'info' && (
          <Image
            src={AlertInfo}
            alt="alert-circle"
            className="mr-2"
            width={20}
            height={20}
          />
        )}
        {message}
        {link && (
          <a
            href={link}
            className="ml-2 text-gray-500 underline text-label-light"
            target="_blank"
            rel="noopener noreferrer"
          >
            링크
          </a>
        )}
      </div>
    </div>
  )
}

export default Toast
