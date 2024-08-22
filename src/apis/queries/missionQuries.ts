import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { apiCall, ApiError, ApiResponse } from '../apiUtils'

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
