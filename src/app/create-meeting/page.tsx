'use client'

import React from 'react'
import RenderStep1 from './_components/RenderStep1'
import RenderStep2 from './_components/RenderStep2'
import RenderStep3 from './_components/RenderStep3'
import useMeetingForm from './_hooks/useMeetingFom'

function CreateMeetingPage() {
  const { meetingForm, passwordForm, step, onSubmit } = useMeetingForm()

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {step === 1 && '모임 정보 입력하기'}
        {step === 2 && '모임 테마'}
        {step === 3 && '비밀번호 설정'}
      </h1>
      {step === 1 && <RenderStep1 form={meetingForm} onSubmit={onSubmit} />}
      {step === 2 && <RenderStep2 form={meetingForm} onSubmit={onSubmit} />}
      {step === 3 && <RenderStep3 form={passwordForm} onSubmit={onSubmit} />}
    </div>
  )
}

export default CreateMeetingPage
