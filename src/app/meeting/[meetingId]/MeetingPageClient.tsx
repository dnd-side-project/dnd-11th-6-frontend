'use client'

import { useEffect, useState } from 'react'
import Drawer from '@/components/Drawer/Drawer'
import useMeetingStore, { Photo } from '@/stores/useMeetingStore'
import MeetingInfo from './_components/MeetingInfo'

interface MeetingPageClientProps {
  initialMeetingId: string
  initialPhotos: Photo[]
}

function MeetingPageClient({
  initialMeetingId,
  initialPhotos,
}: MeetingPageClientProps) {
  const { setMeetingId, setPhotos } = useMeetingStore()
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    setMeetingId(initialMeetingId)
    setPhotos(initialPhotos)
  }, [initialMeetingId, initialPhotos])

  const { meetingId, photos } = useMeetingStore()

  const toggleDrawer = (): void => setIsVisible(!isVisible)
  const closeDrawer = (): void => setIsVisible(false)

  return (
    <>
      <div className="flex flex-col">
        <div>meeting: {meetingId}</div>
        <div className="flex justify-between items-center mb-3">
          <div className="text-xl">LOGO</div>
          <div
            onClick={toggleDrawer}
            className="flex justify-center items-center rounded-full w-12 h-12 bg-gray-300"
            tabIndex={0}
            role="button"
            onKeyDown={(e) => e.key === 'Enter' && toggleDrawer()}
          >
            photo
          </div>
        </div>
        <div className="flex justify-between bg-gray-300 mb-5">
          <div>***님은 1장 중 1장 찍으셨어요</div>
          <div>찍은사진 보기&gt;</div>
        </div>
        <div className="flex justify-between">
          <div className="flex mb-5">
            <input type="checkbox" />
            <div>모임 미션 사진 보기</div>
          </div>
          <div>사진 삭제하기</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-pink-200 w-full h-52 cursor-pointer"
            >
              {photo.url}
            </div>
          ))}
        </div>
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
          <button
            type="button"
            className="w-52 h-12 bg-black text-white rounded-full"
          >
            📷 사진 찍기
          </button>
        </div>
      </div>
      <Drawer isVisible={isVisible} onClose={closeDrawer}>
        <MeetingInfo />
      </Drawer>
    </>
  )
}

export default MeetingPageClient
