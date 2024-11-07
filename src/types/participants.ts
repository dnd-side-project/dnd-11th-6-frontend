import { ApiResponse } from '@/types/api'

export interface Participant {
  participantId: number
  role: string
  nickname: string
  shootCount: number
}

export interface ParticipantsResponse
  extends ApiResponse<{
    nextCursorId: number
    data: Participant[]
    count: number
    hasNext: boolean
  }> {}

export type GetParticipantsMeResponse = ApiResponse<Participant>
