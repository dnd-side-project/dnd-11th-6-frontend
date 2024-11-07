import {
  GetParticipantsMeResponse,
  ParticipantsResponse,
} from '@/types/participants'
import { apiCall } from './apiUtils'

export const getParticipants = async (
  meetingId: number,
  cursorId: number = 0,
  limit: number = 10,
): Promise<ParticipantsResponse> =>
  apiCall(
    `/meetings/${meetingId}/participants?cursorId=${cursorId}&limit=${limit}`,
  )

export const getParticipantsMe = async (
  meetingId: number,
): Promise<GetParticipantsMeResponse> =>
  apiCall(`/meetings/${meetingId}/participants/me`)
