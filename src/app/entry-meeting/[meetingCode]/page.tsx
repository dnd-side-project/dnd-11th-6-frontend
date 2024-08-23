'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useCheckMeetingLink } from '@/apis/queries/meetingQueries'
import useMeetingStore from '@/stores/useMeetingStore'
import {
  LinkInput,
  MeetingInfo,
  NicknameInput,
  PasswordInput,
  Welcome,
} from '../_components'

function EntryMeeting() {
  const router = useRouter()
  const params = useParams()
  const [page, setPage] = useState(0)
  const meetingData = useMeetingStore((state) => state.meetingData)
  const setMeetingData = useMeetingStore((state) => state.setMeetingData)

  const meetingCode = params?.meetingCode as string

  const { data, isLoading, isSuccess, isError } =
    useCheckMeetingLink(meetingCode)

  useEffect(() => {
    if (meetingCode && isSuccess && data) {
      setMeetingData(data.data)
      setPage(1)
    }
  }, [meetingCode, isSuccess, data, setMeetingData])

  const renderPage = () => {
    switch (page) {
      case 0:
        return (
          <LinkInput
            onEnterClick={() => {
              setPage(1)
            }}
            onHomeClick={() => {
              router.push('/')
            }}
          />
        )
      case 1:
        return meetingData ? (
          <MeetingInfo
            meetingCode={meetingCode}
            onEnterClick={() => setPage(2)}
            onBackClick={() => {
              setPage(0)
            }}
            onHomeClick={() => {
              router.push('/')
            }}
          />
        ) : null
      case 2:
        return (
          <PasswordInput
            onEnterClick={() => setPage(3)}
            onBackClick={() => {
              setPage(1)
            }}
            onHomeClick={() => {
              router.push('/')
            }}
          />
        )
      case 3:
        return (
          <NicknameInput
            onEnterClick={() => setPage(4)}
            onBackClick={() => {
              setPage(2)
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
        return <LinkInput onEnterClick={() => setPage(1)} />
    }
  }

  if (meetingCode && isLoading) {
    return <div>Loading...</div>
  }

  if (meetingCode && isError) {
    return <div>Error loading meeting data</div>
  }

  return <div className="flex flex-col items-center">{renderPage()}</div>
}

export default EntryMeeting
