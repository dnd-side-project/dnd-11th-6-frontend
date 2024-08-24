import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { apiCall, ApiResponse, ApiError } from '../apiUtils'

interface Participant {
  participantId: number
  role: string
  nickname: string
  shootCount: number
}

type ParticipantsResponse = ApiResponse<{
  nextCursorId: number
  data: Participant[]
  count: number
  hasNext: boolean
}>

type GetParticipantsMeResponse = ApiResponse<{
  participantId: number
  role: string
  nickname: string
  shootCount: number
}>

export const useParticipants = (meetingId: number, limit: number = 10) =>
  useInfiniteQuery<ParticipantsResponse, ApiError>({
    queryKey: ['participants', meetingId, limit],
    queryFn: async ({ pageParam = 0 }) =>
      apiCall(
        `/meetings/${meetingId}/participants?cursorId=${pageParam}&limit=${limit}`,
      ),
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursorId : undefined,
    initialPageParam: 0,
  })

export const useGetParticipantsMe = (meetingId: number) =>
  useQuery<GetParticipantsMeResponse, ApiError>({
    queryKey: ['participants', meetingId, 'me'],
    queryFn: async () => apiCall(`/meetings/${meetingId}/participants/me`),
  })

export default useParticipants
