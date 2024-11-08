import React, { useState, useRef } from 'react'
import { Controller } from 'react-hook-form'
import Image from 'next/image'
import ColorPicker from '@/components/ColorPicker'
import COLORS from '@/constant/color'
import useMeetingForm from '../_hooks/useMeetingForm'
import MeetingLayout from './MeetingLayout'

function MeetingTheme() {
  const { themeForm, onSubmit } = useMeetingForm()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = themeForm
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const openImagePicker = () => {
    fileInputRef.current?.click()
  }

  return (
    <MeetingLayout
      title="모임의 특색에 맞게 꾸며보세요."
      description="다른 참여자들이 우리 모임을 알아볼 수 있도록 우리 모임의 색을 더해보세요."
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
    >
      <div className="flex justify-center">
        <Controller
          name="photo"
          control={control}
          render={({ field }) => (
            <div className="relative">
              <button
                type="button"
                className="w-[150px] h-[150px] bg-gray-200 rounded-full flex items-center justify-center cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={openImagePicker}
              >
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Selected"
                    // width={150}
                    // height={150}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <Image
                    src="../icons/camera.svg"
                    alt="Camera"
                    width={40}
                    height={40}
                  />
                )}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  handleFileChange(e)
                  field.onChange(e.target.files?.[0])
                }}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
          )}
        />
      </div>

      <Controller
        name="color"
        control={control}
        rules={{ required: '색상을 선택해주세요.' }}
        render={({ field }) => (
          <ColorPicker
            selectedColor={field.value as (typeof COLORS)[number] | null}
            onColorSelect={(color) => field.onChange(color)}
          />
        )}
      />
      {errors.color && (
        <p className="text-red-500 mb-4">{errors.color.message}</p>
      )}
    </MeetingLayout>
  )
}

export default MeetingTheme
