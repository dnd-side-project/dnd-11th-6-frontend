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
  setMeetingData: (meetingData: MeetingData | null) => void
  setMeetingId: (meetingId: number) => void
  setPhotos: (photos: Photo[]) => void
  clearMeetingData: () => void
}

interface MeetingStore extends MeetingState, MeetingActions {}

const MEETING_DATA_KEY = 'meetingData'

const getStoredMeetingData = (): MeetingData | null => {
  if (typeof window === 'undefined') return null
  const storedData = sessionStorage.getItem(MEETING_DATA_KEY)
  return storedData ? JSON.parse(storedData) : null
}

const setStoredMeetingData = (meetingData: MeetingData | null) => {
  if (typeof window === 'undefined') return
  if (meetingData) {
    sessionStorage.setItem(MEETING_DATA_KEY, JSON.stringify(meetingData))
  } else {
    sessionStorage.removeItem(MEETING_DATA_KEY)
  }
}

const useMeetingStore = create<MeetingStore>((set, get) => ({
  meetingData: getStoredMeetingData(),
  photos: [],
  setMeetingData: (meetingData) => {
    set({ meetingData })
    setStoredMeetingData(meetingData)
  },
  getMeetingData: () => {
    const currentState = get()
    if (currentState.meetingData) {
      return currentState.meetingData
    }
    const storedData = getStoredMeetingData()
    if (storedData) {
      set({ meetingData: storedData })
    }
    return storedData
  },
  setMeetingId: (meetingId) => {
    const currentMeetingData = get().meetingData
    const updatedMeetingData = currentMeetingData
      ? { ...currentMeetingData, meetingId }
      : null
    set({ meetingData: updatedMeetingData })
    setStoredMeetingData(updatedMeetingData)
  },
  setPhotos: (photos) => set({ photos }),
  clearMeetingData: () => {
    set({ meetingData: null })
    setStoredMeetingData(null)
  },
}))

export default useMeetingStore
