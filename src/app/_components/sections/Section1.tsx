import Image from 'next/image'
import Link from 'next/link'

interface Section1Props {
  scrollToSection2: () => void
}

function Section1({ scrollToSection2 }: Section1Props) {
  return (
    <section className="h-screen flex flex-col items-center justify-center bg-white snap-start">
      <div className="text-center">
        <Image
          src="/logo.svg"
          alt="Snappy Logo"
          width={50}
          height={50}
          className="m-auto"
        />
        <h1 className="text-4xl font-bold my-2">Snappy</h1>
        <p className="mt-2 font-normal text-lg text-gray-700">
          즐거운 모임의 순간들을 <br /> 스냅피와 포착해보세요
        </p>
        <div className="mt-16 grid grid-cols-2 gap-4">
          <Link
            href="/create-meeting"
            className="flex items-center justify-center flex-col bg-gray-900 text-white p-9 rounded-2xl transition duration-300"
          >
            <Image
              className="mb-3"
              src="./icons/plus.svg"
              alt="Plus Icon"
              width={44}
              height={44}
            />
            <span>
              새로운 모임 앨범
              <br />
              만들기
            </span>
          </Link>
          <Link
            href="/entry-meeting"
            className="flex items-center justify-center flex-col bg-gray-900 text-white p-9 rounded-2xl transition duration-300"
          >
            <Image
              className="mb-3"
              src="./icons/snap.svg"
              alt="Snap Icon"
              width={61.85}
              height={45.58}
            />
            <span className="text-white">
              내 모임 앨범
              <br />
              참여하기
            </span>
          </Link>
        </div>
        <button
          onClick={scrollToSection2}
          className="mt-20 m-auto flex flex-col items-center transition duration-300 cursor-pointer animate-move-up-down"
        >
          <p className="mb-2 font-bold text-gray-700 text-lg">
            눌러서 설명보기
          </p>
          <Image
            className="mb-3"
            src="./icons/double-down.svg"
            alt="DoubleDown Icon"
            width={24}
            height={24}
          />
        </button>
      </div>
    </section>
  )
}

export default Section1
