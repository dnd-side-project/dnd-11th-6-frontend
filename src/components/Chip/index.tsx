import React from 'react'

interface ChipProps {
  label: string
  active?: boolean
  onClick?: () => void
}

const Chip = ({ label, active = false, onClick }: ChipProps) => (
  <button
    className={`px-4 py-2 rounded-full text-sm font-medium ${
      active
        ? 'bg-blue-500 text-white'
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
)

export default Chip
