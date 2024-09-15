'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCheckMeetingId } from '@/apis/queries/meetingQueries'
import { ToastContainer } from '@/components/Toast'
import useMeetingStore from '@/stores/useMeetingStore'
import useToastStore from '@/stores/useToastStore'
import Back from 'public/icons/back.svg'
import Logo from 'public/logo.svg'
import MeetingDetail from './_components/MeetingDetail'
import MeetingRaising from './_components/MeetingRaising'

function MeetingInfo() {
  const router = useRouter()
  const [isMenuDetail, setIsMenuDetail] = useState(true)
  const { meetingData, setMeetingData } = useMeetingStore()
  const { message, showToast } = useToastStore()

  const { data, isLoading, error } = useCheckMeetingId(
    meetingData?.meetingId ?? 0,
    {
      queryKey: ['checkMeetingId', meetingData?.meetingId],
      enabled: !!meetingData?.meetingId,
      refetchOnWindowFocus: false,
    },
  )

  useEffect(() => {
    if (data?.data) {
      setMeetingData(data.data)
    }
  }, [data, setMeetingData])

  useEffect(() => {
    if (message) {
      showToast()
    }
  }, [message, showToast])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.error?.message}</div>
  }

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex-none">
        <div className="p-4">
          <div className="flex items-center justify-center relative h-[50px]">
            <div className="absolute left-0">
              <button onClick={() => router.push('/meeting-home')}>
                <Image src={Back} alt="back" />
              </button>
            </div>
            <div className="text-center">모임 정보</div>
          </div>
          <div className="flex justify-between pt-3 pb-5">
            <div className="flex flex-col">
              <div className="flex justify-start">
                <div className="bg-point-mint text-white text-caption-medium px-[10px] py-1 rounded-lg ">
                  모임 진행 중
                </div>
              </div>

              <div className=" font-bold text-[22px] mt-3">
                {meetingData?.name}
              </div>
            </div>

            <div
              className="flex bg-point-mint rounded-full w-[75px] h-[75px] bg-cover bg-center"
              style={{ backgroundImage: `url(${Logo.src})` }}
            />
          </div>
        </div>
        <div className="flex ">
          <button
            onClick={() => setIsMenuDetail(true)}
            className={`text-gray-600 border-b-[1px] text-body1-semibold w-1/2 flex justify-center py-3 ${isMenuDetail ? 'text-point-mint  border-b-2 border-point-mint' : ''}`}
          >
            모임 상세
          </button>
          <button
            onClick={() => setIsMenuDetail(false)}
            className={`text-gray-600 border-b-[1px] text-body1-semibold w-1/2 flex justify-center py-3 ${!isMenuDetail ? 'text-point-mint  border-b-2 border-point-mint' : ''}`}
          >
            모임 키우기
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        {isMenuDetail ? <MeetingDetail /> : <MeetingRaising />}
      </div>
      <ToastContainer />
    </div>
  )
}

export default MeetingInfo
