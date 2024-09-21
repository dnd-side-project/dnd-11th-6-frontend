import Lottie from 'lottie-react'
import { Button } from '@/components/Button'
import useUserStore from '@/stores/useUserStore'
import CloseSvg from 'public/icons/CloseSvg'
import welcomeAnimation from 'public/lotties/welcome.json'

interface WelcomeProps {
  onEnterClick: () => void
  onBackClick?: () => void
}

function Welcome({ onEnterClick, onBackClick }: WelcomeProps) {
  const nickname = useUserStore((state) => state.nickname)

  return (
    <div className="flex flex-col min-h-screen w-full p-4">
      <div className="flex justify-end">
        <button type="button" onClick={onBackClick} aria-label="close">
          <CloseSvg size={24} />
        </button>
      </div>
      <div className="text-gray-900 font-bold text-[22px] mt-9">
        {nickname}님!
      </div>
      <div className="text-gray-900 font-bold text-[22px]">
        모임 앨범에 들어오신걸 환영해요!
      </div>
      <div className="flex-grow flex items-center justify-center">
        <Lottie
          animationData={welcomeAnimation}
          loop={false}
          style={{ width: 300, height: 300 }}
        />
      </div>
      <Button
        onClick={onEnterClick}
        variant="primary"
        className="mt-auto mb-5 text-white"
      >
        앨범 둘러보기
      </Button>
    </div>
  )
}

export default Welcome
