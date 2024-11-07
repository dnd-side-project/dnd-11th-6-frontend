import create from 'zustand'

type PasswordPopupStore = {
  isOpen: boolean
  meetingId: number | null
  onConfirm: ((password: string) => void) | null
  shouldRedirectOnClose: boolean
  openPopup: (
    meetingId: number,
    onConfirm: (password: string) => void,
    shouldRedirectOnClose: boolean,
  ) => void
  closePopup: () => void
}

export const usePasswordPopupStore = create<PasswordPopupStore>((set) => ({
  isOpen: false,
  meetingId: null,
  onConfirm: null,
  shouldRedirectOnClose: true,
  openPopup: (meetingId, onConfirm, shouldRedirectOnClose = true) =>
    set({ isOpen: true, meetingId, onConfirm, shouldRedirectOnClose }),
  closePopup: () => set({ isOpen: false, meetingId: null, onConfirm: null }),
}))

export default usePasswordPopupStore
