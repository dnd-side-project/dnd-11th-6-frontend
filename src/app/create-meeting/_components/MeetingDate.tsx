import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import { Input } from '@/components/Input'
import useMeetingForm from '../_hooks/useMeetingForm'
import MeetingLayout from './MeetingLayout'

function MeetingDate() {
  const { meetingDateForm, onSubmit } = useMeetingForm()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    getValues,
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
      <Input
        name="date"
        control={control}
        label="모임 시작"
        as="datetime"
        placeholder="시작일 입력"
        min={dayjs().format('YYYY-MM-DDTHH:mm')}
        error={errors.date?.message}
      />

      <Input
        name="endDate"
        control={control}
        min={dayjs().format('YYYY-MM-DDTHH:mm')}
        max={maxEndDate}
        label="모집 종료"
        placeholder="종료일 입력"
        as="datetime"
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
      <span className="bg-gray-50 text-sm font-semibold my-3 p-[10px] rounded text-center text-gray-700">
        {`링크는 ${getValues('endDate') ? dayjs(getValues('endDate').toString()).format('YYYY-MM-DD') : '모집 종료 설정 시간'} 까지 유효합니다.`}
      </span>
    </MeetingLayout>
  )
}

export default MeetingDate
