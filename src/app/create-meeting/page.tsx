'use client'

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import useMeetStore from '@/stores/useMeetStore'
import {
  MeetingDate,
  MeetingInfo,
  MeetingPassword,
  MeetingShare,
  MeetingTheme,
} from './_components'
import ProgressBar from './_components/ProgressBar'

const stepTitles = {
  1: '모임 생성',
  2: '모임 생성',
  3: '모임 생성',
  4: '모임 생성',
  5: '',
}

function CreateMeetingPage() {
  const { step, resetForm } = useMeetStore()

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
        return <MeetingTheme />
      case 4:
        return <MeetingPassword />
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
            <Link href="/" onClick={() => resetForm()}>
              <Image
                src="/icons/close.svg"
                width={24}
                height={24}
                alt="close"
              />
            </Link>
          </button>
          <h1 className="text-xl font-bold flex-grow text-center">
            {stepTitles[step as keyof typeof stepTitles]}
          </h1>
          <div className="w-6" />
        </div>
        {step !== 5 ? <ProgressBar currentStep={step} totalSteps={4} /> : ''}

        {renderStep()}
      </div>
    </div>
  )
}

export default CreateMeetingPage
