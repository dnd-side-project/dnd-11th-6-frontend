import useMeetingStore from '@/stores/useMeetingStore'
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

const handleExpiredToken = () => {
  const meetingId = useMeetingStore.getState().meetingData?.meetingId
  document.cookie = `ACCESS_TOKEN_${meetingId}=; max-age=0; path=/api/;`
  document.cookie = `REFRESH_TOKEN_${meetingId}=; max-age=0; path=/api/;`

  useMeetingStore.persist.clearStorage()
  useUserStore.persist.clearStorage()

  alert('세션이 만료되었습니다. 다시 로그인해주세요.')

  window.location.href = '/'
}

const refreshToken = async () => {
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

export const apiCall = async (
  endpoint: string,
  method: 'GET' | 'POST' = 'GET',
  body?: object,
) => {
  const url = `/api/v1${endpoint.startsWith('/') ? '' : '/'}${endpoint}`

  const makeRequest = async (): Promise<ApiResponse> => {
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
        console.error('Error refreshing token:', error)
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
