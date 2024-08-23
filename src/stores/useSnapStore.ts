import { create } from 'zustand'

interface SnapState {
  snapCount: number
  totalSnapCount: 10
}

interface SnapActions {
  setSnapCount: (count: number) => void
}

interface SnapStore extends SnapState, SnapActions {}

const useSnapStore = create<SnapStore>((set) => ({
  snapCount: 0,
  setSnapCount: (count) => set({ snapCount: count }),
  totalSnapCount: 10,
}))

export default useSnapStore
