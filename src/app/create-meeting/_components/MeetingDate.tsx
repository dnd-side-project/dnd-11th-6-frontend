import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import { DateInput } from '@/components/Inputs/DateInput'
import useMeetingForm from '../_hooks/useMeetingForm'
import MeetingLayout from './MeetingLayout'

function MeetingDate() {
  const { meetingDateForm, onSubmit } = useMeetingForm()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = meetingDateForm

  const startDate = watch('date')

  const maxEndDate = useMemo(() => {
    if (startDate) {
      return dayjs(startDate).add(7, 'day').format('YYYY-MM-DDTHH:mm')
    }
    return undefined
  }, [startDate])

  return (
    <MeetingLayout
      title="모임은 언제 진행되나요?"
      description="모임이 진행되는 날짜와 시간을 알려주세요."
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
    >
      <DateInput
        name="date"
        control={control}
        label="모임 시작"
        min={dayjs().format('YYYY-MM-DDTHH:mm')}
        error={errors.date?.message}
      />

      <DateInput
        name="endDate"
        control={control}
        min={dayjs().format('YYYY-MM-DDTHH:mm')}
        max={maxEndDate}
        label="모집 종료(링크 유효 기간)"
        error={errors.endDate?.message}
      />
      <div className="flex bg-gray-50 py-3 px-4 rounded">
        <Image
          src="../icons/alert.svg"
          className="mr-2"
          width={20}
          height={20}
          alt="alert"
        />
        <div className="flex flex-col text-sm font-medium">
          <p>모임 사진 촬영은 모임 기간 중에만 가능해요.</p>
          <p>모임에 맞게 종료일을 선택해주세요.</p>
        </div>
      </div>
    </MeetingLayout>
  )
}

export default MeetingDate
