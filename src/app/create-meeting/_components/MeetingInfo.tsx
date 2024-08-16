import React from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import useMeetingForm from '../_hooks/useMeetingForm'

function MeetingInfo() {
  const { meetingForm, onSubmit } = useMeetingForm()
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = meetingForm

  return (
    <div className="flex flex-col h-full">
      <div className="mb-[42px]">
        <h2 className="text-xl font-bold mb-2">
          생성하려는 모임의 정보를 알려주세요.
        </h2>
        <p className="text-sm text-gray-600">
          다른 참여자들이 알 수 있도록 모임을 설명해주세요.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-grow flex flex-col"
      >
        <div className="flex-grow">
          <Input
            name="name"
            control={control}
            label="모임 이름"
            placeholder="이름 입력"
            error={errors.name?.message}
            maxLength={15}
            showCharCount
          />

          <Input
            name="description"
            control={control}
            label="모임 설명"
            placeholder="최대 150자까지 입력 가능해요"
            as="textarea"
            error={errors.description?.message}
            maxLength={150}
            showCharCount
          />
        </div>

        <Button type="submit" disabled={!isValid} fullWidth variant="primary">
          다음
        </Button>
      </form>
    </div>
  )
}

export default MeetingInfo
