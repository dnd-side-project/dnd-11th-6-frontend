import { useState } from 'react'
import Image from 'next/image'
import Refresh from '@/assets/Refresh.svg'
import Close from '@/assets/close.svg'
import { Button } from '@/components/Button'
import downloadPhoto from '@/utils/imageUtils'
import PhotoViewTooltip from './PhotoViewTooltip'

type PhotoViewProps = {
  photo: string
  onRetake: () => void
  goBack: () => void
}

function PhotoView({ photo, onRetake, goBack }: PhotoViewProps) {
  const [showTooltip, setShowTooltip] = useState(true)
  const [isMeetingMission] = useState(true)

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4">
      <div className="flex justify-between items-center h-12 w-full">
        <div className="flex-1">{}</div>
        <div className="flex-1 flex justify-center items-center">
          <div className="font-bold">촬영자님의 스냅</div>
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={goBack}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') goBack()
          }}
          className="flex-1 flex justify-end items-center cursor-pointer"
        >
          <Image src={Close} alt="Close Button" className="w-6 h-6" />
        </div>
      </div>
      <div className="h-[60px] mt-6">
        {isMeetingMission && (
          <div className=" rounded-[14px] px-[18px] py-[10px] bg-[#F2F5F5] font-semibold">
            모임에서 가장 뫄뫄한 사람 찍기
          </div>
        )}
      </div>
      <Image
        src={photo}
        alt="찍은 사진"
        width={360}
        height={480}
        className="w-[360px] h-[480px] rounded-[14px] mt-3"
        style={{ objectFit: 'cover' }}
      />
      <div className="flex  mt-3">
        {' '}
        <div className="text-[#888D91] mr-3">2024.08.06 PM 10:08</div>
        {isMeetingMission && (
          <div className="flex items-center bg-gray-100 rounded-[14px] px-[10px] py-1 text-xs text-gray-900">
            모임미션
          </div>
        )}
      </div>
      <div className="button-group flex w-full mt-auto mb-5 ">
        <Button type="button" onClick={onRetake} variant="outline">
          <Image src={Refresh} alt="Retake Button" className="w-8 h-8" />
        </Button>
        <div className="w-3" />
        <Button
          type="button"
          onClick={() => downloadPhoto(photo)}
          variant="primary"
          className="text-white w-full relative"
        >
          {showTooltip && (
            <PhotoViewTooltip
              message="한 번 업로드된 스냅은 삭제가 어려워요!"
              onClose={() => setShowTooltip(false)}
            />
          )}
          스냅 업로드하기
        </Button>
      </div>
    </div>
  )
}

export default PhotoView
