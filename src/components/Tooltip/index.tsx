import React from 'react'

interface TooltipProps {
  message: string
  onClose: () => void
  position?: 'top' | 'bottom'
  className?: string
  arrowClassName?: string
  bgColor?: string
  textColor?: string
  rounded?: string
  padding?: string
}

function Tooltip({
  message = 'tooltip message',
  onClose,
  position = 'bottom',
  className = '',
  arrowClassName = '',
  bgColor = 'bg-black',
  textColor = 'text-white',
  rounded = 'rounded-full',
  padding = 'py-2 px-4',
}: TooltipProps) {
  const handleClose = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onClose()
  }

  const tooltipClass =
    'absolute transform -translate-x-1/2 mb-2 min-w-max cursor-pointer z-50'

  const arrowClass =
    position === 'bottom'
      ? 'absolute transform -translate-x-1/2 bottom-full'
      : 'absolute transform -translate-x-1/2 top-full'

  const arrowInnerClass =
    position === 'bottom'
      ? `border-8 border-transparent border-b-${bgColor.split('-')[1]}`
      : `border-8 border-transparent border-t-${bgColor.split('-')[1]}`

  return (
    <div
      className={`${tooltipClass} ${className}`}
      onClick={handleClose}
      aria-label="close"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClose(e)
      }}
      tabIndex={0}
      role="button"
    >
      {position === 'top' && (
        <div className={`${arrowClass} ${arrowClassName}`}>
          <div className={arrowInnerClass} />
        </div>
      )}
      <div
        className={`${bgColor} ${textColor} text-[16px] ${rounded} ${padding}`}
      >
        <div className="flex items-center justify-between">
          {message}
          <svg
            width="13"
            height="14"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2"
          >
            <path
              d="M10.8337 2.66675L2.16699 11.3334"
              stroke="currentColor"
              strokeLinecap="round"
            />
            <path
              d="M10.8337 11.3334L2.16699 2.66675"
              stroke="currentColor"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      {position === 'bottom' && (
        <div className={`${arrowClass} ${arrowClassName}`}>
          <div className={arrowInnerClass} />
        </div>
      )}
    </div>
  )
}

export default Tooltip
