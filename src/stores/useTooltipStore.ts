import { create } from 'zustand'

interface TooltipState {
  showTooltip: boolean
}

interface TooltipActions {
  setShowTooltip: (show: boolean) => void
}

interface TooltipStore extends TooltipState, TooltipActions {}

const useTooltipStore = create<TooltipStore>((set) => ({
  showTooltip: true,
  setShowTooltip: (show) => set({ showTooltip: show }),
}))

export default useTooltipStore
