'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import useMeetStore from '@/stores/useMeetStore'
import CloseSvg from 'public/icons/CloseSvg'
import useMeetingForm from './_hooks/useMeetingForm'

// dynamic import로 처리했음 MeetingTheme에서는 File을 이용한 문법을 사용하고 있어서 추후 코드에서 개선해야할 필요가 있음
const MeetingInfo = dynamic(() => import('./_components/MeetingInfo'))
const MeetingDate = dynamic(() => import('./_components/MeetingDate'))
const MeetingTheme = dynamic(() => import('./_components/MeetingTheme'))
const MeetingPassword = dynamic(() => import('./_components/MeetingPassword'))
const MeetingShare = dynamic(() => import('./_components/MeetingShare'))

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
        className={`${step !== 5 && 'items-center'} flex justify-between mb-6`}
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
      <Suspense fallback={<div>Loading...</div>}>{renderStep()}</Suspense>
    </div>
  )
}

export default CreateMeetingPage
