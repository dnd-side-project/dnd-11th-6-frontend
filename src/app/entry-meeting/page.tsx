'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useMeetingStore from '@/stores/useMeetingStore'
import {
  LinkInput,
  MeetingInfo,
  NicknameInput,
  PasswordInput,
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
            onBackClick={() => {
              router.back()
            }}
          />
        )
      case 1:
        return meetingData ? (
          <MeetingInfo onEnterClick={() => setPage(page + 1)} />
        ) : null
      case 2:
        return <PasswordInput onPasswordSubmit={() => setPage(page + 1)} />
      case 3:
        return (
          <NicknameInput
            onNicknameSubmit={() => console.log('닉네임 제출 완료. 모임 입장')}
          />
        )
      default:
        return <LinkInput onEnterClick={() => setPage(page + 1)} />
    }
  }

  return <div className="flex flex-col items-center">{renderPage()}</div>
}

export default EntryMeeting
