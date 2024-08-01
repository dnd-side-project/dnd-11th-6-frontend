import create from 'zustand'

interface Photo {
  id: string
  url: string
}

interface MeetingStore {
  meetingId: string
  photos: Photo[]
  setMeetingId: (meetingId: string) => void
  setPhotos: (photo: Photo[]) => void
}

const useMeetingStore = create<MeetingStore>((set) => ({
  meetingId: '',
  photos: [],
  setMeetingId: (meetingId) => set({ meetingId }),
  setPhotos: (photos) => set({ photos }),
}))

export default useMeetingStore
