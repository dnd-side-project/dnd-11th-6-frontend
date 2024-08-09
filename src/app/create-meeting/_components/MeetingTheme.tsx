import { useState, useRef, useEffect } from 'react'
import { Controller } from 'react-hook-form'
import Image from 'next/image'
import useMeetingForm from '../_hooks/useMeetingForm'

function MeetingTheme() {
  const { themeForm, onSubmit } = useMeetingForm()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = themeForm
  const [isView, setIsView] = useState<boolean>(false)
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

  const openImagePicker = async () => {
    if ('showOpenFilePicker' in window) {
      try {
        const [handle] = await (window as any).showOpenFilePicker({
          types: [
            {
              description: 'Images',
              accept: {
                'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
              },
            },
          ],
          multiple: false,
        })
        const file = await handle.getFile()
        handleFileChange({ target: { files: [file] } } as any)
      } catch (error) {
        console.error('Error picking the file:', error)
        // Fallback to traditional file input
        fileInputRef.current?.click()
      }
    } else {
      // Fallback for browsers that don't support the File System Access API
      fileInputRef.current?.click()
    }
  }

  const openCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*'
      fileInputRef.current.capture = 'environment'
      fileInputRef.current.click()
    }
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isView &&
        event.target instanceof Element &&
        !event.target.closest('.photo-options')
      ) {
        setIsView(false)
      }
    }

    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [isView])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">모임 대표사진 등록</h2>
      <div className="mb-4">
        <Controller
          name="photo"
          control={control}
          render={({ field }) => (
            <div className="relative">
              <button
                type="button"
                className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-2 cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setIsView((prev) => !prev)}
              >
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Selected"
                    width={128}
                    height={128}
                    objectFit="cover"
                  />
                ) : (
                  <span className="text-4xl text-gray-400">+</span>
                )}
              </button>
              {isView && (
                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden photo-options">
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    onClick={openImagePicker}
                  >
                    사진 보관함
                  </button>
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    onClick={openCamera}
                  >
                    사진찍기
                  </button>
                </div>
              )}
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

      <p className="mb-4">모임을 상징하는 색을 선택해주세요</p>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Controller
          name="color"
          control={control}
          rules={{ required: '색상을 선택해주세요.' }}
          render={({ field }) => (
            <>
              {[
                'red',
                'blue',
                'green',
                'yellow',
                'purple',
                'pink',
                'orange',
                'teal',
              ].map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-16 h-16 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${field.value === color ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                  style={{ backgroundColor: color }}
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

      <button
        type="submit"
        className="w-full p-3 rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
      >
        다음
      </button>
    </form>
  )
}

export default MeetingTheme
