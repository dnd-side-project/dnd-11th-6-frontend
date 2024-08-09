import create from 'zustand'

export interface Photo {
  id: string
  url: string
}

interface MeetingState {
  meetingId: string
  photos: Photo[]
}

interface MeetingActions {
  setMeetingId: (meetingId: string) => void
  setPhotos: (photo: Photo[]) => void
}

interface MeetingStore extends MeetingState, MeetingActions {}

const useMeetingStore = create<MeetingStore>((set) => ({
  meetingId: '',
  photos: [],
  setMeetingId: (meetingId) => set({ meetingId }),
  setPhotos: (photos) => set({ photos }),
}))

export default useMeetingStore
