import { Controller } from 'react-hook-form'
import { StepProps } from '@/types/meetingStep'

function RenderStep2({ form, onSubmit }: StepProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = form

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-bold mb-4">모임 대표사진 등록</h2>
      <div className="mb-4">
        <Controller
          name="photo"
          control={control}
          render={({ field }) => (
            <div>
              <button
                type="button"
                className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-2 cursor-pointer"
                onClick={() => console.log('Open photo picker')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    console.log('Open photo picker')
                  }
                }}
              >
                <span className="text-4xl text-gray-400">+</span>
              </button>
              <div className="bg-gray-700 text-white p-2 rounded-md text-center">
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => console.log('Open photo gallery')}
                >
                  사진 보관함
                </button>
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => console.log('Open camera')}
                >
                  사진찍기
                </button>
              </div>
              <input type="hidden" {...field} />
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      field.onChange(color)
                    }
                  }}
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
        className="w-full p-3 rounded-md bg-black text-white"
      >
        다음
      </button>
    </form>
  )
}

export default RenderStep2
