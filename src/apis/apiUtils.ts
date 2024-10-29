import useMeetingStore from '@/stores/useMeetingStore'
import { usePasswordPopupStore } from '@/stores/usePasswordPopupStore'

export interface ApiResponse<T = null> {
  status: number
  data: T
}

export interface ApiError {
  status: number
  data: null
  error: {
    code: string
    message: string
  }
}

export const handleExpiredToken = (shouldRedirectOnClose: boolean = true) => {
  const meetingId = useMeetingStore.getState().meetingData?.meetingId
  if (!meetingId) {
    console.error('Meeting ID not found')
    return
  }

  const onConfirm = async (password: string) => {
    try {
      const success = await reenterMeeting(meetingId, password)
      if (success) {
        const newMeetingData = await fetchMeetingData(meetingId)
        useMeetingStore.getState().setMeetingData(newMeetingData)
        usePasswordPopupStore.getState().closePopup()
        await useMeetingStore.persist.rehydrate()
      } else {
        alert('모임 재입장에 실패했습니다. 다시 시도해주세요.')
      }
    } catch (error) {
      console.error('Error during re-entry process:', error)
      alert('오류가 발생했습니다. 페이지를 새로고침해 주세요.')
    }
  }

  usePasswordPopupStore
    .getState()
    .openPopup(meetingId, onConfirm, shouldRedirectOnClose)
}

const refreshToken = async (): Promise<void> => {
  const meetingId = useMeetingStore.getState().meetingData?.meetingId

  if (!meetingId) {
    throw new Error('Meeting ID not found')
  }

  const response = await fetch(`/api/v1/meetings/${meetingId}/tokens/refresh`, {
    method: 'POST',
    credentials: 'include',
  })

  const result = await response.json()
  if (!response.ok) {
    throw result
  }
}

export const apiCall = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' = 'GET',
  body?: object,
) => {
  const url = `/api/v1${endpoint.startsWith('/') ? '' : '/'}${endpoint}`

  const makeRequest = async () => {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
    })

    if (response.status === 401 || response.status === 403) {
      try {
        await refreshToken()
        return await makeRequest()
      } catch (error) {
        handleExpiredToken()
        throw error
      }
    }

    const result = await response.json()
    if (!response.ok) throw result
    return result
  }

  return makeRequest()
}

export const reenterMeeting = async (meetingId: number, password: string) => {
  try {
    await apiCall(`/meetings/${meetingId}/auth/login`, 'POST', { password })
    const newMeetingData = await fetchMeetingData(meetingId)
    const meetingStorage = localStorage.getItem('meeting-storage')
    if (meetingStorage) {
      const parsedStorage = JSON.parse(meetingStorage)
      parsedStorage.state.meetingData = newMeetingData
      const updatedStorage = JSON.stringify(parsedStorage)
      localStorage.setItem('meeting-storage', updatedStorage)
      document.cookie = `meeting-storage=${encodeURIComponent(updatedStorage)}; path=/;`
    }
    return true
  } catch (error) {
    console.error('Failed to re-enter meeting:', error)
    return false
  }
}

export const fetchMeetingData = async (meetingId: number) => {
  try {
    const data = await apiCall(`/meetings/${meetingId}`, 'GET')
    return data.data
  } catch (error) {
    console.error('Error fetching meeting data:', error)
    throw error
  }
}
