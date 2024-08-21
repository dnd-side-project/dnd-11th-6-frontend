'use client'

import React, { useState } from 'react'
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
        activeChip={activeChip}
        setActiveChip={setActiveChip}
        chips={chips}
      />
      <MeetingPhotoGrid />
      <MeetingActionButtons />
    </div>
  )
}

export default MeetingHomePage
