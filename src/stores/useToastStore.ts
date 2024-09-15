import { create } from 'zustand'

type ToastType = 'default' | 'info' | 'warning' | 'success'
type ToastPosition = 'top' | 'bottom'

interface ToastOptions {
  type?: ToastType
  position?: ToastPosition
  duration?: number
  link?: string
}

interface ToastState {
  message: string | null
  options: ToastOptions
  isVisible: boolean
  setToast: (message: string, options?: ToastOptions) => void
  showToast: () => void
  hideToast: () => void
}

const useToastStore = create<ToastState>((set, get) => ({
  message: null,
  options: {
    type: 'default',
    position: 'top',
    duration: 3000,
  },
  isVisible: false,
  setToast: (message, options = {}) =>
    set({
      message,
      options: { ...get().options, ...options },
      isVisible: false,
    }),
  showToast: () => set({ isVisible: true }),
  hideToast: () => set({ isVisible: false, message: null }),
}))

export default useToastStore
