import { create } from 'zustand'

type MeetState = {
  step: number
  pin: string
}

type MeetActions = {
  setStep: (step: number) => void
  setPin: (pin: string) => void
}

type MeetStore = MeetState & MeetActions

const useMeetStore = create<MeetStore>((set) => ({
  step: 1,
  setStep: (step: number) => set({ step }),
  pin: '',
  setPin: (pin: string) => set({ pin }),
}))

export default useMeetStore
