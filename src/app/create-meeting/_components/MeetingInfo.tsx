import React from 'react'
import { Input } from '@/components/Input'
import useMeetingForm from '../_hooks/useMeetingForm'
import MeetingLayout from './MeetingLayout'

function MeetingInfo() {
  const { meetingForm, onSubmit } = useMeetingForm()
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = meetingForm

  return (
    <MeetingLayout
      title="생성하려는 모임의 정보를 알려주세요."
      description="다른 참여자들이 알 수 있도록 모임을 설명해주세요."
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
      showBackButton={false}
    >
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
    </MeetingLayout>
  )
}

export default MeetingInfo
