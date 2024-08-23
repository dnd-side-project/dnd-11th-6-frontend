import React from 'react'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import Image from 'next/image'
import SnapProgressBar from '@/components/SnapProgressBar'
import { MeetingDataTypes } from '@/lib/meetingDataTypes'
import useUserStore from '@/stores/useUserStore'
import Right from '../../../../public/icons/right.svg'

dayjs.extend(isSameOrAfter)

interface MeetingHeaderProps {
  meetingInfo: MeetingDataTypes
  scrollPosition: number
}

const MeetingHeader = ({ meetingInfo, scrollPosition }: MeetingHeaderProps) => {
  const { nickname } = useUserStore()
  let meetingStatus = ''
  if (dayjs().isBefore(meetingInfo.startDate, 'day')) {
    meetingStatus = '모임 시작전'
  } else if (
    dayjs().isSameOrAfter(meetingInfo.startDate, 'day') &&
    dayjs().isBefore(meetingInfo.endDate, 'day')
  ) {
    meetingStatus = '모임 진행 중'
  } else if (dayjs().isSameOrAfter(meetingInfo.endDate, 'day')) {
    meetingStatus = '모임 종료'
  }
  return (
    <div
      className={`sticky  py-6 px-4 top-0 bg-white z-50 rounded-b-xl transition-all duration-300 ${
        scrollPosition > 50 ? 'shadow-md' : ''
      }`}
    >
      <div className="flex items-center py-[18px]">
        <Image
          src={`https://dnd-11th-6.s3.ap-northeast-2.amazonaws.com/${meetingInfo.thumbnailUrl}`}
          alt="Meeting Thumbnail"
          width={52}
          height={52}
          className="rounded-lg mr-3"
        />
        <div className="flex justify-between w-full">
          <h1 className="text-2xl font-bold">{meetingInfo.name}</h1>
          <Image src={Right} alt="Right Arrow" width={24} height={24} />
        </div>
      </div>
      <div
        className={`px-4 py-2 ${meetingStatus === '모임 진행 중' ? 'bg-[#5FEAFF26]' : 'bg-gray-700'}  rounded-xl`}
      >
        <span
          className={`rounded-lg py-1 px-[10px] ${meetingStatus === '모임 진행 중' ? 'bg-[#5FEAFF] text-gray-900' : 'bg-gray-600 text-gray-700'} mr-[8px]`}
        >
          {meetingStatus}
        </span>
        <span
          className={`${meetingStatus === '모임 진행 중' ? 'text-[#5FEAFF]' : 'text-gray-600'}`}
        >
          {`${meetingStatus === '모임 종료' ? '' : dayjs(meetingInfo.endDate).format('YYYY-MM-DD')}${meetingStatus === '모임 진행 중' ? '까지 촬영 가능해요!' : meetingStatus === '모임 시작전' ? '부터 촬영 가능해요!' : `모임 링크 만료까지 ${dayjs(meetingInfo.endDate).diff(dayjs(), 'day')}일 남았어요.`}`}
        </span>
      </div>
      <div className="py-4">
        <h2 className="text-lg font-medium text-gray-700 mb-2">
          {`${nickname}님의 스냅피 활동`}
        </h2>
        <SnapProgressBar />
      </div>
    </div>
  )
}
export default MeetingHeader
