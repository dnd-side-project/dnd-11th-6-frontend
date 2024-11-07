import { ApiResponse } from './api'

export type UploadSnapResponse = ApiResponse<{
  snapId: number
  snapUrl: string
}>

export type GetSnapDetailResponse = ApiResponse<{
  snapId: number
  snapUrl: string
  shootDate: string
  type: 'SIMPLE' | 'MEETING_MISSION' | 'RANDOM_MISSION'
  photographer: {
    participantId: number
    nickname: string
  }
  mission?: {
    missionId?: number
    content?: string
  }
}>
