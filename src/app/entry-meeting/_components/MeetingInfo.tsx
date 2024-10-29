import { useCallback, useEffect } from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCheckMeetingLink } from '@/apis/queries/meetingQueries'
import { useGetParticipantsMe } from '@/apis/queries/participantsQueries'
import { Button } from '@/components/Button'
import { IMAGE_BASE_URL } from '@/constant/base_url'
import usePreviousUser from '@/hooks/usePreviousUser'
import useMeetingStore from '@/stores/useMeetingStore'
import BackIcon from 'public/icons/back.svg'
import Logo from 'public/logo.svg'

interface MeetingInfoProps {
  meetingCode?: string
  onEnterClick: () => void
  onBackClick: () => void
  onHomeClick?: () => void
}

function MeetingInfo({
  meetingCode,
  onEnterClick,
  onBackClick,
  onHomeClick,
}: MeetingInfoProps) {
  const maxLength = 75
  const router = useRouter()
  const { meetingData, setMeetingData } = useMeetingStore((state) => ({
    meetingData: state.meetingData,
    setMeetingData: state.setMeetingData,
  }))
  const { data, isLoading, isSuccess } = useCheckMeetingLink(meetingCode || '')
  const { data: isPreviousUserData } = usePreviousUser(
    meetingData?.meetingId ?? 0,
  )

  const { refetch: checkMyInfo } = useGetParticipantsMe(
    meetingData?.meetingId ?? 0,
  )

  const handleEnterClick = useCallback(async () => {
    if (!meetingData?.meetingId) return

    if (isPreviousUserData.isPreviousUser) {
      try {
        await checkMyInfo()
        router.push('/meeting-home')
      } catch (error) {
        console.error('Error checking token validity:', error)
      }
    } else {
      onEnterClick()
    }
  }, [
    isPreviousUserData,
    meetingData?.meetingId,
    router,
    onEnterClick,
    checkMyInfo,
  ])

  useEffect(() => {
    if (meetingCode && isSuccess && data) {
      setMeetingData(data.data)
    }
  }, [meetingCode, isSuccess, data, setMeetingData])

  const shortDescription =
    meetingData?.description && meetingData.description.length > maxLength
      ? `${meetingData?.description.substring(0, maxLength)}...`
      : meetingData?.description

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen w-full p-4">
      <div className="flex items-start">
        <button type="button" onClick={onHomeClick} className="">
          <Image src={BackIcon} alt="back" width={10} height={18} />
        </button>
      </div>
      <div className="text-gray-900 font-bold text-[22px] mt-9">
        모임 앨범을 찾았어요!
      </div>
      <div className="text-gray-900 font-bold text-[22px]">
        모임 앨범에 입장하시겠어요?
      </div>
      <div className="flex flex-col bg-point-mint rounded-[14px] mx-6 my-auto px-5 py-7 text-white">
        <div className="flex w-full">
          <div className="w-11 max-h-11 mr-3 relative">
            {meetingData?.thumbnailUrl ? (
              <Image
                loader={({ src }) => src}
                src={`${IMAGE_BASE_URL}/${meetingData.thumbnailUrl}`}
                alt="thumbnail"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                unoptimized
              />
            ) : (
              <Image
                src={Logo}
                alt="thumbnail"
                layout="fill"
                objectFit="contain"
              />
            )}
          </div>
          <div className="flex flex-col">
            <div className="text-gray-100 text-label">나의 모임</div>
            <div className="text-gray-100 text-body1-semibold">
              {meetingData?.name}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="bg-gray-100 bg-opacity-30 text-white text-label-semibold px-2 py-1 rounded-[4px]">
            모임 진행 중
          </div>
          <div className="text-white text-label-light">
            {dayjs(meetingData?.endDate).format('YYYY.MM.DD')}
          </div>
        </div>
        <div className="h-[1px] w-full bg-white mt-4" />
        <div className="text-label-light mt-4">{shortDescription}</div>
      </div>

      <div className="flex mt-auto mb-5">
        <Button
          type="button"
          variant="light"
          className="mr-2 w-28"
          onClick={onBackClick}
        >
          이전
        </Button>
        <Button
          onClick={handleEnterClick}
          fullWidth
          variant="primary"
          className="text-white"
        >
          입장하기
        </Button>
      </div>
    </div>
  )
}

export default MeetingInfo
