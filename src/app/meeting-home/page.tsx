'use client'

import React, { useState } from 'react'
import { Snapshot } from '@/apis/getSnapApi'
import Chip from '@/components/Chip'
import { IMAGE_BASE_URL } from '@/constant/base_url'
import useMeetingData from '@/hooks/useMeetingData'
import useScrollPosition from '@/hooks/useScrollPosition'
import useMeetingStore from '@/stores/useMeetingStore'
import dice from '../../../public/icons/dice.svg'
import profile from '../../../public/icons/profile.svg'
import snappy from '../../../public/icons/snappy.svg'
import AuthGuard from '../AuthGuard'
import {
  MeetingHeader,
  MeetingActionButtons,
  MeetingPhotoGrid,
} from './_components'

function MeetingHomePage() {
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
    }
  }

  const handleToggleSelecting = async () => {
    if (isSelecting && selectedImages.length > 0) {
      try {
        const fetchPromises = selectedImages.map(async (imageUrl) => {
          const fullImageUrl = `${IMAGE_BASE_URL}/${imageUrl}`
          const response = await fetch(fullImageUrl)
          const blob = await response.blob()
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `Snappy_${imageUrl.split('/').pop() || 'image.jpg'}`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
        })
        await Promise.all(fetchPromises)
      } catch (fetchError) {
        console.error(`Failed to download images:`, fetchError)
      }
      setSelectedImages([])
      setIsSelecting(false)
    } else {
      setIsSelecting(!isSelecting)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error has occurred: {error.message}</div>

  return (
    <AuthGuard>
      {' '}
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
                variant={activeChip === chip.label ? 'active' : 'default'}
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
    </AuthGuard>
  )
}

export default MeetingHomePage
