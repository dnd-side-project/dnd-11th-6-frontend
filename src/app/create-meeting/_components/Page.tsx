'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useMeetStore from '@/stores/useMeetStore'
import CloseSvg from 'public/icons/CloseSvg'
import useMeetingForm from '../_hooks/useMeetingForm'
import MeetingDate from './MeetingDate'
import MeetingInfo from './MeetingInfo'
import MeetingPassword from './MeetingPassword'
import MeetingShare from './MeetingShare'
import MeetingTheme from './MeetingTheme'

function CreateMeetingPage() {
  const { step, resetForm } = useMeetStore()
  const { isLoading, isError } = useMeetingForm()

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

  if (isError) {
    return <div>Error...</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col max-h-screen w-full p-4">
      <div
        className={`${step !== 5 && 'items-center'} flex  justify-between mb-6`}
      >
        <button className="p-1" aria-label="close">
          <Link href="/" onClick={() => resetForm()}>
            <CloseSvg size={24} />
          </Link>
        </button>
        {step !== 5 ? (
          <h1 className="text-xl font-bold flex-grow text-center">모임 생성</h1>
        ) : (
          <button className="p-1">
            <Link href="/" onClick={() => resetForm()}>
              <Image src="/icons/home.svg" width={24} height={24} alt="home" />
            </Link>
          </button>
        )}
      </div>
      {renderStep()}
    </div>
  )
}

export default CreateMeetingPage
