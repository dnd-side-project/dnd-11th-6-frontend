import React from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
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
      <Input
        name="name"
        control={control}
        label="모임 이름"
        placeholder="모임이름을 입력해주세요."
        error={errors.name?.message}
      />

      <Input
        name="description"
        control={control}
        label="모임 설명"
        placeholder="모임에 대한 설명을 입력해주세요."
        as="textarea"
        error={errors.description?.message}
      />

      <div className="mb-4">
        <Input
          label="모임 시작일"
          name="date"
          control={control}
          type="datetime-local"
          className="w-1/2"
        />
        {errors.date && (
          <p className="text-red-500">날짜와 시간을 선택해주세요.</p>
        )}
      </div>

      {isRecurring && (
        <Input
          name="endDate"
          control={control}
          label="종료일"
          type="date"
          error={errors.endDate?.message}
        />
      )}

      <Input
        name="isRecurring"
        control={control}
        label="종료일 설정하기"
        type="checkbox"
        as="checkbox"
      />

      <p className="text-sm text-gray-500 mb-4">
        링크는 {isRecurring ? watch('endDate') : '24시간 이내'} 까지 유효합니다.
      </p>

      <Button
        type="submit"
        disabled={!isValid}
        fullWidth
        variant={isValid ? 'primary' : 'light'}
      >
        다음
      </Button>
    </form>
  )
}

export default MeetingInfo
