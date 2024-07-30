'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import MissionRoulette from '@/components/Roulette/Roulette'

type MissionType = 'random' | 'group'

function MissionCreationPage() {
  const [missionType, setMissionType] = useState<MissionType>('random')
  const [missions, setMissions] = useState<string[]>([])
  const [newMission, setNewMission] = useState<string>('')
  const [selectedMission, setSelectedMission] = useState<string | null>(null)

  const handleAddMission = () => {
    if (newMission.trim()) {
      setMissions([...missions, newMission.trim()])
      setNewMission('')
    }
  }

  const handleRemoveMission = (index: number) => {
    setMissions(missions.filter((_, i) => i !== index))
  }

  const handleMissionStop = (mission: string) => {
    setSelectedMission(mission)
  }

  const handleSubmit = () => {
    if (missionType === 'random') {
      // 랜덤 미션 시작
    } else {
      // 모임 미션 시작
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white p-4 flex items-center justify-between shadow-md">
        <Link href="/" className="text-2xl">
          &lt;
        </Link>
        <h1 className="text-xl font-bold">미션 뽑기</h1>
        <div className="w-6" />
      </header>

      <div className="flex justify-center p-4 bg-white">
        <button
          type="button"
          className={`px-4 py-2 rounded-l-full ${missionType === 'random' ? 'bg-black text-white' : 'bg-gray-200'}`}
          onClick={() => setMissionType('random')}
        >
          랜덤 미션
        </button>
        <button
          type="button"
          className={`px-4 py-2 rounded-r-full ${missionType === 'group' ? 'bg-black text-white' : 'bg-gray-200'}`}
          onClick={() => setMissionType('group')}
        >
          모임 미션
        </button>
      </div>

      {missions.length > 0 && (
        <div className="p-4">
          <MissionRoulette missions={missions} onStop={handleMissionStop} />
        </div>
      )}

      {selectedMission && (
        <div className="p-4 bg-green-100 text-green-800 text-center">
          선택된 미션: {selectedMission}
        </div>
      )}

      <div className="flex-grow p-4 overflow-y-auto">
        {missions.map((mission, index) => (
          <div
            key={index}
            className="bg-white p-4 mb-2 rounded-lg shadow flex justify-between items-center"
          >
            <span>{mission}</span>
            <button
              type="button"
              onClick={() => handleRemoveMission(index)}
              className="text-red-500"
            >
              삭제
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex">
          <input
            type="text"
            value={newMission}
            onChange={(e) => setNewMission(e.target.value)}
            placeholder="여기에 제일 연장자 찍기"
            className="flex-grow p-2 border rounded-l-lg"
          />
          <button
            type="button"
            onClick={handleAddMission}
            className="bg-gray-200 px-4 py-2 rounded-r-lg"
          >
            추가
          </button>
        </div>
      </div>

      <div className="p-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-black text-white p-3 rounded-lg"
        >
          {missionType === 'random' ? '미션 뽑기' : '미션 수행하기'}
        </button>
      </div>
    </div>
  )
}

export default MissionCreationPage
