'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Snapshot } from '@/apis/getSnapApi'
import Chip from '@/components/Chip'
import useMeetingData from '@/hooks/useMeetingData'
import useScrollPosition from '@/hooks/useScrollPosition'
import useMeetingStore from '@/stores/useMeetingStore'
import dice from '../../../public/icons/dice.svg'
import profile from '../../../public/icons/profile.svg'
import snappy from '../../../public/icons/snappy.svg'
import {
  MeetingHeader,
  MeetingActionButtons,
  MeetingPhotoGrid,
} from './_components'

function MeetingHomePage() {
  const router = useRouter()
  const [activeChip, setActiveChip] = useState('전체')
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [isSelecting, setIsSelecting] = useState(false)
  const scrollPosition = useScrollPosition()
  const { meetingData } = useMeetingStore()
  const {
    data: meetingInfo,
    isLoading,
    error,
  } = useMeetingData(meetingData?.meetingId ?? 0)

  const chips = [
    { label: '전체', icon: '' },
    { label: '랜덤미션', icon: dice },
    { label: '모임미션', icon: profile },
    { label: '내가찍은', icon: snappy },
  ]

  const handleSelectImage = (snapshot: Snapshot) => {
    if (isSelecting) {
      setSelectedImages((prev) =>
        prev.includes(snapshot.snapUrl)
          ? prev.filter((url) => url !== snapshot.snapUrl)
          : [...prev, snapshot.snapUrl],
      )
    } else {
      router.push(`/meeting/photo/${snapshot.snapId}`)
    }
  }

  const handleToggleSelecting = () => {
    if (isSelecting && selectedImages.length > 0) {
      selectedImages.forEach((imageUrl) => {
        const link = document.createElement('a')
        link.href = imageUrl
        link.download = imageUrl.split('/').pop() || 'download'
        link.click()
      })
      setSelectedImages([])
      setIsSelecting(false)
    }
    setIsSelecting(!isSelecting)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error has occurred: {error.message}</div>

  return (
    <div className="pb-20">
      <MeetingHeader
        meetingInfo={meetingInfo!}
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

        <MeetingPhotoGrid
          activeChip={activeChip}
          selectedImages={selectedImages}
          onSelectImage={handleSelectImage}
          isSelecting={isSelecting}
        />
        <MeetingActionButtons
          isSelecting={isSelecting}
          onToggleSelecting={handleToggleSelecting}
        />
      </div>
    </div>
  )
}

export default MeetingHomePage
