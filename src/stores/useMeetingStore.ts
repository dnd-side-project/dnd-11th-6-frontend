import create from 'zustand'

type MeetingStore = {
  meetingId: string
  setMeetingId: (meetingId: string) => void
}

const useMeetingStore = create<MeetingStore>((set) => ({
  meetingId: '',
  setMeetingId: (meetingId) => set({ meetingId }),
}))

export default useMeetingStore
