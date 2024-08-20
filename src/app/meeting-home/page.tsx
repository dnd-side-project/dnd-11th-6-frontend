'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Chip from '@/components/Chip'
import SnapProgressBar from '@/components/SnapProgressBar'

function MeetingHomePage() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="pb-20">
      <div
        className={`sticky top-0 bg-white z-50 transition-all duration-300 ${scrollPosition > 50 ? 'shadow-md' : ''}`}
      >
        <div className="flex items-center p-4">
          <div className="w-10 h-10 bg-black rounded-full mr-2" />
          <h1 className="text-xl font-bold">DND 네트워킹</h1>
        </div>
        <div className="px-4 py-2 bg-blue-100 text-blue-800">
          모임 진행 중: 2024.08.10까지 촬영 가능해요!
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">
            알루리루붐님의 스냅피 활동
          </h2>
          <SnapProgressBar totalSnaps={10} takenSnaps={5} />
        </div>
        <div className="flex space-x-2 p-4 overflow-x-auto">
          <Chip label="전체" active />
          <Chip label="랜덤미션" />
          <Chip label="모임미션" />
          <Chip label="내가찍은" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 p-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="aspect-square relative">
            <Image
              src={`/placeholder-image-${index + 1}.jpg`}
              alt={`Photo ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-between p-4 bg-white shadow-top animate-float">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full">
          스냅찍기
        </button>
        <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full">
          다운로드
        </button>
      </div>
    </div>
  )
}

export default MeetingHomePage
