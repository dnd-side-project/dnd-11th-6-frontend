import Image from 'next/image'
import Link from 'next/link'

interface MeetingInfoProps {
  onEnterClick: () => void
}

function MeetingInfo({ onEnterClick }: MeetingInfoProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mb-12">
        <Image src="/favicon.ico" alt="Logo" width={40} height={40} />
      </div>
      <div className="flex flex-col justify-evenly items-center bg-[#E9E9E9] w-[295px] h-[356px] p-5 mb-12">
        <p>방 정보</p>
        <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
          <Image src="/favicon.ico" alt="Logo" width={40} height={40} />
        </div>
        <p>모임 이름</p>
        <p>모임 설명 입니다.</p>
        <p>yyyy.mm.dd-yyyy.mm.dd</p>
        <button
          type="button"
          onClick={onEnterClick}
          className="w-full bg-black text-white py-3 rounded-md relative"
        >
          입장하기
        </button>
      </div>
      <div className="mt-4">
        <p className="flex justify-center mb-4">
          직접 모임을 만들어보시겠어요?
        </p>
        <Link
          href="/create-meeting"
          className="inline-block w-[353px] py-3 bg-gray-200 text-gray-700 rounded-md text-center"
        >
          모임 앨범 만들기 &gt;
        </Link>
      </div>
    </div>
  )
}

export default MeetingInfo
