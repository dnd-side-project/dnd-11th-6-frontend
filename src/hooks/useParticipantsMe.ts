import { useQuery } from '@tanstack/react-query'
import { getParticipantsMe } from '@/apis/participantsApi'
import useUserStore from '@/stores/useUserStore'
import { ApiError } from '@/types/api'
import { GetParticipantsMeResponse } from '@/types/participants'

const useParticipantsMe = (
  meetingId: number,
  hasTokens: boolean = true,
  isEnabled: boolean = true,
) => {
  const { setParticipantId, setNickname, setRole, setShootCount } =
    useUserStore()

  return useQuery<GetParticipantsMeResponse, ApiError>({
    queryKey: ['participants', meetingId, 'me'],
    queryFn: async () => {
      const response = await getParticipantsMe(meetingId)
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

export default useParticipantsMe
