import Image from 'next/image'
import Refresh from '@/assets/Refresh.svg'
import Close from '@/assets/close.svg'
import { Button } from '@/components/Button'
import Tooltip from '@/components/Tooltip'
import usePhoto from '@/hooks/usePhoto'
import useMissionStore from '@/stores/useMissionStore'
import useTooltipStore from '@/stores/useTooltipStore'

type PhotoViewProps = {
  photo: string
  onRetake: () => void
  goBack: () => void
}

function PhotoView({ photo, onRetake, goBack }: PhotoViewProps) {
  const showTooltip = useTooltipStore((state) => state.showTooltip)
  const setShowTooltip = useTooltipStore((state) => state.setShowTooltip)
  const currentMission = useMissionStore((state) => state.currentMission)

  const { uploadPhoto, isUploading } = usePhoto()

  const handleUpload = async () => {
    try {
      await uploadPhoto(photo)
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

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
        {currentMission && (
          <div className=" rounded-[14px] px-[18px] py-[10px] bg-[#F2F5F5] font-semibold">
            {currentMission}
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
        <div className="text-[#888D91] mr-3">2024.08.06 PM 10:08</div>
        {currentMission && (
          <div className="flex items-center bg-gray-100 rounded-[14px] px-[10px] py-1 text-xs text-gray-900">
            모임미션
          </div>
        )}
      </div>
      <div className="button-group flex w-full mt-auto mb-5 ">
        <Button
          type="button"
          onClick={onRetake}
          variant="outline"
          disabled={isUploading}
        >
          <Image src={Refresh} alt="Retake Button" className="w-8 h-8" />
        </Button>
        <div className="w-3" />
        <Button
          type="button"
          onClick={() => handleUpload()}
          variant="primary"
          className="text-white w-full relative"
        >
          {showTooltip && (
            <Tooltip
              message="내 사진에 미션을 더 해봐요!"
              onClose={() => setShowTooltip(false)}
              position="top"
              arrowClassName="left-1/2"
              className="bottom-16 left-1/2"
            />
          )}
          스냅 업로드하기
        </Button>
      </div>
    </div>
  )
}

export default PhotoView
