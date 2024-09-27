import create from 'zustand'

type PasswordPopupStore = {
  isOpen: boolean
  meetingId: number | null
  onConfirm: ((password: string) => void) | null
  openPopup: (meetingId: number, onConfirm: (password: string) => void) => void
  closePopup: () => void
  closePopupAndRedirect: () => void
}

export const usePasswordPopupStore = create<PasswordPopupStore>((set) => ({
  isOpen: false,
  meetingId: null,
  onConfirm: null,
  openPopup: (meetingId, onConfirm) =>
    set({ isOpen: true, meetingId, onConfirm }),
  closePopup: () => set({ isOpen: false, meetingId: null, onConfirm: null }),
  closePopupAndRedirect: () => {
    set({ isOpen: false, meetingId: null, onConfirm: null })
    window.location.href = '/'
  },
}))

export default usePasswordPopupStore
