import { create } from 'zustand'

interface UserState {
  participantId: number
  nickname: string
  role: 'LEADER' | 'PARTICIPANT'
  shootCount: number
}

interface UserActions {
  setParticipantId: (participantId: number) => void
  setNickname: (nickname: string) => void
  setRole: (role: 'LEADER' | 'PARTICIPANT') => void
  setShootCount: (shootCount: number) => void
}

interface UserStore extends UserState, UserActions {}

const useUserStore = create<UserStore>((set) => ({
  participantId: 0,
  nickname: '',
  role: 'PARTICIPANT',
  shootCount: 0,
  setParticipantId: (participantId) => set({ participantId }),
  setNickname: (nickname) => set({ nickname }),
  setRole: (role) => set({ role }),
  setShootCount: (shootCount) => set({ shootCount }),
}))

export default useUserStore
