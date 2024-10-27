import useMeetingStore from '@/stores/useMeetingStore'
import { usePasswordPopupStore } from '@/stores/usePasswordPopupStore'
import useUserStore from '@/stores/useUserStore'

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

const clearToken = (meetingId: number) => {
  document.cookie = `ACCESS_TOKEN_${meetingId}=; max-age=0; path=/api/;`
  document.cookie = `REFRESH_TOKEN_${meetingId}=; max-age=0; path=/api/;`

  useMeetingStore.persist.clearStorage()
  useUserStore.persist.clearStorage()
}

export const handleExpiredToken = (shouldRedirectOnClose: boolean = true) => {
  const meetingId = useMeetingStore.getState().meetingData?.meetingId
  if (!meetingId) {
    console.error('Meeting ID not found')
    return
  }

  clearToken(meetingId)

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
    switch (result.error.code) {
      case 'UNAUTHORIZED':
      case 'JWT_EXPIRED_ERROR':
      case 'FORBIDDEN':
        handleExpiredToken()
        break
      default:
        throw new Error(`Failed to refresh token: ${result.error.message}`)
    }
  }
}

let refreshAttempts = 0
const MAX_REFRESH_ATTEMPTS = 3

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
      if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
        refreshAttempts = 0
        handleExpiredToken()
        throw new Error('Max refresh attempts reached')
      }
      try {
        refreshAttempts += 1
        await refreshToken()
        return await makeRequest()
      } catch (error) {
        console.error('Error refreshing token:', error)
        handleExpiredToken()
        throw error
      }
    }

    refreshAttempts = 0
    const result = await response.json()
    if (!response.ok) throw result
    return result
  }

  return makeRequest()
}

export const reenterMeeting = async (meetingId: number, password: string) => {
  try {
    await apiCall(`/meetings/${meetingId}/auth/login`, 'POST', { password })
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
