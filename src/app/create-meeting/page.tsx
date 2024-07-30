'use client'

import React from 'react'
import { MeetingFormModel } from '@/lib/meetingSchema'
import RenderStep1 from './_components/RenderStep1'
import RenderStep2 from './_components/RenderStep2'
import RenderStep3 from './_components/RenderStep3'
import RenderStep4 from './_components/RenderStep4'
import RenderStep5 from './_components/RenderStep5'
import useMeetingForm from './_hooks/useMeetingFom'

const stepTitles = {
  1: '모임 정보 입력하기',
  2: '모임 테마',
  3: '비밀번호 설정',
  4: '관리자 PIN 안내',
  5: ' 모임 생성 완료',
}

function CreateMeetingPage() {
  const { meetingForm, step, onSubmit, pin, setStep } = useMeetingForm()

  const handleSubmit = (data: Partial<MeetingFormModel>) => {
    onSubmit(data as MeetingFormModel)
  }

  const handleShareMeeting = () => {
    console.log('Share meeting')
  }

  const handleGoToMyMeeting = () => {
    console.log('Go to my meeting')
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <RenderStep1 form={meetingForm} onSubmit={handleSubmit} />
      case 2:
        return <RenderStep2 form={meetingForm} onSubmit={handleSubmit} />
      case 3:
        return <RenderStep3 form={meetingForm} onSubmit={handleSubmit} />
      case 4:
        return <RenderStep4 pin={pin} onNext={() => setStep(5)} />
      case 5:
        return (
          <RenderStep5
            onShareMeeting={handleShareMeeting}
            onGoToMyMeeting={handleGoToMyMeeting}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {stepTitles[step as keyof typeof stepTitles]}
      </h1>
      {renderStep()}
    </div>
  )
}

export default CreateMeetingPage
