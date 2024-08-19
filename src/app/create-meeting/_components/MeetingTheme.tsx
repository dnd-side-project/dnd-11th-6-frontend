import { useState, useRef } from 'react'
import { Controller } from 'react-hook-form'
import Image from 'next/image'
import { Button } from '@/components/Button'
import useMeetStore from '@/stores/useMeetStore'
import useMeetingForm from '../_hooks/useMeetingForm'

function MeetingTheme() {
  const { themeForm, onSubmit } = useMeetingForm()
  const { setStep } = useMeetStore()

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
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
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">
          모임의 특색에 맞게 꾸며보세요.
        </h2>
        <p className="text-sm text-gray-600 mb-1">
          다른 참여자들이 우리 모임을 알아볼 수 있도록
        </p>
        <p className="text-sm text-gray-600">우리 모임의 색을 더해보세요.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                      width={150}
                      height={150}
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

        <div className="grid grid-cols-4 gap-[18px] my-10 place-items-center">
          <Controller
            name="color"
            control={control}
            rules={{ required: '색상을 선택해주세요.' }}
            render={({ field }) => (
              <>
                {[
                  'black',
                  '#FF862E',
                  '#299BFE',
                  '#00C4DF',
                  '#FF9BE6',
                  '#FFF763',
                  '#66EFB1',
                  '#5FEAFF',
                ].map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-12 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${field.value === color ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                    style={{ backgroundColor: color, height: '48px' }}
                    onClick={() => field.onChange(color)}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </>
            )}
          />
        </div>
        {errors.color && (
          <p className="text-red-500 mb-4">{errors.color.message}</p>
        )}
        <div className="flex gap-2">
          <Button
            className=" text-gray-700"
            onClick={() => setStep(2)}
            type="button"
            variant="light"
            fullWidth={false}
            width="50%"
          >
            이전
          </Button>
          <Button type="submit" disabled={!isValid} fullWidth variant="primary">
            다음
          </Button>
        </div>
      </form>
    </div>
  )
}

export default MeetingTheme
