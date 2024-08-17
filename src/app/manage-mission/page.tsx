'use client'

import { useState } from 'react'
// import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { Button } from '@/components/Button'
import Close from 'public/icons/close.svg'
import Trash from 'public/icons/trash.svg'
import NewMission from './_components/NewMission'

// interface Mission {
//   id: string
//   content: string
//   isDeletable: boolean
// }

function ManageMission() {
  const [isNewMissionOpen, setIsNewMissionOpen] = useState(false)
  const [apiErrorMessage] = useState<string | null>(null)

  // ======== TODO: Replace this with the actual API call =========

  // const {
  //   data: missions,
  //   isLoading,
  //   isError,
  //   error,
  //   refetch,
  // } = useQuery<
  //   {
  //     data: Mission[]
  //     status: number
  //     error: { code: string; message: string }
  //   },
  //   { data: any; status: number; error: { code: string; message: string } }
  // >({
  //   queryKey: ['missions'],
  //   queryFn: async () => {
  //     const response = await fetch('/api/v1/missions')
  //     const result = await response.json()
  //     if (!response.ok) throw result
  //     return result
  //   },
  //   retry: false,
  // })

  // useEffect(() => {
  //   if (isError) {
  //     if (error.error.code === 'FETCH_ERROR') {
  //       setApiErrorMessage('미션 목록을 불러오는데 실패했습니다.')
  //     } else {
  //       setApiErrorMessage('오류가 발생했습니다. 다시 시도해주세요.')
  //     }
  //   } else {
  //     setApiErrorMessage(null)
  //   }
  // }, [isError, error])

  // const handleMissionSuccess = () => {
  //   refetch()
  // }

  // if (isLoading) return <div>Loading...</div>
  if (apiErrorMessage) return <div>{apiErrorMessage}</div>

  return (
    <div>
      {isNewMissionOpen ? (
        <NewMission
          onClose={() => setIsNewMissionOpen(false)}
          // onSuccess={handleMissionSuccess}
        />
      ) : (
        <div className="flex flex-col min-h-screen w-full p-4">
          {' '}
          <div className="flex justify-end">
            <button type="button" className="">
              <Image src={Close} alt="close" />
            </button>
          </div>
          <div className="text-gray-900 font-bold text-[22px] mt-9">
            우리 모임만의 미션이에요
          </div>
          <div className="text-gray-700 font-normal text-sm mt-2">
            {/* 현재까지 총 [{missions?.data.length || 0}]개의 모임 미션이
            생성되었어요 */}
            현재까지 총 [0]개의 모임 미션이 생성되었어요
          </div>
          <Button
            className="mt-10"
            variant="light"
            onClick={() => {
              setIsNewMissionOpen(true)
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M5.99922 1.2002L5.99922 10.8002M10.7992 6.00019L1.19922 6.0002"
                stroke="#1E1E1E"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            새로운 미션 등록하기
          </Button>
          <div className="mt-4">
            {/* {missions?.data.map((mission: Mission) => (
              <div
                key={mission.id}
                className="flex justify-between bg-white border border-gray-900 px-5 py-4 rounded-lg mb-3"
              >
                {mission.content}
                {mission.isDeletable ? (
                  <Image src={Trash} alt="trash" />
                ) : (
                  <div className="bg-black bg-opacity-10 rounded-full px-[6px] py-[3px] text-[10px]">
                    진행중
                  </div>
                )}
              </div>
            ))} */}
            <div className="flex justify-between bg-white border border-gray-900 px-5 py-4 rounded-lg mb-3">
              미션 내용
              <Image src={Trash} alt="trash" />
            </div>
            <div className="flex justify-between bg-white border border-gray-900 px-5 py-4 rounded-lg mb-3">
              미션 내용
              <div className="bg-black bg-opacity-10 rounded-full px-[6px] py-[3px] text-[10px]">
                진행중
              </div>{' '}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageMission
