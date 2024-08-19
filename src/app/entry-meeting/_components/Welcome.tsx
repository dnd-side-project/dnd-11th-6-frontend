import Image from 'next/image'
import { Button } from '@/components/Button'
import useUserStore from '@/stores/useUserStore'
import Close from 'public/icons/close.svg'

interface WelcomeProps {
  onEnterClick: () => void
  onBackClick?: () => void
}

function Welcome({ onEnterClick, onBackClick }: WelcomeProps) {
  const nickname = useUserStore((state) => state.nickname)

  return (
    <div className="flex flex-col min-h-screen w-full p-4">
      <div className="flex justify-end">
        <button type="button" onClick={onBackClick} className="">
          <Image src={Close} alt="close" />
        </button>
      </div>
      <div className="text-gray-900 font-bold text-[22px] mt-9">
        {nickname}님!
      </div>
      <div className="text-gray-900 font-bold text-[22px]">
        모임 앨범에 들어오신걸 환영해요!
      </div>

      <Button onClick={onEnterClick} variant="primary" className="mt-auto mb-5">
        앨범 둘러보기
      </Button>
    </div>
  )
}

export default Welcome
