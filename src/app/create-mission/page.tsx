'use client'

import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  getCompletedMissions,
  getIncompleteMissions,
  getRandomMissions,
} from '@/apis/missionApi'
import { Button } from '@/components/Button'
import Loading from '@/components/Loading'
import { ToggleSwitch } from '@/components/ToogleSwitch'
import useMeetingStore from '@/stores/useMeetingStore'
import useMissionStore from '@/stores/useMissionStore'
import { ApiError } from '@/types/api'
import {
  GetCompletedMissionsResponse,
  GetInCompleteMissionResponse,
  GetRandomMissionsResponse,
} from '@/types/mission'
import Back from 'public/icons/back.svg'
import Refresh from 'public/icons/refresh.svg'
import Twinkle from 'public/icons/twinkle.svg'
import Roulette from 'public/roulette.svg'
import AuthGuard from '../AuthGuard'

function MissionCreationPage() {
  const router = useRouter()
  const {
    missionId,
    missionType,
    currentMission,
    setMissionId,
    setMissionType,
    setCurrentMission,
  } = useMissionStore()
  const meetingSymbolColor = useMeetingStore(
    (state) => state.meetingData?.symbolColor,
  )
  const [isSpinning, setIsSpinning] = useState(false)
  const meetingId = useMeetingStore().meetingData?.meetingId
  const [visibleMissions, setVisibleMissions] = useState<string[]>(['?'])

  const {
    data: randomMissions,
    isLoading: randomMissionLoading,
    isError: randomMissionError,
  } = useQuery<GetRandomMissionsResponse, ApiError>({
    queryKey: ['missions', 'random'],
    queryFn: () => getRandomMissions(),
    retry: false,
  })

  const {
    data: completedMission,
    isLoading: completedMissionLoading,
    isError: completedMissionError,
  } = useQuery<GetCompletedMissionsResponse, ApiError>({
    queryKey: ['missions', meetingId, 'completed'],
    queryFn: () => {
      if (!meetingId) throw new Error('Meeting ID not found')
      return getCompletedMissions(meetingId)
    },
    enabled: !!meetingId,
    retry: false,
  })

  const {
    data: inCompleteMission,
    isLoading: inCompleteMissionLoading,
    isError: inCompleteMissionError,
  } = useQuery<GetInCompleteMissionResponse, ApiError>({
    queryKey: ['missions', meetingId, 'incomplete'],
    queryFn: () => {
      if (!meetingId) throw new Error('Meeting ID not found')
      return getIncompleteMissions(meetingId)
    },
    enabled: !!meetingId,
    retry: false,
  })

  useEffect(() => {
    if (randomMissions && randomMissions.data.length > 0) {
      setVisibleMissions([randomMissions.data[0].content])
    }
  }, [randomMissions])

  useEffect(() => {
    if (!missionType) {
      setMissionType('random')
    }
  }, [])

  useEffect(() => {
    if (randomMissions?.data && randomMissions.data.length > 0) {
      setVisibleMissions([randomMissions.data[0].content])
    }
  }, [randomMissions])

  useEffect(() => {
    if (!missionType) {
      setMissionType('random')
    }
  }, [])

  const startSpinning = async () => {
    setIsSpinning(true)
    setCurrentMission(null)
    let counter = 0
    const spinInterval = setInterval(() => {
      setVisibleMissions((prevMissions) => {
        const newMissions = [...prevMissions]
        newMissions.pop()
        newMissions.unshift(
          randomMissions?.data[
            Math.floor(Math.random() * randomMissions.data.length)
          ]?.content || '?',
        )
        return newMissions
      })
      counter += 1
      if (counter >= 30) {
        clearInterval(spinInterval)
        setIsSpinning(false)
        const selectedMission =
          randomMissions?.data[
            Math.floor(Math.random() * randomMissions.data.length)
          ]
        if (selectedMission) {
          setCurrentMission(selectedMission.content)
          setMissionId(selectedMission.randomMissionId)
          setVisibleMissions([selectedMission.content])
        }
      }
    }, 100)
  }

  const selectMission = (mission: {
    missionId?: number
    missionType: string
    currentMission: string
  }) => {
    console.log('selected mission: ', mission.currentMission)
    setCurrentMission(mission.currentMission)
    if (mission.missionType === 'random' || mission.missionType === 'select') {
      setMissionType(mission.missionType)
    } else {
      console.error('Invalid mission type:', mission.missionType)
    }

    if (mission.missionId !== null) {
      setMissionId(mission.missionId ?? 0)
    }
  }

  const performMission = () => {
    console.log('selected mission: ', currentMission)
    setCurrentMission(currentMission)
    if (missionId !== null) {
      setMissionId(missionId)
    }
    setVisibleMissions(['?'])
    router.back()
  }

  if (
    completedMissionLoading ||
    inCompleteMissionLoading ||
    randomMissionLoading
  ) {
    return <Loading />
  }

  if (completedMissionError || inCompleteMissionError || randomMissionError) {
    return <div>미션 정보를 불러오는데 실패했습니다.</div>
  }

  return (
    <AuthGuard>
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
            setCurrentMission(null)
            setMissionId(null)
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
            {inCompleteMission?.data.map((mission) => (
              <Button
                type="button"
                variant="outline"
                key={mission.missionId}
                className={`w-full cursor-pointer text-gray-900 mb-3 font-semibold text-base ${
                  currentMission === mission.content ? 'border-[3px]' : ''
                }`}
                style={
                  currentMission === mission.content
                    ? { borderColor: meetingSymbolColor || '#000000' }
                    : undefined
                }
                onClick={() =>
                  selectMission({
                    missionId: mission.missionId,
                    missionType: 'select',
                    currentMission: mission.content,
                  })
                }
              >
                <div className="w-full flex justify-start">
                  {mission.content}
                </div>
              </Button>
            ))}
            <div className="text-gray-700 text-sm font-normal mt-5 mb-3">
              총 {completedMission?.data.length}개의 미션을 완료했어요!
            </div>
            {completedMission?.data.map((mission) => (
              <Button
                type="button"
                variant="light"
                key={mission.missionId}
                className="flex justify-between items-center w-full border-none text-gray-900 font-semibold text-base mb-3 cursor-pointer"
              >
                {mission.content}
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
                variant={currentMission ? 'light' : 'primary'}
                onClick={startSpinning}
                disabled={isSpinning}
                className={currentMission ? 'w-20' : 'w-full text-white'}
                style={{
                  backgroundColor: currentMission
                    ? undefined
                    : meetingSymbolColor || '#000000',
                }}
              >
                {isSpinning ? (
                  '미션 뽑는 중...'
                ) : currentMission ? (
                  <Image src={Refresh} alt="refresh" className="w-4" />
                ) : (
                  '미션룰렛 돌리기'
                )}
              </Button>
              {currentMission && (
                <Button
                  type="button"
                  variant="primary"
                  onClick={performMission}
                  className="w-full text-white"
                  style={{ backgroundColor: meetingSymbolColor || '#000000' }}
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
              disabled={!currentMission}
              className="w-full text-white"
              style={{ backgroundColor: meetingSymbolColor || '#000000' }}
            >
              미션 수행하기
            </Button>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}

export default MissionCreationPage
