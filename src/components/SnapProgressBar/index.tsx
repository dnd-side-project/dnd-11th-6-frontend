import React from 'react'

interface SnapProgressBarProps {
  totalSnaps: number
  takenSnaps: number
}

const SnapProgressBar = ({ totalSnaps, takenSnaps }: SnapProgressBarProps) => {
  const percentage = (takenSnaps / totalSnaps) * 100

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${percentage}%` }}
      />
      <div className="text-sm text-gray-600 mt-1">
        {takenSnaps}/{totalSnaps} 스냅 완료
      </div>
    </div>
  )
}

export default SnapProgressBar
