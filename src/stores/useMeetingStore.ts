import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

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
  setMeetingData: (meetingData: MeetingData | null) => void
  setMeetingId: (meetingId: number) => void
  setPhotos: (photos: Photo[]) => void
}

interface MeetingStore extends MeetingState, MeetingActions {}

const useMeetingStore = create(
  persist<MeetingStore>(
    (set) => ({
      meetingData: null,
      photos: [],
      setMeetingData: (meetingData) => set({ meetingData }),
      setMeetingId: (meetingId) =>
        set((state) => ({
          meetingData: state.meetingData
            ? { ...state.meetingData, meetingId }
            : null,
        })),
      setPhotos: (photos) => set({ photos }),
    }),
    {
      name: 'meeting-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useMeetingStore
