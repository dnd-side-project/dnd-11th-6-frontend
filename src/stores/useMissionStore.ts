import { create } from 'zustand'

interface MissionState {
  missionType: 'random' | 'select'
  currentMission: string | null
}

interface MissionActions {
  setMissionType: (type: 'random' | 'select') => void
  setCurrentMission: (mission: string | null) => void
}

interface MissionStore extends MissionState, MissionActions {}

const useMissionStore = create<MissionStore>((set) => ({
  missionType: 'random',
  setMissionType: (type) => set({ missionType: type }),
  currentMission: null,
  setCurrentMission: (mission) => set({ currentMission: mission }),
}))

export default useMissionStore
