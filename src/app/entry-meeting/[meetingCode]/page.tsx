'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Loading from '@/components/Loading'
import useCheckMeetingLink from '@/hooks/useCheckMeetingLink'
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

  const meetingCode = params?.meetingCode as string | undefined

  const { data, isLoading, isSuccess, isError } = useCheckMeetingLink(
    meetingCode ?? '',
    {
      enabled: !!meetingCode,
      queryKey: ['checkMeetingLink', meetingCode ?? ''],
    },
  )

  useEffect(() => {
    if (meetingCode && isSuccess && data?.data) {
      setMeetingData(data.data)
      setPage(1)
    } else if (!meetingCode) {
      setPage(0)
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
    return <Loading />
  }

  if (meetingCode && isError) {
    return <div>Error loading meeting data</div>
  }

  return <div className="flex flex-col items-center">{renderPage()}</div>
}

export default EntryMeeting
