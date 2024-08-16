import React from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import useMeetingForm from '../_hooks/useMeetingForm'

function MeetingDate() {
  const { meetingDateForm, onSubmit } = useMeetingForm()
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = meetingDateForm

  return (
    <div className="flex flex-col h-full">
      <div className="mb-[42px]">
        <h2 className="text-xl font-bold mb-2">모임은 언제 진행되나요?</h2>
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
          <div className="flex bg-gray-50 py-3 px-4 rounded">
            <Image
              src="../icons/alert.svg"
              className="mr-2"
              width={20}
              height={20}
              alt="alert"
            />
            <div className=" flex flex-col text-sm font-medium">
              <p>모임 사진 촬영은 모임 기간 중에만 가능해요.</p>
              <p>모임에 맞게 종료일을 선택해주세요.</p>
            </div>
          </div>
        </div>
        <span className="bg-gray-50 text-sm font-semibold mb-3 p-[10px] rounded text-center text-gray-700">
          {`링크는 ${dayjs(getValues('endDate').toString()).format('YYYY-MM-DD')} 까지 유효합니다.`}
        </span>
        <Button type="submit" disabled={!isValid} fullWidth variant="primary">
          다음
        </Button>
      </form>
    </div>
  )
}

export default MeetingDate
