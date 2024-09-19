import React from 'react'
import COLORS from '@/constant/color'

type ColorType = (typeof COLORS)[number]

interface ColorPickerProps {
  label?: string
  selectedColor: ColorType | null
  onColorSelect: (color: ColorType) => void
}

const ColorPicker = ({
  label,
  selectedColor,
  onColorSelect,
}: ColorPickerProps) => (
  <div>
    <label className="block text-gray-600 text-sm mb-4">{label}</label>
    <div className="grid grid-cols-4 gap-[18px] place-items-center">
      {COLORS.map((color) => (
        <button
          key={color}
          type="button"
          className={`w-12 h-[48px] rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
            selectedColor === color ? 'ring-2 ring-offset-2 ring-black' : ''
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onColorSelect(color)}
          aria-label={`Select ${color} color`}
        />
      ))}
    </div>
  </div>
)

export default ColorPicker
