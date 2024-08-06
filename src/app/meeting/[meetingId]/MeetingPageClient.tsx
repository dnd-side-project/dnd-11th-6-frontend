'use client'

import Link from 'next/link'
import useMeetingStore from '@/stores/useMeetingStore'

function MeetingPageClient() {
  const { meetingId, photos } = useMeetingStore()

  return (
    <div className="flex flex-col">
      <div>meeting: {meetingId}</div>
      <div className="flex justify-between items-center mb-3">
        <div className="text-xl">LOGO</div>
        <div className="rounded-full w-12 h-12 bg-gray-300" />
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
        <Link href="/meeting/photo-capture">
          <button
            type="button"
            className="w-52 h-12 bg-black text-white rounded-full"
          >
            📷 사진 찍기 {meetingId}
          </button>
        </Link>
      </div>
    </div>
  )
}

export default MeetingPageClient
