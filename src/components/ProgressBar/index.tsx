import React from 'react'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => (
  <div className="w-full flex justify-between mb-4 py-2">
    {[...Array(totalSteps)].map((_, index) => (
      <div key={index} className="flex-1 px-1">
        <div
          style={{ height: '4px' }}
          className={`rounded-full  ${
            index + 1 <= currentStep ? 'bg-black' : 'bg-gray-300'
          }`}
        />
      </div>
    ))}
  </div>
)
export default ProgressBar
