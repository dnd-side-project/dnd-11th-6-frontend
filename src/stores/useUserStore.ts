import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserState {
  participantId: number
  nickname: string
  role: 'LEADER' | 'PARTICIPANT' | string
  shootCount: number
}

interface UserActions {
  setParticipantId: (participantId: number) => void
  setNickname: (nickname: string) => void
  setRole: (role: 'LEADER' | 'PARTICIPANT') => void
  setShootCount: (shootCount: number) => void
  clearUserData: () => void
}

interface UserStore extends UserState, UserActions {}

const initialState: UserState = {
  participantId: 0,
  nickname: '',
  role: 'PARTICIPANT',
  shootCount: 0,
}

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      ...initialState,
      setParticipantId: (participantId) => set({ participantId }),
      setNickname: (nickname) => set({ nickname }),
      setRole: (role) => set({ role }),
      setShootCount: (shootCount) => set({ shootCount }),
      clearUserData: () => set(initialState),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default useUserStore
