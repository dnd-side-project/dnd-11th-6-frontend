import create from 'zustand'

export interface Photo {
  id: string
  url: string
}

export interface MeetingData {
  meetingId: number
  name: string
  description: string
  thumbnailUrl: string
  symbolColor: string
  startDate: string
  endDate: string
  status: string
}

interface MeetingState {
  meetingData: MeetingData | null
  photos: Photo[]
}

interface MeetingActions {
  setMeetingData: (meetingData: MeetingData) => void
  setPhotos: (photo: Photo[]) => void
}

interface MeetingActions {
  setMeetingData: (meetingData: MeetingData) => void
  setPhotos: (photos: Photo[]) => void
}

interface MeetingStore extends MeetingState, MeetingActions {}

const useMeetingStore = create<MeetingStore>((set) => ({
  meetingData: null,
  photos: [],
  setMeetingData: (meetingData) => set({ meetingData }),
  setPhotos: (photos) => set({ photos }),
}))

export default useMeetingStore
