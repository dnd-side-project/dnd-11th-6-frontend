import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { apiCall, ApiError, ApiResponse } from '../apiUtils'

type GetRandomMissionsResponse = ApiResponse<
  Array<{
    randomMissionId: number
    content: string
  }>
>

type GetCompletedMissionsResponse = ApiResponse<
  Array<{
    missionId: number
    content: string
  }>
>

type GetInCompleteMissionResponse = ApiResponse<
  Array<{
    missionId: number
    content: string
  }>
>

type GetParticipantMissionsResponse = ApiResponse<
  Array<{
    missionId: number
    content: string
  }>
>
type GetLeaderMissionResponse = ApiResponse<
  Array<{
    missionId: number
    content: string
    hasParticipants: boolean
  }>
>

export const useGetRandomMissions = (
  options?: UseQueryOptions<GetRandomMissionsResponse, ApiError>,
) =>
  useQuery<GetRandomMissionsResponse, ApiError>({
    queryKey: ['missions', 'random'],
    queryFn: () => apiCall('/random-missions'),
    retry: false,
    ...options,
  })

export const useGetCompletedMissions = (
  meetingId: number,
  options?: UseQueryOptions<GetCompletedMissionsResponse, ApiError>,
) =>
  useQuery<GetCompletedMissionsResponse, ApiError>({
    queryKey: ['missions', meetingId, 'completed'],
    queryFn: () => apiCall(`/meetings/${meetingId}/missions/completed`),
    enabled: !!meetingId,
    retry: false,
    ...options,
  })

export const useGetInCompleteMissions = (
  meetingId: number,
  options?: UseQueryOptions<GetInCompleteMissionResponse, ApiError>,
) =>
  useQuery<GetInCompleteMissionResponse, ApiError>({
    queryKey: ['missions', meetingId, 'incomplete'],
    queryFn: () => apiCall(`/meetings/${meetingId}/missions/incomplete`),
    enabled: !!meetingId,
    retry: false,
    ...options,
  })

export const useGetParticipantMissions = (
  meetingId: number,
  options?: UseQueryOptions<GetParticipantMissionsResponse, ApiError>,
) =>
  useQuery<GetParticipantMissionsResponse, ApiError>({
    queryKey: ['missions', meetingId],
    queryFn: () => apiCall(`/meetings/${meetingId}/missions`),
    enabled: !!meetingId,
    retry: false,
    ...options,
  })

export const useGetLeaderMission = (
  missionId: number,
  options?: UseQueryOptions<GetLeaderMissionResponse, ApiError>,
) =>
  useQuery<GetLeaderMissionResponse, ApiError>({
    queryKey: ['missions', missionId],
    queryFn: () => apiCall(`/meetings/${missionId}/missions/leader`),
    enabled: !!missionId,
    retry: false,
    ...options,
  })
