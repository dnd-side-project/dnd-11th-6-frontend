import React from 'react'
import COLORS from '@/constant/color'

type ColorType = (typeof COLORS)[number]

interface ColorPickerProps {
  selectedColor: ColorType | null
  onColorSelect: (color: ColorType) => void
}

const ColorPicker = ({ selectedColor, onColorSelect }: ColorPickerProps) => (
  <div className="mt-10">
    <div className="grid grid-cols-4 gap-x-4 gap-y-10 place-items-center">
      {COLORS.map((color) => (
        <button
          key={color}
          type="button"
          className={`w-14 h-[56px] rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
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
