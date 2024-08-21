import React from 'react'
import Image from 'next/image'
import Chip from '@/components/Chip'
import SnapProgressBar from '@/components/SnapProgressBar'
import { MeetingDataTypes } from '@/lib/meetingDataTypes'

interface MeetingHeaderProps {
  meetingData: MeetingDataTypes
  scrollPosition: number
  activeChip: string
  setActiveChip: (chip: string) => void
  chips: { label: string; icon: string }[]
}

const MeetingHeader = ({
  meetingData,
  scrollPosition,
  activeChip,
  setActiveChip,
  chips,
}: MeetingHeaderProps) => (
  <div
    className={`sticky top-0 bg-white z-50 transition-all duration-300 ${
      scrollPosition > 50 ? 'shadow-md' : ''
    }`}
  >
    <div className="flex items-center p-4">
      <Image
        src={meetingData.thumbnailUrl}
        alt="Meeting Thumbnail"
        width={50}
        height={50}
        className="rounded-lg mr-2"
      />
      <h1 className="text-xl font-bold">{meetingData.name}</h1>
    </div>
    <div className="px-4 py-2 bg-blue-100 text-blue-800">
      모임 진행 중: {new Date(meetingData.endDate).toLocaleDateString()}까지
      촬영 가능해요!
    </div>
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">알루리루붐님의 스냅피 활동</h2>
      <SnapProgressBar totalSnaps={10} takenSnaps={5} />
    </div>
    <div className="flex space-x-2 p-4 overflow-x-auto">
      {chips.map((chip) => (
        <Chip
          key={chip.label}
          label={chip.label}
          active={activeChip === chip.label}
          onClick={() => setActiveChip(chip.label)}
          chipImage={chip.icon}
        />
      ))}
    </div>
  </div>
)

export default MeetingHeader
