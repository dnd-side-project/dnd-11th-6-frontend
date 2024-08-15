import Image from 'next/image'
import { Button } from '@/components/Button'
// import useMeetingStore from '@/stores/useMeetingStore'
import BackIcon from 'public/icons/back.svg'

interface MeetingInfoProps {
  onEnterClick: () => void
  onBackClick: () => void
}

function MeetingInfo({ onEnterClick, onBackClick }: MeetingInfoProps) {
  const maxLength = 75
  // const meetingData = useMeetingStore((state) => state.meetingData)
  // const shortDescription =
  // meetingData.description.length > maxLength
  //   ? `${meetingData.description.substring(0, maxLength)}...`
  //   : meetingData.description

  // below is for testing
  const meetingDataDescription: string =
    'DND는 개발자와 디자이너를 위한 계속해서 성장하는 IT비영리단체입니다.DND는 개발자와 디자이너를 위한 계속해서 성장하는 IT비영리이고 여기는 생략되는 부분 여기는 생략되는 부분'
  const shortDescription =
    meetingDataDescription.length > maxLength
      ? `${meetingDataDescription.substring(0, maxLength)}...`
      : meetingDataDescription
  // above is for testing

  return (
    <div className="flex flex-col min-h-screen w-full p-4">
      <div className="flex items-start">
        <button type="button" onClick={onBackClick} className="">
          <Image src={BackIcon} alt="back" />
        </button>
      </div>
      <div className="text-gray-900 font-bold text-[22px] mt-9">
        모임 앨범을 찾았어요!
      </div>
      <div className="text-gray-900 font-bold text-[22px]">
        모임 앨범에 입장하시겠어요?
      </div>
      <div className="flex flex-col bg-point-blue rounded-[14px] mx-6 my-auto px-5 py-7 text-white">
        <div className="flex w-full">
          <div className="bg-point-yellow rounded-full w-11 max-h-11 mr-3">
            {/* <Image src={meetingData?.thumbnailUrl} alt="thumbnail" /> */}
          </div>
          <div className="flex flex-col">
            <div className="text-gray-400 text-sm">나의 모임</div>
            <div className="text-gray-100 text-lg font-bold ">
              {' '}
              DND 네트워킹
              {/* {meetingData?.name} */}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="bg-gray-100 bg-opacity-30 text-gray-100 text-sm font-semibold px-2 py-1 rounded-[4px]">
            모임 진행 중
          </div>
          <div className="text-gray-400 text-sm font-normal">
            2024.08.10
            {/* {meetingData?.endDate} */}
          </div>
        </div>
        <div className="h-[1px] w-full bg-white mt-4" />
        <div className="text-sm font-normal mt-4">
          {shortDescription}
          {/* {meetingData?.description} */}
        </div>
      </div>

      <Button onClick={onEnterClick} variant="primary" className="mt-auto mb-5">
        입장하기
      </Button>
    </div>
  )
}

export default MeetingInfo
