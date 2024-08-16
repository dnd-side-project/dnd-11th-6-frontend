import React from 'react'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => (
  <div className="w-full flex justify-between mb-8">
    {[...Array(totalSteps)].map((_, index) => (
      <div key={index} className="flex items-center">
        <div
          className={`w-16 h-1 rounded-full flex items-center justify-center text-sm font-medium
              ${
                index + 1 <= currentStep
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
        />
      </div>
    ))}
  </div>
)

export default ProgressBar
