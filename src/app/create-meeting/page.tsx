'use client'

import React from 'react'

import useMeetStore from '@/stores/useMeetStore'
import {
  MeetingAdminPin,
  MeetingInfo,
  MeetingPassword,
  MeetingShare,
  MeetingTheme,
} from './_components'

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
        return <MeetingInfo />
      case 2:
        return <MeetingTheme />
      case 3:
        return <MeetingPassword />
      case 4:
        return <MeetingAdminPin />
      case 5:
        return (
          <MeetingShare
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
        {step === 1 || step === 5 ? (
          ''
        ) : (
          <button
            type="button"
            onClick={handleGoBack}
            className="text-2xl mr-4 bg-white"
            disabled={step === 1 || step === 5}
          >
            &gt;
          </button>
        )}

        <h1 className="text-2xl font-bold mb-4 m-auto">
          {stepTitles[step as keyof typeof stepTitles]}
        </h1>
      </div>

      {renderStep()}
    </div>
  )
}

export default CreateMeetingPage
