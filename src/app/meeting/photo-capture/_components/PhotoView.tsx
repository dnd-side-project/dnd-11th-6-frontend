import { useEffect } from 'react'
import { format } from 'date-fns/format'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useUploadSnap } from '@/apis/queries/snapQueries'
import Refresh from '@/assets/Refresh.svg'
import Close from '@/assets/close.svg'
import { Button } from '@/components/Button'
import Tooltip from '@/components/Tooltip'
import useMeetingStore from '@/stores/useMeetingStore'
import useMissionStore from '@/stores/useMissionStore'
import useTooltipStore from '@/stores/useTooltipStore'
import Back from 'public/icons/back.svg'
import Dice from 'public/icons/dice.svg'
import base64ToFile from '../_utils/base64ToFile'
import formatCaptureTime from '../_utils/formatCaptureTime'

type PhotoViewProps = {
  photo: string
  captureTime: Date | null
  onRetake: () => void
  goHome: () => void
}

function PhotoView({ photo, captureTime, onRetake, goHome }: PhotoViewProps) {
  const router = useRouter()
  const { hideTooltip, showTooltip } = useTooltipStore()
  const { currentMission, missionType, missionId } = useMissionStore()
  const meetingId = useMeetingStore((state) => state.meetingData?.meetingId)

  useEffect(() => {
    if (currentMission) {
      hideTooltip()
    } else {
      showTooltip('upload')
    }
  }, [currentMission, hideTooltip, showTooltip])

  const { mutate: uploadSnap, isPending: isUploading } = useUploadSnap({
    onSuccess: () => {
      router.push('/meeting-home')
    },
    onError: (error) => {
      console.error('Failed to upload snap:', error)
    },
  })

  const handleUpload = async () => {
    if (!meetingId) {
      console.error('Meeting ID is not available')
      return
    }

    const formattedDate = captureTime
      ? format(captureTime, "yyyy-MM-dd'T'HH:mm")
      : format(new Date(), "yyyy-MM-dd'T'HH:mm")

    const snapData: {
      shootDate: string
      randomMissionId?: number
      missionId?: number
    } = {
      shootDate: formattedDate,
    }

    if (missionType === 'random') {
      snapData.randomMissionId = missionId ?? undefined
    } else if (missionType === 'select') {
      snapData.missionId = missionId ?? undefined
    }

    try {
      const file = await base64ToFile(photo, 'snap.jpg')
      uploadSnap({ meetingId, snapData, image: file, missionType })
    } catch (error) {
      console.error('Error processing image:', error)
    }
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen ">
      {/* header */}
      <div className="flex justify-between items-center h-12 w-full p-4">
        <button onClick={onRetake} className="cursor-pointer">
          <Image src={Back} alt="back" className="w-[7.5px] h-[15px]" />
        </button>
        <div className="flex-1 flex justify-center items-center">
          <div className="text-body1-semibold text-gray-900">스냅 확인하기</div>
        </div>
        <button onClick={goHome} className="cursor-pointer">
          <Image src={Close} alt="Close Button" className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-6">
        {currentMission && (
          <div className=" rounded-[14px] px-[18px] py-[10px] bg-[#F2F5F5] text-body2-medium text-gray-900">
            {currentMission}
          </div>
        )}
      </div>

      {/* photo */}
      <div className="w-full mt-auto mb-auto">
        <div className="relative w-full pb-[100%] overflow-hidden rounded-[14px]">
          <Image src={photo} alt="찍은 사진" fill className="object-cover" />
        </div>

        <div className="flex justify-center items-center mt-3">
          {currentMission && (
            <div className="flex items-center bg-gray-100 rounded-[14px] px-[10px] py-1 text-caption text-gray-900 mr-3">
              <Image src={Dice} alt="Dice Icon" className="w-4 h-4 mr-1" />
              {missionType === 'random' ? '랜덤미션' : '모임미션'}
            </div>
          )}
          <div className="text-label text-gray-600">
            {formatCaptureTime(captureTime)}
          </div>
        </div>
      </div>

      {/* buttons */}
      <div className="button-group flex w-full mt-auto mb-5 p-4">
        <Button
          type="button"
          onClick={onRetake}
          variant="light"
          disabled={isUploading}
        >
          <Image src={Refresh} alt="Retake Button" className="w-8 h-8" />
        </Button>
        <div className="w-3" />
        <Button
          type="button"
          onClick={handleUpload}
          variant="primary"
          className="text-white text-body1-semibold w-full relative bg-point-mint"
          disabled={isUploading}
        >
          <Tooltip
            message="한 번 업로드된 스냅은 삭제가 어려워요!"
            onClose={hideTooltip}
            position="top"
            bgColor="bg-gray-700"
            textColor="text-white"
            arrowClassName="left-1/2"
            className="bottom-16 left-1/3"
          />
          {isUploading ? '업로드 중...' : '스냅 업로드하기'}
        </Button>
      </div>
    </div>
  )
}

export default PhotoView
