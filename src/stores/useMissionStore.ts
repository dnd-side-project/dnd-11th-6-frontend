import { create } from 'zustand'

interface MissionState {
  missionType: 'random' | 'select'
  setMissionType: (type: 'random' | 'select') => void
  currentMission: string | null
  setCurrentMission: (mission: string | null) => void
}

const useMissionStore = create<MissionState>((set) => ({
  missionType: 'random',
  setMissionType: (type) => set({ missionType: type }),
  currentMission: null,
  setCurrentMission: (mission) => set({ currentMission: mission }),
}))

export default useMissionStore
