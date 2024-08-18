import React from 'react'

interface TooltipProps {
  message: string
  onClose: () => void
  position?: 'top' | 'bottom'
  className?: string
  arrowClassName?: string
}

function Tooltip({
  message = 'tooltip message',
  onClose,
  position = 'bottom',
  className = '',
  arrowClassName = '',
}: TooltipProps) {
  const handleClose = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onClose()
  }

  const tooltipClass = 'absolute transform -translate-x-1/2 mb-2 min-w-max'

  const arrowClass =
    position === 'bottom'
      ? 'absolute transform -translate-x-1/2 bottom-full'
      : 'absolute transform -translate-x-1/2 top-full'

  const arrowInnerClass =
    position === 'bottom'
      ? 'border-8 border-transparent border-b-black'
      : 'border-8 border-transparent border-t-black'

  return (
    <div className={`${tooltipClass} ${className}`}>
      {position === 'top' && (
        <div className={`${arrowClass} ${arrowClassName}`}>
          <div className={arrowInnerClass} />
        </div>
      )}
      <div className="bg-black text-white text-[16px] rounded-full py-2 px-4">
        <div className="flex items-center justify-between">
          {message}
          <button onClick={handleClose} className="ml-2" aria-label="close">
            <svg
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
          </button>
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
