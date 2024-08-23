'use client'

import React, { useState } from 'react'
import Chip from '@/components/Chip'
import useMeetingData from '@/hooks/useMeetingData'
import useScrollPosition from '@/hooks/useScrollPosition'
import dice from '../../../public/icons/dice.svg'
import profile from '../../../public/icons/profile.svg'
import snappy from '../../../public/icons/snappy.svg'
import {
  MeetingHeader,
  MeetingActionButtons,
  MeetingPhotoGrid,
} from './_components'

function MeetingHomePage() {
  const [activeChip, setActiveChip] = useState('전체')
  const scrollPosition = useScrollPosition()
  const { data: meetingData, isLoading, error } = useMeetingData(1)

  const chips = [
    { label: '전체', icon: '' },
    { label: '랜덤미션', icon: dice },
    { label: '모임미션', icon: profile },
    { label: '내가찍은', icon: snappy },
  ]

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error has occurred: {error.message}</div>

  return (
    <div className="pb-20">
      <MeetingHeader
        meetingData={meetingData!}
        scrollPosition={scrollPosition}
      />
      <div className="bg-gray-50 px-4 py-[14px]">
        <div className="flex space-x-2 py-4 overflow-x-auto ">
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
        <div>
          <span className="text-gray-500 text-xs mr-[6px]">전체사진</span>
          <span className="text-gray-700 text-xs">231장</span>
        </div>
        <MeetingPhotoGrid />
        <MeetingActionButtons />
      </div>
    </div>
  )
}

export default MeetingHomePage
