'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button'
import { ToggleSwitch } from '@/components/ToogleSwitch'
import useMissionStore from '@/stores/useMissionStore'
import Back from 'public/icons/back.svg'
import Refresh from 'public/icons/refresh.svg'
import Twinkle from 'public/icons/twinkle.svg'
import Roulette from 'public/roulette.svg'

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
  const [visibleMissions, setVisibleMissions] = useState<string[]>(['?'])

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
        setVisibleMissions([randomMission])
      }
    }, 100)
  }

  const selectMission = (mission: string) => {
    console.log('selected mission: ', mission)
    setSelectedMission(mission)
  }

  const performMission = () => {
    setSelectedMission(null)
    setVisibleMissions(['?'])
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white p-4 flex items-center justify-between ">
        <button onClick={() => router.back()} className="text-2xl">
          <Image src={Back} alt="back" />
        </button>
        <h1 className="text-[18px] font-bold">미션 추가하기</h1>
        <div className="w-6" />
      </header>

      <ToggleSwitch
        leftOption="랜덤"
        rightOption="모임"
        value={missionType === 'select'}
        onChange={(value) => {
          setMissionType(value ? 'select' : 'random')
          setSelectedMission(null)
        }}
        width="220px"
        activeColor="bg-white"
        inactiveColor="bg-gray-200"
        activeTextColor="text-gray-900"
        inactiveTextColor="text-gray-500"
      />

      {missionType === 'random' ? (
        <div className="flex-grow flex flex-col items-center justify-center p-4 bg-white">
          <div className="relative w-full h-full">
            <Image src={Roulette} alt="roulette" className="w-full h-full" />
            <div className="roulette-text absolute inset-0 flex flex-col items-center justify-center transition-transform duration-100 ease-linear">
              {visibleMissions.map((mission, index) => (
                <div
                  key={index}
                  className="w-full h-full flex items-center justify-center px-12 text-center"
                >
                  <p className="text-heading1-semibold text-gray-800">
                    {mission}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-grow p-4 w-full max-w-md">
          {['DND 로고와 함께 사진찍기', '가장 연장자와 함께 사진찍기'].map(
            (mission, index) => (
              <Button
                type="button"
                variant="outline"
                key={index}
                padding="p-6"
                className={`w-full cursor-pointer text-gray-900 mb-3 font-semibold text-base ${selectedMission === mission ? 'border-[3px]' : ''}`}
                onClick={() => selectMission(mission)}
              >
                <div className="w-full flex justify-start">{mission}</div>
              </Button>
            ),
          )}
          <div className="text-gray-700 text-sm font-normal mt-5 mb-3">
            총 3개의 미션을 완료했어요!
          </div>
          {[
            'DND 로고와 함께 사진찍기',
            'DND 로고와 함께 사진찍기',
            'DND 로고와 함께 사진찍기',
          ].map((mission, index) => (
            <Button
              type="button"
              variant="light"
              key={index}
              padding="p-6"
              className="flex justify-between items-center w-full border-none text-gray-900 font-semibold text-base mb-3 cursor-pointer"
            >
              {mission}
              <Image src={Twinkle} alt="twinkle" />
            </Button>
          ))}
        </div>
      )}

      <div className="flex justify-center space-x-4 p-4">
        {missionType === 'random' ? (
          <>
            <Button
              type="button"
              variant={selectedMission ? 'light' : 'primary'}
              onClick={startSpinning}
              disabled={isSpinning}
              className={selectedMission ? 'w-20 px-3' : 'w-full text-white'}
            >
              {isSpinning ? (
                '미션 뽑는 중...'
              ) : selectedMission ? (
                <Image src={Refresh} alt="refresh" className="w-5" />
              ) : (
                '미션 뽑기'
              )}
            </Button>
            {selectedMission && (
              <Button
                type="button"
                variant="primary"
                onClick={performMission}
                className="w-full text-white"
              >
                미션 수행하기
              </Button>
            )}
          </>
        ) : (
          <Button
            type="button"
            variant="primary"
            onClick={performMission}
            disabled={!selectedMission}
            className="w-full text-white"
          >
            미션 수행하기
          </Button>
        )}
      </div>
    </div>
  )
}

export default MissionCreationPage
