'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import useMissionStore from '@/stores/useMissionStore'

const missions = [
  '여기에서 제일 연장자 찾기',
  '여기에서 제일 막내 찾기',
  '옆 사람 어깨 주물러주기',
  '옆 사람에게 칭찬 해주기',
  '지금 기분을 춤으로 표현하기',
  '가장 좋아하는 음식 말하기',
  '최근에 본 영화 추천하기',
  '1분 동안 눈 안 깜빡이고 있기',
  '좋아하는 노래 한 소절 부르기',
  '짝꿍과 손잡고 1분 동안 있기',
]

function MissionCreationPage() {
  const router = useRouter()
  const { missionType, setMissionType } = useMissionStore()
  const [isSpinning, setIsSpinning] = useState(false)
  const selectedMission = useMissionStore((state) => state.currentMission)
  const setSelectedMission = useMissionStore((state) => state.setCurrentMission)
  const [visibleMissions, setVisibleMissions] = useState<string[]>([
    '?',
    '?',
    '?',
  ])

  const startSpinning = () => {
    setIsSpinning(true)
    setSelectedMission(null)
    let counter = 0
    const spinInterval = setInterval(() => {
      setVisibleMissions((prevMissions) => {
        const newMissions = [...prevMissions]
        newMissions.pop()
        newMissions.unshift(
          missions[Math.floor(Math.random() * missions.length)],
        )
        return newMissions
      })
      counter += 1
      if (counter >= 30) {
        clearInterval(spinInterval)
        setIsSpinning(false)
        const randomMission =
          missions[Math.floor(Math.random() * missions.length)]
        setSelectedMission(randomMission)
        setVisibleMissions([randomMission, '?', '?'])
      }
    }, 100)
  }

  const selectMission = (mission: string) => {
    console.log('selected mission: ', mission)
    setSelectedMission(mission)
  }

  const performMission = () => {
    setSelectedMission(null)
    setVisibleMissions(['?', '?', '?'])
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white p-4 flex items-center justify-between ">
        <button onClick={() => router.back()} className="text-2xl">
          &lt;
        </button>
        <h1 className="text-xl font-bold">미션 뽑기</h1>
        <div className="w-6" />
      </header>

      <div className="flex justify-center p-4 bg-white">
        <button
          type="button"
          className={`px-4 py-2 rounded-l-full ${missionType === 'random' ? 'bg-black text-white' : 'bg-gray-200'}`}
          onClick={() => {
            setMissionType('random')
            setSelectedMission(null)
          }}
        >
          랜덤 미션
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded-r-full ${missionType === 'select' ? 'bg-black text-white' : 'bg-gray-200'}`}
          onClick={() => {
            setMissionType('select')
            setSelectedMission(null)
          }}
        >
          모임 미션
        </button>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center p-4 bg-gray-300">
        {missionType === 'random' ? (
          <div className="w-64 h-64 mb-8 overflow-hidden">
            <div
              className={`flex flex-col items-center transition-transform duration-100 ease-linear ${isSpinning ? '-translate-y-1/3' : ''}`}
            >
              {visibleMissions.map((mission, index) => (
                <div
                  key={index}
                  className="w-full h-64 bg-white shadow-md rounded-lg flex items-center justify-center p-4 text-center mb-4"
                >
                  <p className="text-lg font-semibold">{mission}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md">
            {missions.map((mission, index) => (
              <button
                type="button"
                key={index}
                className={`w-full p-4 bg-white mb-2 rounded-lg cursor-pointer ${selectedMission === mission ? ' cursor-pointer bg-red-200' : ''}`}
                onClick={() => selectMission(mission)}
              >
                {mission}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center space-x-4 p-4">
        {missionType === 'random' ? (
          <>
            <button
              type="button"
              onClick={startSpinning}
              disabled={isSpinning}
              className="px-6 py-2 bg-blue-500 text-white rounded-full disabled:bg-gray-400"
            >
              {isSpinning ? '돌리는 중...' : '룰렛 돌리기'}
            </button>
            {selectedMission && (
              <button
                type="button"
                onClick={performMission}
                className="px-6 py-2 bg-green-500 text-white rounded-full"
              >
                미션 수행하기
              </button>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={performMission}
            disabled={!selectedMission}
            className="px-6 py-2 bg-green-500 text-white rounded-full disabled:bg-gray-400"
          >
            미션 수행하기
          </button>
        )}
      </div>
    </div>
  )
}

export default MissionCreationPage
