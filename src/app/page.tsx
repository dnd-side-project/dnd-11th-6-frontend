'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'

function Home() {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {/* Section 1 */}
      <section className="snap-start h-screen flex flex-col items-center justify-center bg-white">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center"
        >
          <Image
            src="/snappy-logo.png"
            alt="Snappy Logo"
            width={100}
            height={100}
          />
          <h1 className="text-3xl font-bold mt-4">Snappy</h1>
          <p className="mt-2">즐거운 모임의 순간들을 스냅피와 포착해보세요</p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="bg-gray-200 p-4 rounded-lg">
              내 모임 앨범
              <br />
              참여하기
            </button>
            <button className="bg-gray-200 p-4 rounded-lg">
              새로운 모임 앨범
              <br />
              만들기
            </button>
          </div>
          <p className="mt-8">둘러서 설명보기</p>
          <div className="mt-2">↓</div>
        </motion.div>
      </section>

      {/* Section 2 */}
      <section className="snap-start h-screen flex flex-col items-center justify-center bg-black text-white">
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={fadeInUp}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Snappy는?</h2>
          <p className="mb-8">
            스냅피는
            <br />
            모임의 시간을 재밌게 즐길 수 있는
            <br />
            사진 앨범 서비스에요
          </p>
          <div className="bg-yellow-400 rounded-full p-8 inline-block">
            <Image
              src="/flags-icon.png"
              alt="Flags Icon"
              width={100}
              height={100}
            />
          </div>
        </motion.div>
      </section>

      {/* Section 3 */}
      <section className="snap-start h-screen flex flex-col items-center justify-center bg-black text-white">
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={fadeInUp}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4">모임앨범</h2>
          <p className="mb-8">
            우리 모임만의
            <br />
            프라이빗한 앨범을 만들 수 있어요
          </p>
          <p className="text-sm text-gray-400">자유롭게 사진을 찍고 공유해요</p>
          <div className="mt-8 flex justify-center space-x-4">
            <div className="w-20 h-20 bg-yellow-400" />
            <div className="w-20 h-20 bg-blue-600" />
            <div className="w-20 h-20 bg-yellow-400" />
          </div>
        </motion.div>
      </section>

      {/* Section 4 */}
      <section className="snap-start h-screen flex flex-col items-center justify-center bg-black text-white">
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={fadeInUp}
          className="text-center"
        >
          <Image
            src="/lock-icon.png"
            alt="Lock Icon"
            width={50}
            height={50}
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold mb-4">
            귀찮은 회원가입 없이
            <br />
            누구나 간단하게 만들 수 있어요.
          </h2>
          <p className="mb-4">
            모임 링크를 통해 간단하게 참여할 수 있어요.
            <br />
            보안을 위한 모임 암호만 입력하면 끝!
          </p>
          <Image
            src="/photo-icon.png"
            alt="Photo Icon"
            width={50}
            height={50}
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold mb-4">
            모임의 순간을
            <br />딱 10장만 찍을 수 있어요!
          </h2>
          <p className="mb-4">
            예쁜 사진을 위해 많은 시간을 쓰지마세요.
            <br />
            더욱 현장감 있는 사진으로 모임을 추억해보세요!
          </p>
          <Image
            src="/star-icon.png"
            alt="Star Icon"
            width={50}
            height={50}
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold mb-4">
            재밌게 사진을 찍을 수 있는
            <br />
            랜덤미션을 제공해요.
          </h2>
          <p>
            낯선 사람과도 어색함 없이
            <br />
            더욱 재미있는 추억을 남길 수 있을 거예요.
          </p>
        </motion.div>
      </section>

      {/* Section 5 */}
      <section className="snap-start h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={fadeInUp}
          className="text-center"
        >
          <Image
            src="/snappy-logo.png"
            alt="Snappy Logo"
            width={100}
            height={100}
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold mb-4">
            스냅피와 함께
            <br />
            모임의 순간을 포착해보세요!
          </h2>
          <button className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-full mt-8">
            새로운 모임 앨범 만들어보기
          </button>
          <p className="mt-8 text-sm">
            스냅피에 대해서 다양한 의견을 주세요.
            <br />
            여러분의 소중한 의견을 바탕으로 더 나아질 수 있어요.
          </p>
          <a href="#" className="text-yellow-400 underline mt-2 inline-block">
            google form link
          </a>
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
        </motion.div>
      </section>
    </div>
  )
}

export default Home
