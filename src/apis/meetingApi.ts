import axios from 'axios'

import { API_BASE_URL } from '@/constant/base_url'
import { MeetingFormData } from '@/lib/meetingTypes'

const createMeeting = async (formData: MeetingFormData) => {
  const meetingData = {
    name: formData.meeting.name,
    description: formData.meeting.description,
    startDate: formData.meetingDate.date,
    endDate: formData.meetingDate.endDate,
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

export default createMeeting
