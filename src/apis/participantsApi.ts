import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import useUserStore from '@/stores/useUserStore'
import { apiCall, ApiResponse, ApiError } from './apiUtils'

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

export const useGetParticipantsMe = (
  meetingId: number,
  hasTokens: boolean = true,
  isEnabled: boolean = true,
) => {
  const { setParticipantId, setNickname, setRole, setShootCount } =
    useUserStore()

  return useQuery<GetParticipantsMeResponse, ApiError>({
    queryKey: ['participants', meetingId, 'me'],
    queryFn: async () => {
      const response = await apiCall(`/meetings/${meetingId}/participants/me`)
      const { participantId, nickname, role, shootCount } = response.data
      setParticipantId(participantId)
      setNickname(nickname)
      setRole(role as 'LEADER' | 'PARTICIPANT')
      setShootCount(shootCount)

      return response
    },
    enabled: !!meetingId && isEnabled && hasTokens === true,
    retry: false,
    refetchOnWindowFocus: false,
  })
}

export default useParticipants
