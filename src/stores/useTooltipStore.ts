import { create } from 'zustand'

type TooltipType = 'password' | 'admin' | null

interface TooltipState {
  activeTooltip: TooltipType
}

interface TooltipActions {
  showTooltip: (type: TooltipType) => void
  hideTooltip: () => void
}

interface TooltipStore extends TooltipState, TooltipActions {}

const useTooltipStore = create<TooltipStore>((set) => ({
  activeTooltip: null,
  showTooltip: (type) => set({ activeTooltip: type }),
  hideTooltip: () => set({ activeTooltip: null }),
}))

export default useTooltipStore
