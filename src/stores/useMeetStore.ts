import { create } from 'zustand'

interface MeetState {
  step: number
  pin: string
}

interface MeetActions {
  setStep: (step: number) => void
  setPin: (pin: string) => void
}

interface MeetStore extends MeetState, MeetActions {}

const useMeetStore = create<MeetStore>((set) => ({
  step: 1,
  setStep: (step: number) => set({ step }),
  pin: '',
  setPin: (pin: string) => set({ pin }),
}))

export default useMeetStore
