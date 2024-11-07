import { apiCall } from './apiUtils'

export interface CreateMissionRequest {
  content: string
}

export const getRandomMissions = () => apiCall('/random-missions')

export const getCompletedMissions = (meetingId: number) =>
  apiCall(`/meetings/${meetingId}/missions/completed`)

export const getIncompleteMissions = (meetingId: number) =>
  apiCall(`/meetings/${meetingId}/missions/incomplete`)

export const getParticipantMissions = (meetingId: number) =>
  apiCall(`/meetings/${meetingId}/missions`)

export const getLeaderMissions = (meetingId: number) =>
  apiCall(`/meetings/${meetingId}/missions/leader`)

export const deleteMission = (meetingId: number, missionId: number) =>
  apiCall(`/meetings/${meetingId}/missions/${missionId}`, 'DELETE')

export const createMission = async (
  meetingId: number,
  data: CreateMissionRequest,
) => apiCall(`/meetings/${meetingId}/missions`, 'POST', data)
