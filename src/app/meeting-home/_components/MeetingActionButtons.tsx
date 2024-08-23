import React from 'react'
import Image from 'next/image'
import useSnapStore from '@/stores/useSnapStore'

const MeetingActionButtons = () => {
  const { snapCount, totalSnapCount } = useSnapStore()

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center p-4 gap-2 shadow-top animate-float">
      {snapCount === totalSnapCount ? (
        ''
      ) : (
        <button className="bg-[#12C7E0] text-white px-5 py-3 gap-1 rounded-full flex items-center">
          <Image src="/icons/camera.svg" alt="Camera" width={20} height={20} />
          <span>스냅찍기</span>
        </button>
      )}

      <button className="bg-gray-200 text-gray-800 px-5 py-3 gap-1 rounded-full flex items-center">
        <Image
          src="/icons/download.svg"
          alt="Download"
          width={20}
          height={20}
        />
        <span>다운로드</span>
      </button>
    </div>
  )
}

export default MeetingActionButtons
