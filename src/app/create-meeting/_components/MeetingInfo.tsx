'use client'

import React from 'react'
import { Controller } from 'react-hook-form'
import useMeetingForm from '../_hooks/useMeetingForm'

function MeetingInfo() {
  const { meetingForm, onSubmit } = useMeetingForm()
  const {
    control,
    formState: { errors, isValid },
    watch,
    handleSubmit,
  } = meetingForm
  const isRecurring = watch('isRecurring')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="name" className="block font-bold mb-2">
          모임 이름
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="name"
              className="w-full p-2 border rounded"
              placeholder="모임이름을 입력해주세요."
            />
          )}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block font-bold mb-2">
          모임 설명
        </label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              id="description"
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
        <label htmlFor="startMeet" className="block font-bold mb-2">
          모임 시작일
        </label>
        <div className="flex gap-2">
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="date"
                type="date"
                className="w-1/2 p-2 border rounded"
              />
            )}
          />
          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id="time"
                type="time"
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
          render={({ field: { onChange, value, ref } }) => (
            <label htmlFor="isRecurring" className="flex items-center">
              <input
                id="isRecurring"
                type="checkbox"
                onChange={onChange}
                checked={value}
                ref={ref}
                className="mr-2"
              />
              <span>종료일 설정하기</span>
            </label>
          )}
        />
      </div>

      <p className="text-sm text-gray-500 mb-4">
        링크는 {isRecurring ? watch('endDate') : '24시간 이내'} 까지 유효합니다.
      </p>

      <button
        type="submit"
        className={`w-full p-3 rounded-md ${isValid ? 'bg-black text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        disabled={!isValid}
      >
        다음
      </button>
    </form>
  )
}

export default MeetingInfo
