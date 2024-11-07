import axios from 'axios'
import dayjs from 'dayjs'
import { API_BASE_URL } from '@/constant/base_url'
import { MeetingFormData } from '@/lib/meetingTypes'

import { apiCall } from './apiUtils'

export const createMeeting = async (formData: MeetingFormData) => {
  const meetingData = {
    name: formData.meeting.name,
    description: formData.meeting.description,
    startDate: dayjs(formData.meetingDate.date).format('YYYY-MM-DDTHH:mm'),
    endDate: dayjs(formData.meetingDate.endDate).format('YYYY-MM-DDTHH:mm'),
    symbolColor: formData.theme.color,
    password: formData.password.password,
  }

  const meetingFormData = new FormData()
  meetingFormData.append(
    'meeting',
    new Blob([JSON.stringify(meetingData)], { type: 'application/json' }),
  )

  if (formData.theme.photo instanceof File) {
    meetingFormData.append('thumbnail', formData.theme.photo)
  }

  const response = await axios.post(
    `${API_BASE_URL}/meetings`,
    meetingFormData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )

  return response.data
}

export const checkNickname = (meetingId: number, nickname: string) =>
  apiCall(
    `/meetings/${meetingId}/participants/check-nickname?nickname=${nickname}`,
  )

export const joinMeeting = (
  meetingId: number,
  nickname: string,
  role: string,
) => apiCall(`/meetings/${meetingId}/participants`, 'POST', { nickname, role })

export const getMeetingByLink = (link: string) =>
  apiCall(`/meetings?meetingLink=${link}`)

export const getMeetingById = (meetingId: number) =>
  apiCall(`/meetings/${meetingId}`)

export const validatePassword = (meetingId: number, password: string) =>
  apiCall(`/meetings/${meetingId}/validate-password`, 'POST', { password })

export const validateLeaderAuthKey = (
  meetingId: number,
  leaderAuthKey: string,
) =>
  apiCall(`/meetings/${meetingId}/validate-leader-key`, 'POST', {
    leaderAuthKey,
  })

export const shareMeeting = (meetingId: number) =>
  apiCall(`/meetings/${meetingId}/share`)

export const getMeetingPassword = (meetingId: number) =>
  apiCall(`/meetings/${meetingId}/password`)

export const modifyMeeting = (
  meetingId: number,
  data: { name: string; description: string; symbolColor: string },
) => apiCall(`/meetings/${meetingId}`, 'PATCH', data)
