'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import * as z from 'zod'

const CreateAlbumSchema = z
  .object({
    name: z.string().min(1, { message: '모임 이름을 입력해주세요.' }),
    description: z.string().min(1, { message: '모임 설명을 입력해주세요.' }),
    date: z.string().min(1, { message: '날짜를 선택해주세요.' }),
    time: z.string().min(1, { message: '시간을 선택해주세요.' }),
    isRecurring: z.boolean().optional(),
    endDate: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.isRecurring && data.endDate) {
        return new Date(data.endDate) > new Date(data.date)
      }
      return true
    },
    {
      message: '종료일은 시작일 이후여야 합니다.',
      path: ['endDate'],
    },
  )

type FormData = z.infer<typeof CreateAlbumSchema>

function CreateMeetingForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(CreateAlbumSchema),
    defaultValues: {
      name: '',
      description: '',
      date: '',
      time: '',
      isRecurring: false,
      endDate: '',
    },
  })

  const isRecurring = watch('isRecurring')

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <Link href="/" className="text-2xl">
          &lt;
        </Link>
        <h1 className="text-xl font-bold ml-4">모임 정보 입력하기</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <label htmlFor="name" className="font-bold">
              모임 이름
            </label>
          </div>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <input
                id="name"
                onChange={onChange}
                value={value}
                name={name}
                className="w-full p-2 border rounded"
                placeholder="모임이름을 입력해주세요."
              />
            )}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <label htmlFor="description" className="font-bold">
              모임 설명
            </label>
          </div>
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <textarea
                id="description"
                onChange={onChange}
                value={value}
                name={name}
                className="w-full p-2 border rounded"
                placeholder="모임에 대한 설명을 입력해주세요."
              />
            )}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <label htmlFor="startMeet" className="font-bold">
              모임 시작일
            </label>
          </div>
          <div className="flex gap-2">
            <Controller
              name="date"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <input
                  id="date"
                  type="date"
                  onChange={onChange}
                  value={value}
                  name={name}
                  className="w-1/2 p-2 border rounded"
                />
              )}
            />
            <Controller
              name="time"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <input
                  id="time"
                  type="time"
                  onChange={onChange}
                  value={value}
                  name={name}
                  className="w-1/2 p-2 border rounded"
                />
              )}
            />
          </div>
          {(errors.date || errors.time) && (
            <p className="text-red-500">날짜와 시간을 선택해주세요.</p>
          )}
        </div>

        {isRecurring && (
          <div className="mb-4">
            <label htmlFor="endDate" className="block font-bold mb-2">
              종료일
            </label>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="endDate"
                  type="date"
                  className="w-full p-2 border rounded"
                />
              )}
            />
            {errors.endDate && (
              <p className="text-red-500">{errors.endDate.message}</p>
            )}
          </div>
        )}

        <div className="mb-4">
          <Controller
            name="isRecurring"
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <label htmlFor="isRecurring" className="flex items-center">
                <input
                  id="isRecurring"
                  type="checkbox"
                  onChange={onChange}
                  checked={value}
                  name={name}
                  className="mr-2"
                />
                <span>종료일 설정하기</span>
              </label>
            )}
          />
        </div>

        <p className="text-sm text-gray-500 mb-4">
          링크는 {isRecurring ? '종료일' : 'yyyy.mm.dd'} 까지 유효합니다.
        </p>

        <button
          type="submit"
          className={`w-full p-3 rounded-md ${isValid ? 'bg-black text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          disabled={!isValid}
        >
          다음
        </button>
      </form>
    </div>
  )
}

export default CreateMeetingForm
