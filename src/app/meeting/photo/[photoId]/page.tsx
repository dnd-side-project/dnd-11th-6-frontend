'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useGetSnapDetail } from '@/apis/snapApi'
import AuthGuard from '@/app/AuthGuard'
import { Button } from '@/components/Button'
import Loading from '@/components/Loading'
import { IMAGE_BASE_URL } from '@/constant/base_url'
import useMeetingStore from '@/stores/useMeetingStore'
import CloseSvg from 'public/icons/CloseSvg'
import Dice from 'public/icons/dice.svg'
import Download from 'public/icons/download.svg'
import formatCaptureTime from './formatCaptureTime'

function PhotoDetail({ params }: { params: { photoId: string } }) {
  const router = useRouter()
  const meetingId = useMeetingStore().meetingData?.meetingId
  const meetingSymbolColor = useMeetingStore(
    (state) => state.meetingData?.symbolColor,
  )
  const {
    data: snapData,
    isLoading,
    isError,
  } = useGetSnapDetail(meetingId || 0, Number(params.photoId))

  const handleDownload = async () => {
    if (!snapData) return
    try {
      const imageUrl = `${IMAGE_BASE_URL}/${snapData.data.snapUrl}`
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Snappy_${snapData.data.shootDate}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  if (isLoading) return <Loading />
  if (isError) return <div>Error loading snap details</div>
  if (!snapData) return <div>No data available</div>

  const { snapUrl, shootDate, type, photographer, mission } = snapData.data
  const fullImageUrl = `${IMAGE_BASE_URL}/${snapUrl}`

  return (
    <AuthGuard>
      <div className="flex flex-col items-center w-full min-h-screen ">
        <div className="flex justify-between items-center h-12 w-full p-4">
          <div className="flex-1 flex justify-center items-center">
            <div className="text-body1-semibold text-gray-900">
              {photographer.nickname}님의 스냅
            </div>
          </div>
          <button
            onClick={() => router.back()}
            className="cursor-pointer"
            aria-label="close"
          >
            <CloseSvg size={16} />
          </button>
        </div>

        <div className="mt-6">
          {mission?.content && (
            <div className=" rounded-[14px] px-[18px] py-[10px] bg-[#F2F5F5] text-body2 text-gray-900">
              {mission.content}
            </div>
          )}
        </div>

        <div className="w-full mt-auto mb-auto">
          <div className="relative w-full pb-[100%] overflow-hidden rounded-[14px]">
            <Image
              src={fullImageUrl}
              alt="찍은 사진"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex justify-center items-center mt-3">
            {mission?.content && (
              <div className="flex items-center bg-gray-100 rounded-[14px] px-[10px] py-1 text-caption text-gray-900 mr-3">
                <Image src={Dice} alt="Dice Icon" className="w-4 h-4 mr-1" />
                {type === 'RANDOM_MISSION' ? '랜덤미션' : '모임미션'}
              </div>
            )}
            <div className="text-label text-gray-600">
              {formatCaptureTime(shootDate)}
            </div>
          </div>
        </div>

        <div className="w-full mt-auto mb-5 p-4">
          <Button
            onClick={handleDownload}
            type="button"
            variant="primary"
            className="text-white text-body1-semibold w-full relative"
            style={{ backgroundColor: meetingSymbolColor || '#000000' }}
          >
            <Image
              src={Download}
              alt="Download Button"
              className="w-4 h-4 mr-2"
            />
            사진 다운받기
          </Button>
        </div>
      </div>
    </AuthGuard>
  )
}

export default PhotoDetail
