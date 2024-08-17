import React from 'react'

interface TooltipProps {
  message: string
  onClose: () => void
}

function PhotoViewTooltip({ message, onClose }: TooltipProps) {
  return (
    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 mb-2 min-w-max">
      <div className="bg-black text-white text-sm rounded-full py-2 px-4">
        <div className="flex items-center justify-between">
          <span>{message}</span>
          <button onClick={onClose} className="ml-2" aria-label="close">
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
      <div className="absolute left-1/2 transform -translate-x-1/2 top-full">
        <div className="border-8 border-transparent border-t-black" />
      </div>
    </div>
  )
}

export default PhotoViewTooltip
