import { create } from 'zustand'

interface MissionState {
  missionId: number
  missionType: 'random' | 'select'
  currentMission: string | null
}

interface MissionActions {
  setMissionId: (id: number) => void
  setMissionType: (type: 'random' | 'select') => void
  setCurrentMission: (mission: string | null) => void
}

interface MissionStore extends MissionState, MissionActions {}

const useMissionStore = create<MissionStore>((set) => ({
  missionId: 0,
  setMissionId: (id) => set({ missionId: id }),
  missionType: 'random',
  setMissionType: (type) => set({ missionType: type }),
  currentMission: null,
  setCurrentMission: (mission) => set({ currentMission: mission }),
}))

export default useMissionStore
