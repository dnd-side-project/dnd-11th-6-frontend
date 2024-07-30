'use client'

import React, { useState, useEffect } from 'react'

interface MissionRouletteProps {
  missions: string[]
  onStop: (mission: string) => void
}

function MissionRoulette({ missions, onStop }: MissionRouletteProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isSpinning) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % missions.length)
      }, 100) // 빠르게 회전
    }
    return () => clearInterval(interval)
  }, [isSpinning, missions])

  const startSpin = () => {
    setIsSpinning(true)
    setTimeout(
      () => {
        setIsSpinning(false)
        const selectedMission = missions[currentIndex]
        onStop(selectedMission)
      },
      Math.random() * 3000 + 2000,
    ) // 2-5초 사이에 랜덤하게 멈춤
  }

  return (
    <div className="relative w-full h-64 overflow-hidden bg-gray-100 rounded-lg shadow-lg">
      <div
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-in-out ${isSpinning ? 'animate-spin' : ''}`}
      >
        {missions.map((mission, index) => (
          <div
            key={index}
            className={`absolute w-full h-full flex items-center justify-center ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-100 ease-in-out`}
          >
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <p>{mission}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={startSpin}
        disabled={isSpinning}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full disabled:bg-gray-400"
      >
        {isSpinning ? 'STOP' : '룰렛 시작'}
      </button>
    </div>
  )
}

export default MissionRoulette
