import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useMeetingStore from '@/stores/useMeetingStore'
import useUserStore from '@/stores/useUserStore'

interface MeetingActionButtonsProps {
  isSelecting: boolean
  onToggleSelecting: () => void
}

const MeetingActionButtons = ({
  isSelecting,
  onToggleSelecting,
}: MeetingActionButtonsProps) => {
  const { shootCount } = useUserStore()
  const meetingSymbolColor = useMeetingStore(
    (state) => state.meetingData?.symbolColor,
  )

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center p-4 gap-2 shadow-top animate-float">
      {shootCount === 10 ? (
        ''
      ) : (
        <Link href="/meeting/photo-capture">
          <button
            className="text-white px-5 py-3 gap-1 rounded-full flex items-center"
            style={{ backgroundColor: meetingSymbolColor || '#000000' }}
          >
            <Image
              src="/icons/camera.svg"
              alt="Camera"
              width={20}
              height={20}
            />
            <span>스냅찍기</span>
          </button>
        </Link>
      )}

      <button
        className="bg-gray-200 text-gray-800 px-5 py-3 gap-1 rounded-full flex items-center"
        onClick={onToggleSelecting}
      >
        <Image
          src="/icons/download.svg"
          alt="Download"
          width={20}
          height={20}
        />
        <span>{isSelecting ? '다운로드' : '선택하기'}</span>
      </button>
    </div>
  )
}

export default MeetingActionButtons
