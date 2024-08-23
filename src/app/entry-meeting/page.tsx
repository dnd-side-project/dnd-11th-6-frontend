'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useMeetingStore from '@/stores/useMeetingStore'
import {
  LinkInput,
  MeetingInfo,
  NicknameInput,
  PasswordInput,
  Welcome,
} from './_components'

function EntryMeeting() {
  const router = useRouter()
  const [page, setPage] = useState(0)
  const meetingData = useMeetingStore((state) => state.meetingData)

  const renderPage = () => {
    switch (page) {
      case 0:
        return (
          <LinkInput
            onEnterClick={() => {
              setPage(page + 1)
            }}
            onHomeClick={() => {
              router.push('/')
            }}
          />
        )
      case 1:
        return meetingData ? (
          <MeetingInfo
            onEnterClick={() => setPage(page + 1)}
            onBackClick={() => {
              setPage(page - 1)
            }}
            onHomeClick={() => {
              router.push('/')
            }}
          />
        ) : null
      case 2:
        return (
          <PasswordInput
            onEnterClick={() => setPage(page + 1)}
            onBackClick={() => {
              setPage(page - 1)
            }}
            onHomeClick={() => {
              router.push('/')
            }}
          />
        )
      case 3:
        return (
          <NicknameInput
            onEnterClick={() => setPage(page + 1)}
            onBackClick={() => {
              setPage(page - 1)
            }}
            onHomeClick={() => {
              router.push('/')
            }}
          />
        )
      case 4:
        return (
          <Welcome
            onEnterClick={() => {
              router.push(`/meeting-home`)
            }}
            onBackClick={() => {
              router.back()
            }}
          />
        )
      default:
        return <LinkInput onEnterClick={() => setPage(page + 1)} />
    }
  }

  return <div className="flex flex-col items-center">{renderPage()}</div>
}

export default EntryMeeting
