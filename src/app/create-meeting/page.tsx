'use client'

import React from 'react'

import useMeetStore from '@/stores/useMeetStrore'
import RenderStep1 from './_components/RenderStep1'
import RenderStep2 from './_components/RenderStep2'
import RenderStep3 from './_components/RenderStep3'
import RenderStep4 from './_components/RenderStep4'
import RenderStep5 from './_components/RenderStep5'

const stepTitles = {
  1: '모임 정보 입력하기',
  2: '모임 테마',
  3: '비밀번호 설정',
  4: '관리자 PIN 안내',
  5: '',
}

function CreateMeetingPage() {
  const { step, setStep } = useMeetStore()

  const handleShareMeeting = () => {
    console.log('Share meeting')
  }

  const handleGoToMyMeeting = () => {
    console.log('Go to my meeting')
  }

  const handleGoBack = () => {
    if (step > 1 && step < 5) {
      setStep(step - 1)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <RenderStep1 />
      case 2:
        return <RenderStep2 />
      case 3:
        return <RenderStep3 />
      case 4:
        return <RenderStep4 />
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
      <div className="flex gap-4 ">
        <button
          type="button"
          onClick={handleGoBack}
          className={`text-2xl mr-4 ${step === 1 || step === 5 ? 'invisible' : ''}`}
          disabled={step === 1 || step === 5}
        >
          &lt;
        </button>
        <h1 className="text-2xl font-bold mb-4 m-auto">
          {stepTitles[step as keyof typeof stepTitles]}
        </h1>
      </div>

      {renderStep()}
    </div>
  )
}

export default CreateMeetingPage
