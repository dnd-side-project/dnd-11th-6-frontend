import { MeetingData } from '@/stores/useMeetingStore'
import { ApiResponse } from '@/types/api'

export type CheckNicknameResponse = ApiResponse<{
  isAvailableNickname: boolean
}>
export type JoinMeetingResponse = ApiResponse<{ participantId: number }>
export type CheckMeetResponse = ApiResponse<MeetingData>
export type ValidatePasswordResponse = ApiResponse
export type ValidateLeaderAuthKeyResponse = ApiResponse
export type ShareMeetingResponse = ApiResponse<{ meetingLink: string }>
export type MeetingPasswordResponse = ApiResponse<{
  password: string
  leaderAuthKey?: string
}>
export type ModifyMeetingResponse = ApiResponse<{
  meetingId: number
  name: string
  description: string
  symbolColor: string
}>
