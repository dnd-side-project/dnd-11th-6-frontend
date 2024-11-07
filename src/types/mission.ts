// types/mission.ts
import { ApiResponse } from './api'

export interface RandomMission {
  randomMissionId: number
  content: string
}

export interface Mission {
  missionId: number
  content: string
}

export interface LeaderMission extends Mission {
  hasParticipants: boolean
}

export type GetRandomMissionsResponse = ApiResponse<RandomMission[]>
export type GetCompletedMissionsResponse = ApiResponse<Mission[]>
export type GetInCompleteMissionResponse = ApiResponse<Mission[]>
export type GetParticipantMissionsResponse = ApiResponse<Mission[]>
export type GetLeaderMissionResponse = ApiResponse<LeaderMission[]>
export type DeleteMissionResponse = ApiResponse<string>
export type CreateMissionResponse = ApiResponse<{
  missionId: number
  content: string
}>
