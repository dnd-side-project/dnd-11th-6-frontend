import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { ColorType } from '@/constant/color'

export interface ColorPickerProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  colors: readonly ColorType[]
  rules?: Record<string, any>
  errorMessage?: string
}

function ColorPicker<T extends FieldValues>({
  name,
  control,
  colors,
  rules,
  errorMessage,
}: ColorPickerProps<T>) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-[18px] my-10 place-items-center">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <div>
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-12 h-12 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                    field.value === color
                      ? 'ring-2 ring-offset-2 ring-black'
                      : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => field.onChange(color)}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          )}
        />
      </div>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
    </div>
  )
}

export default ColorPicker
