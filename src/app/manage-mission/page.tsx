'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  useDeleteMission,
  useGetLeaderMission,
} from '@/apis/queries/missionQuries'
import { Button } from '@/components/Button'
import Loading from '@/components/Loading'
import useMeetingStore from '@/stores/useMeetingStore'
import Back from 'public/icons/back.svg'
import PlusGray from 'public/icons/plus-gray.svg'
import Trash from 'public/icons/trash.svg'
import AuthGuard from '../AuthGuard'
import NewMission from './_components/NewMission'

interface Mission {
  missionId: number
  content: string
  hasParticipants: boolean
}

function ManageMission() {
  const router = useRouter()
  const [isNewMissionOpen, setIsNewMissionOpen] = useState(false)
  const meetingId = useMeetingStore(
    (state) => state.meetingData?.meetingId ?? 0,
  )
  const [apiErrorMessage] = useState<string | null>(null)

  const {
    data: missions,
    isLoading,
    error: getMissionError,
    isError,
    refetch,
  } = useGetLeaderMission(meetingId)

  const deleteMission = useDeleteMission({
    onError: (error) => {
      console.error('미션 삭제 실패:', error)
    },
  })

  const handleMissionSuccess = () => {
    setIsNewMissionOpen(false)
  }

  useEffect(() => {
    if (isError) {
      console.error(getMissionError)
    }
  }, [isError, getMissionError])

  useEffect(() => {
    if (!isNewMissionOpen) {
      refetch()
    }
  }, [isNewMissionOpen, refetch])

  const handleDeleteMission = (missionId: number) => {
    deleteMission.mutate({ meetingId, missionId })
  }

  if (isLoading) return <Loading />
  if (apiErrorMessage) return <div>{apiErrorMessage}</div>

  return (
    <AuthGuard>
      <div>
        {isNewMissionOpen ? (
          <NewMission
            onClose={() => setIsNewMissionOpen(false)}
            onSuccess={handleMissionSuccess}
          />
        ) : (
          <div className="flex flex-col min-h-screen w-full p-4">
            <div className="flex items-center justify-center relative h-[50px]">
              <div className="absolute left-0">
                <Image src={Back} alt="back" onClick={() => router.back()} />
              </div>
              <div className="text-center text-body1-bold text-gray-900">
                모임 미션 관리
              </div>
            </div>
            <div className="text-gray-900 font-bold text-[22px] mt-9">
              우리 모임만의 미션이에요
            </div>
            <div className="text-gray-700 font-normal text-sm mt-2">
              현재까지 총 {missions?.data.length || 0}개의 모임 미션이
              생성되었어요
            </div>
            <Button
              className="mt-10 border-dashed text-gray-500"
              variant="outline"
              onClick={() => {
                setIsNewMissionOpen(true)
              }}
            >
              <Image src={PlusGray} alt="plus" className="mr-2 w-3" />
              미션 추가하기
            </Button>
            <div className="mt-4">
              {missions?.data.map((mission: Mission) => (
                <div
                  key={mission.missionId}
                  className="flex justify-between bg-gray-100 border-none px-5 py-4 rounded-lg mb-4"
                >
                  {mission.content}
                  {!mission.hasParticipants ? (
                    <button
                      onClick={() => handleDeleteMission(mission.missionId)}
                    >
                      <Image src={Trash} alt="trash" />
                    </button>
                  ) : (
                    <div className="text-point-mint bg-point-mint bg-opacity-10 rounded-full px-[6px] py-[3px] text-caption2-light">
                      진행중
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  )
}

export default ManageMission
