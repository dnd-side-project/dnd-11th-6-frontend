import React, { useState } from 'react'
import Image from 'next/image'
import DownIcon from 'public/icons/down.svg'
import InfoIcon from 'public/icons/info.svg'
import UpIcon from 'public/icons/up.svg'
import { Button } from '../Button'

interface CalloutProps {
  title: string
  content: string
  buttonText: string
  className?: string
  onButtonClick: () => void
}

function Callout({
  title,
  content,
  buttonText,
  className,
  onButtonClick,
}: CalloutProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  function toggleExpand() {
    setIsExpanded(!isExpanded)
  }
  return (
    <div
      className={`bg-gray-50 rounded-lg shadow-md overflow-hidden ${className}`}
    >
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={toggleExpand}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleExpand()
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div className="flex items-center">
          <Image src={InfoIcon} alt="InfoIcon" className="w-5 h-5 mr-2" />
          <span className="text-gray-700 font-medium text-sm">{title}</span>
        </div>
        {isExpanded ? (
          <Image src={DownIcon} alt="DownIcon" />
        ) : (
          <Image src={UpIcon} alt="UpIcon" />
        )}
      </div>
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isExpanded ? 'max-h-40' : 'max-h-0'}
        `}
      >
        <div className="p-4 bg-gray-50">
          <p
            className="text-gray-700 font-normal mb-4 text-xs"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <Button
            variant="outline"
            onClick={onButtonClick}
            className="text-sm w-full"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Callout
