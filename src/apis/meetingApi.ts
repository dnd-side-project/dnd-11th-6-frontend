import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query'
import axios from 'axios'

import dayjs from 'dayjs'
import { API_BASE_URL } from '@/constant/base_url'
import { MeetingFormData } from '@/lib/meetingTypes'
import useMeetingStore, { MeetingData } from '@/stores/useMeetingStore'
import { apiCall, ApiResponse, ApiError } from './apiUtils'

type CheckNicknameResponse = ApiResponse<{ isAvailableNickname: boolean }>
type JoinMeetingResponse = ApiResponse<{ participantId: number }>
type CheckMeetIdResponse = ApiResponse<MeetingData>
type CheckMeetLinkResponse = ApiResponse<MeetingData>
type ValidatePasswordResponse = ApiResponse
type ValidateLeaderAuthKeyResponse = ApiResponse
type ShareMeetingResponse = ApiResponse<{ meetingLink: string }>
type MeetingPasswordResponse = ApiResponse<{
  password: string
  leaderAuthKey?: string
}>
type ModifyMeetingResponse = ApiResponse<{
  meetingId: number
  name: string
  description: string
  symbolColor: string
}>

export const createMeeting = async (formData: MeetingFormData) => {
  const meetingData = {
    name: formData.meeting.name,
    description: formData.meeting.description,
    startDate: dayjs(formData.meetingDate.date).format('YYYY-MM-DDTHH:mm'),
    endDate: dayjs(formData.meetingDate.endDate).format('YYYY-MM-DDTHH:mm'),
    symbolColor: formData.theme.color,
    password: formData.password.password,
  }

  const meetingFormData = new FormData()
  meetingFormData.append(
    'meeting',
    new Blob([JSON.stringify(meetingData)], { type: 'application/json' }),
  )

  if (formData.theme.photo instanceof File) {
    meetingFormData.append('thumbnail', formData.theme.photo)
  }

  const response = await axios.post(
    `${API_BASE_URL}/meetings`,
    meetingFormData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )

  return response.data
}

export const useCheckNickname = (
  meetingId: number,
  nickname: string,
  options?: UseQueryOptions<CheckNicknameResponse, ApiError>,
) =>
  useQuery<CheckNicknameResponse, ApiError>({
    queryKey: ['nickname', meetingId, nickname],
    queryFn: () =>
      apiCall(
        `/meetings/${meetingId}/participants/check-nickname?nickname=${nickname}`,
      ),
    enabled: !!nickname,
    retry: false,
    ...options,
  })

export const useJoinMeeting = (
  options?: UseMutationOptions<
    JoinMeetingResponse,
    ApiError,
    { meetingId: number; nickname: string; role: string }
  >,
) =>
  useMutation<
    JoinMeetingResponse,
    ApiError,
    { meetingId: number; nickname: string; role: string }
  >({
    mutationFn: ({ meetingId, nickname, role }) =>
      apiCall(`/meetings/${meetingId}/participants`, 'POST', {
        nickname,
        role,
      }),
    ...options,
  })

export const useCheckMeetingLink = (
  link: string,
  options?: UseQueryOptions<CheckMeetLinkResponse, ApiError>,
) => {
  const setMeetingData = useMeetingStore((state) => state.setMeetingData)

  return useQuery<CheckMeetLinkResponse, ApiError>({
    queryKey: ['meeting', link],
    queryFn: async () => {
      const response = await apiCall(`/meetings?meetingLink=${link}`)
      setMeetingData(response.data)
      return response
    },
    enabled: !!link,
    retry: false,
    ...options,
  })
}

export const useCheckMeetingId = (
  meetingId: number,
  options?: UseQueryOptions<CheckMeetIdResponse, ApiError>,
) => {
  const setMeetingData = useMeetingStore((state) => state.setMeetingData)
  return useQuery<CheckMeetIdResponse, ApiError>({
    queryKey: ['meeting', meetingId],
    queryFn: async () => {
      const response = await apiCall(`/meetings/${meetingId}`)
      setMeetingData(response.data)

      return response
    },
    enabled: !!meetingId,
    retry: false,
    ...options,
  })
}

export const useValidatePassword = (
  options?: UseMutationOptions<
    ValidatePasswordResponse,
    ApiError,
    { meetingId: number; password: string }
  >,
) =>
  useMutation<
    ValidatePasswordResponse,
    ApiError,
    { meetingId: number; password: string }
  >({
    mutationFn: ({ meetingId, password }) =>
      apiCall(`/meetings/${meetingId}/validate-password`, 'POST', { password }),
    ...options,
  })

export const useValidateLeaderAuthKey = (
  options?: UseMutationOptions<
    ValidateLeaderAuthKeyResponse,
    ApiError,
    { meetingId: number; leaderAuthKey: string }
  >,
) =>
  useMutation<
    ValidateLeaderAuthKeyResponse,
    ApiError,
    { meetingId: number; leaderAuthKey: string }
  >({
    mutationFn: ({ meetingId, leaderAuthKey }) =>
      apiCall(`/meetings/${meetingId}/validate-leader-key`, 'POST', {
        leaderAuthKey,
      }),
    ...options,
  })

export const useShareMeeting = (
  meetingId: number,
  options?: UseQueryOptions<ShareMeetingResponse, ApiError>,
) =>
  useQuery<ShareMeetingResponse, ApiError>({
    queryKey: ['meeting', meetingId],
    queryFn: () => apiCall(`/meetings/${meetingId}/share`),
    enabled: !!meetingId,
    retry: false,
    ...options,
  })

export const useGetMeetingPassword = (
  meetingId: number,
  options?: UseQueryOptions<MeetingPasswordResponse, ApiError>,
) =>
  useQuery<MeetingPasswordResponse, ApiError>({
    queryKey: ['meeting', meetingId, 'password'],
    queryFn: () => apiCall(`/meetings/${meetingId}/password`),
    enabled: !!meetingId,
    retry: false,
    ...options,
  })

export const useModifyMeeting = (
  options?: UseMutationOptions<
    ModifyMeetingResponse,
    ApiError,
    {
      meetingId: number
      name: string
      description: string
      symbolColor: string
    }
  >,
) =>
  useMutation<
    ModifyMeetingResponse,
    ApiError,
    {
      meetingId: number
      name: string
      description: string
      symbolColor: string
    }
  >({
    mutationFn: ({ meetingId, name, description, symbolColor }) =>
      apiCall(`/meetings/${meetingId}`, 'PATCH', {
        name,
        description,
        symbolColor,
      }),
    ...options,
  })
