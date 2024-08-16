import React from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import useMeetingForm from '../_hooks/useMeetingForm'

function MeetingDate() {
  const { meetingDateForm, onSubmit } = useMeetingForm()
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = meetingDateForm

  return (
    <div className="flex flex-col h-full">
      <div className="mb-[42px]">
        <h2 className="text-xl font-bold mb-2">모임은 언제 진행되나요? </h2>
        <p className="text-sm text-gray-600">
          모임이 진행되는 날짜와 시간을 알려주세요.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-grow flex flex-col"
      >
        <div className="flex-grow">
          <Input
            name="date"
            control={control}
            label="모임 시작"
            as="datetime"
            placeholder="시작일 입력"
            error={errors.date?.message}
          />

          <Input
            name="endDate"
            control={control}
            label="모집 종료"
            placeholder="종료일 입력"
            as="datetime"
            error={errors.endDate?.message}
          />
        </div>

        <Button type="submit" disabled={!isValid} fullWidth variant="primary">
          다음
        </Button>
      </form>
    </div>
  )
}

export default MeetingDate
