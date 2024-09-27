import create from 'zustand'

type PasswordPopupStore = {
  isOpen: boolean
  meetingId: number | null
  onConfirm: ((password: string) => void) | null
  onClose: (() => void) | null
  openPopup: (
    meetingId: number,
    onConfirm: (password: string) => void,
    onClose: () => void,
  ) => void
  closePopup: () => void
}

export const usePasswordPopupStore = create<PasswordPopupStore>((set) => ({
  isOpen: false,
  meetingId: null,
  onConfirm: null,
  onClose: null,
  openPopup: (meetingId, onConfirm, onClose) =>
    set({ isOpen: true, meetingId, onConfirm, onClose }),
  closePopup: () =>
    set({ isOpen: false, meetingId: null, onConfirm: null, onClose: null }),
}))

export default usePasswordPopupStore
