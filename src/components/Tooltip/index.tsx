import React from 'react'

interface TooltipProps {
  message: string
  textColor?: string
  bgColor?: string
  onClose: () => void
  position?: 'top' | 'bottom'
  className?: string
  arrowClassName?: string
}

function Tooltip({
  message = 'tooltip message',
  onClose,
  position = 'bottom',
  textColor = 'text-white',
  bgColor = 'bg-black',
  className = '',
  arrowClassName = '',
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
      ? ' -translate-x-1/2 bottom-full'
      : ' -translate-x-1/2 top-full'

  const arrowInnerClass =
    position === 'bottom'
      ? ` border-b-${bgColor.split('-')[1]}`
      : ` border-t-${bgColor.split('-')[1]}`

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
        <div className={`absolute transform ${arrowClass} ${arrowClassName}`}>
          <div
            className={`${arrowInnerClass} border-8 border-transparent
`}
          />
        </div>
      )}
      <div
        className={`${textColor} ${bgColor} text-[16px] rounded-full py-2 px-4`}
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
              stroke="white"
              strokeLinecap="round"
            />
            <path
              d="M10.8337 11.3334L2.16699 2.66675"
              stroke="white"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      {position === 'bottom' && (
        <div className={`absolute transform ${arrowClass} ${arrowClassName}`}>
          <div className={`${arrowInnerClass} border-8 border-transparent`} />
        </div>
      )}
    </div>
  )
}

export default Tooltip
