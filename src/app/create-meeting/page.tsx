'use client'

import React from 'react'

import Image from 'next/image'
import useMeetStore from '@/stores/useMeetStore'
import {
  MeetingAdminPin,
  MeetingDate,
  MeetingInfo,
  MeetingPassword,
  MeetingShare,
} from './_components'
import ProgressBar from './_components/ProgressBar'

const stepTitles = {
  1: '모임 생성',
  2: '모임 생성',
  3: '비밀번호 설정',
  4: '관리자 PIN 안내',
  5: '',
}

function CreateMeetingPage() {
  const { step } = useMeetStore()

  const handleShareMeeting = () => {
    console.log('Share meeting')
  }

  const handleGoToMyMeeting = () => {
    console.log('Go to my meeting')
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <MeetingInfo />
      case 2:
        return <MeetingDate />
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
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="px-4">
        <div className="flex items-center justify-between mb-6">
          <button className="p-1">
            <Image src="/icons/close.svg" width={24} height={24} alt="close" />
          </button>
          <h1 className="text-xl font-bold flex-grow text-center">
            {stepTitles[step as keyof typeof stepTitles]}
          </h1>
          <div className="w-6" /> {/* 오른쪽 여백을 위한 빈 div */}
        </div>
        <ProgressBar currentStep={step} totalSteps={5} />

        {renderStep()}
      </div>
    </div>
  )
}

export default CreateMeetingPage
