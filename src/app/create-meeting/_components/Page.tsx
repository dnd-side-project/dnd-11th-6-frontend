'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProgressBar from '@/components/ProgressBar'
import useMeetStore from '@/stores/useMeetStore'
import useMeetingForm from '../_hooks/useMeetingForm'
import MeetingDate from './MeetingDate'
import MeetingInfo from './MeetingInfo'
import MeetingPassword from './MeetingPassword'
import MeetingShare from './MeetingShare'
import MeetingTheme from './MeetingTheme'

function CreateMeetingPage() {
  const { step, resetForm } = useMeetStore()
  const { isLoading } = useMeetingForm()

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
        return <MeetingShare />
      default:
        return undefined
    }
  }

  return (
    <div className="flex flex-col my-10 max-h-screen">
      <div className="px-4">
        {!isLoading && (
          <div
            className={`${step !== 5 ? 'items-center' : ''} flex  justify-between mb-6`}
          >
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
            {step !== 5 ? (
              <h1 className="text-xl font-bold flex-grow text-center">
                {step !== 5 && '모임 생성'}
              </h1>
            ) : (
              <button className="p-1">
                <Link href="/" onClick={() => resetForm()}>
                  <Image
                    src="/icons/home.svg"
                    width={24}
                    height={24}
                    alt="home"
                  />
                </Link>
              </button>
            )}
          </div>
        )}

        {step !== 5 && !isLoading ? (
          <ProgressBar currentStep={step} totalSteps={4} />
        ) : null}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Image
              src="/icons/createLoading.svg"
              width={48}
              height={48}
              alt="loading"
            />
            <p className="mt-4 text-lg">모임을 생성하고 있습니다...</p>
          </div>
        ) : (
          <>{renderStep()}</>
        )}
      </div>
    </div>
  )
}

export default CreateMeetingPage
