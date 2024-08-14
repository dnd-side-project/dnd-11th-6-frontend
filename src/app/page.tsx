'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Home() {
  const section2Ref = useRef<HTMLElement>(null)

  const scrollToSection2 = () => {
    section2Ref.current?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <div className=" h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory">
      {/* Section 1 */}
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
              className="flex items-center justify-center flex-col bg-gray-900 text-white p-9 rounded-2xl transition duration-300 "
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
              className="flex items-center justify-center flex-col bg-gray-900 text-white p-9 rounded-2xl transition duration-300 "
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

      {/* Section 2 */}
      <section
        ref={section2Ref}
        className=" h-screen flex flex-col items-center justify-center bg-gray-900 text-white snap-start"
      >
        <div className="text-left mb-6 px-4 w-full">
          <p className="text-sm font-medium mb-2 text-yellow-400">Snappy는?</p>
          <p className="text-[22px] font-bold line leading-[30px]">
            스냅피는
            <br />
            모임의 시간을 재밌게 즐길 수 있는
            <br />
            사진 앨범 서비스에요
          </p>
        </div>
        <Image src="/image1.svg" alt="Flags Icon" width={800} height={800} />
      </section>
      {/* Section 3 */}
      <section className="snap-start h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="text-left opacity-0 transform translate-y-4 transition duration-1000 ease-in-out animate-fadeIn">
          <h2 className="text-sm font-medium mb-2 text-yellow-400">모임앨범</h2>
          <p className="mb-2 text-xl font-bold">
            우리 모임만의
            <br />
            프라이빗한 앨범을 만들 수 있어요
          </p>
          <p className="text-sm text-gray-400">자유롭게 사진을 찍고 공유해요</p>
        </div>
        <Image src="/image2.svg" alt="Flags Icon" width={500} height={500} />
      </section>

      {/* Section 4 */}
      <section className="snap-start h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="text-left flex flex-col gap-10  opacity-0 transform translate-y-4 transition duration-1000 ease-in-out animate-fadeIn">
          <div>
            <Image
              src="/lock-slash.svg"
              alt="Lock Icon"
              width={50}
              height={50}
              className=" mb-2"
            />
            <h2 className="text-xl font-bold mb-2">
              귀찮은 회원가입 없이
              <br />
              누구나 간단하게 만들 수 있어요.
            </h2>
            <p className="mb-2 text-sm text-gray-400">
              모임 링크를 통해 간단하게 참여할 수 있어요.
              <br />
              보안을 위한 모임 암호만 입력하면 끝!
            </p>
          </div>
          <div>
            <Image
              src="/image.svg"
              alt="Photo Icon"
              width={50}
              height={50}
              className=" mb-2"
            />
            <h2 className="text-xl font-bold mb-2">
              모임의 순간을
              <br />딱 10장만 찍을 수 있어요!
            </h2>
            <p className="mb-2 text-sm text-gray-400">
              예쁜 사진을 위해 많은 시간을 쓰지마세요.
              <br />
              더욱 현장감 있는 사진으로 모임을 추억해보세요!
            </p>
          </div>
          <div>
            <Image
              src="/image3.svg"
              alt="Star Icon"
              width={50}
              height={50}
              className=" mb-2"
            />
            <h2 className="text-xl font-bold mb-2">
              재밌게 사진을 찍을 수 있는
              <br />
              랜덤미션을 제공해요.
            </h2>
            <p className=" text-sm text-gray-400">
              낯선 사람과도 어색함 없이
              <br />
              더욱 재미있는 추억을 남길 수 있을 거예요.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section className="snap-start h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="text-center opacity-0 transform translate-y-4 transition duration-1000 ease-in-out animate-fadeIn">
          <Image
            src="/logo.svg"
            alt="Snappy Logo"
            width={100}
            height={100}
            className="mx-auto mb-4"
          />
          <h2 className="text-xl font-bold mb-4 text-heading1">
            스냅피와 함께
            <br />
            모임의 순간을 포착해보세요!
          </h2>
          <button className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-full mt-8 transition duration-300 hover:bg-yellow-500">
            새로운 모임 앨범 만들어보기
          </button>
          <p className="mt-8 text-sm">
            스냅피에 대해서 다양한 의견을 주세요.
            <br />
            여러분의 소중한 의견을 바탕으로 더 나아질 수 있어요.
          </p>
          <button className="text-yellow-400 underline mt-2 inline-block hover:text-yellow-500 transition duration-300">
            google form link
          </button>
          <div className="mt-8">
            <h3 className="font-bold mb-2">스냅피를 만든 사람들</h3>
            <p>DND 11기 6조</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="font-bold">Design</p>
                <p>박서현 | 윤조현</p>
              </div>
              <div>
                <p className="font-bold">Frontend</p>
                <p>서다원 | 이지훈</p>
              </div>
              <div className="col-span-2">
                <p className="font-bold">Backend</p>
                <p>박채원 | 이재훈</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
