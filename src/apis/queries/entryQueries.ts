import { useMutation, useQuery } from '@tanstack/react-query'
import { MeetingData } from '@/stores/useMeetingStore'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

interface ApiError {
  status: number
  data: null
  error: {
    code: string
    message: string
  }
}

interface CheckMeetLinkResponse {
  data: MeetingData
  status: number
}

interface CheckNicknameResponse {
  status: number
  data: {
    isAvailableNickname: boolean
  }
}

interface JoinMeetingResponse {
  status: number
  data: {
    participantId: number
  }
}

interface ValidatePasswordResponse {
  status: number
  data: null
}

interface ValidateLeaderAuthKeyResponse {
  status: number
  data: null
}

export const useCheckNickname = (meetingId: number, nickname: string) =>
  useQuery<CheckNicknameResponse, ApiError>({
    queryKey: ['nickname', nickname],
    queryFn: async () => {
      if (!nickname) return null
      const response = await fetch(
        `${API_BASE_URL}/meetings/${meetingId}/participants/check-nickname?nickname=${nickname}`,
      )
      const result = await response.json()
      if (!response.ok) throw result
      return result
    },
    enabled: !!nickname,
    retry: false,
  })

export const useJoinMeeting = () =>
  useMutation<
    JoinMeetingResponse,
    ApiError,
    { meetingId: number; nickname: string; role: string }
  >({
    mutationFn: async ({ meetingId, nickname, role }) => {
      const response = await fetch(
        `${API_BASE_URL}/meetings/${meetingId}/participants`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nickname, role }),
        },
      )
      const result = await response.json()
      if (!response.ok) throw result
      return result
    },
  })

export const useCheckMeetingLink = (link: string) =>
  useQuery<CheckMeetLinkResponse, ApiError>({
    queryKey: ['meeting', link],
    queryFn: async () => {
      if (!link) return null
      const response = await fetch(
        `${API_BASE_URL}/meetings?meetingLink=${link}`,
      )
      const result = await response.json()
      console.log('result:', result)
      if (!response.ok) throw result
      return result
    },
    enabled: !!link,
    retry: false,
  })

export const useValidatePassword = () =>
  useMutation<
    ValidatePasswordResponse,
    ApiError,
    { meetingId: number; password: string }
  >({
    mutationFn: async ({ meetingId, password }) => {
      if (!password || password.length < 6) return null

      const response = await fetch(
        `${API_BASE_URL}/meetings/${meetingId}/validate-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        },
      )
      if (!response.ok) {
        const errorData = await response.json()
        throw errorData
      }
      return response.json()
    },
  })

export const useValidateLeaderAuthKey = () =>
  useMutation<
    ValidateLeaderAuthKeyResponse,
    ApiError,
    { meetingId: number; leaderAuthKey: string }
  >({
    mutationFn: async ({ meetingId, leaderAuthKey }) => {
      if (!leaderAuthKey || leaderAuthKey.length !== 4) return null

      const response = await fetch(
        `${API_BASE_URL}/meetings/${meetingId}/validate-leader-key`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ leaderAuthKey }),
        },
      )
      if (!response.ok) {
        const errorData = await response.json()
        throw errorData
      }
      return response.json()
    },
  })
