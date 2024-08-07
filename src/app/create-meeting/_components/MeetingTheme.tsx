import React, { useState } from 'react'
import useMeetingForm from '../_hooks/useMeetingForm'
import { Button } from './Button'
import { Input } from './Input'

// Custom component for color selection
const ColorSelector = ({ control, name, error }) => {
  const colors = [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'pink',
    'orange',
    'teal',
  ]

  return (
    <div>
      <p className="mb-4">모임을 상징하는 색을 선택해주세요</p>
      <Input
        name={name}
        control={control}
        rules={{ required: '색상을 선택해주세요.' }}
        as="custom"
        render={({ field }) => (
          <div className="grid grid-cols-4 gap-4 mb-4">
            {colors.map((color) => (
              <Button
                key={color}
                type="button"
                className={`w-16 h-16 rounded-full ${
                  field.value === color ? 'ring-2 ring-offset-2 ring-black' : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => field.onChange(color)}
                aria-label={`Select ${color} color`}
                variant="custom"
              />
            ))}
          </div>
        )}
        error={error}
      />
    </div>
  )
}

function MeetingTheme() {
  const { themeForm, onSubmit } = useMeetingForm()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = themeForm
  const [isView, setIsView] = useState<boolean>(false)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-bold mb-4">모임 대표사진 등록</h2>
      <div className="mb-4">
        <Input
          name="photo"
          control={control}
          as="custom"
          render={({ field }) => (
            <div>
              <Button
                type="button"
                className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-2"
                onClick={() => setIsView((prev) => !prev)}
                variant="custom"
              >
                <span className="text-4xl text-gray-400">+</span>
              </Button>
              {isView && (
                <div className="bg-gray-700 text-white p-2 rounded-md text-center">
                  <Button
                    type="button"
                    className="w-full text-left"
                    onClick={() => alert('사진 보관함')}
                    variant="custom"
                  >
                    사진 보관함
                  </Button>
                  <Button
                    type="button"
                    className="w-full text-left"
                    onClick={() => alert('사진찍기')}
                    variant="custom"
                  >
                    사진찍기
                  </Button>
                  <input type="hidden" {...field} />
                </div>
              )}
            </div>
          )}
        />
      </div>

      <ColorSelector
        control={control}
        name="color"
        error={errors.color?.message}
      />

      <Button type="submit" fullWidth variant="primary">
        다음
      </Button>
    </form>
  )
}

export default MeetingTheme
