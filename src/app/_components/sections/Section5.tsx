import Image from 'next/image'
import { Button } from '@/components/Button'
import TeamMember from '../TeamMember'

function Section5() {
  return (
    <section className="snap-start h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="w-full text-center opacity-0 transform translate-y-4 transition duration-1000 ease-in-out animate-fadeIn">
        <div className="bg-gray-800 flex flex-col justify-center items-center py-6">
          <Image
            src="./icons/logo-white.svg"
            alt="White Logo Icon"
            width={39}
            height={39}
            className="mb-4"
          />
          <h2 className="text-[22px] font-bold mb-4 leading-[30px]">
            스냅피와 함께
            <br />
            모임의 순간을 포착해보세요!
          </h2>
          <Button
            className="bg-yellow-400 font-bold"
            type="submit"
            fullWidth
            variant="light"
          >
            새로운 모임 앨범 만들어보기
          </Button>
        </div>
        <div className="border-t border-gray-700 mt-16 mx-auto w-[360px]" />
        <div className="flex flex-col text-gray-500 text-left px-4">
          <p className="mt-8 text-lg font-bold mb-1">
            스냅피에 대해서 다양한 의견을 주세요.
          </p>
          <p className="text-sm">
            여러분의 소중한 의견을 바탕으로 더 나아질 수 있어요.
          </p>
          <div>
            <button className="underline mt-2 mr-2 transition duration-300">
              google
            </button>
            <button className="underline mt-2 mr-2 transition duration-300">
              form
            </button>
            <button className="underline mt-2 transition duration-300">
              link
            </button>
          </div>
          <div className="my-6">
            <h3 className="font-bold mb-1">스냅피를 만든 사람들</h3>
            <p className="text-sm">DND 11기 6조</p>
            <div className="flex flex-col mt-2">
              <TeamMember snappyRole="Design" members="박서현 | 윤조현" />
              <TeamMember snappyRole="Frontend" members="서다원 | 이지훈" />
              <TeamMember snappyRole="Backend" members="박채원 | 이재훈" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section5
