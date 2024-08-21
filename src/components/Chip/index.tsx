import React from 'react'
import Image, { StaticImageData } from 'next/image'

interface ChipProps {
  label: string
  active?: boolean
  onClick?: () => void
  chipImage?: string | StaticImageData
}

const Chip = ({ label, active = false, onClick, chipImage }: ChipProps) => (
  <button
    onClick={onClick}
    className={`px-3 py-[6px] flex justify-center items-center rounded-full text-sm font-medium ${
      active
        ? 'bg-blue-500 text-white'
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    }`}
  >
    <span>{label}</span>
    {chipImage && (
      <Image className="ml-1" src={chipImage} alt={`${chipImage}`} />
    )}
  </button>
)

export default Chip
