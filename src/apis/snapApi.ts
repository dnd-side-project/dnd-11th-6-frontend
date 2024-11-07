import { apiCall } from './apiUtils'

interface SnapData {
  shootDate: string
  randomMissionId?: number
  missionId?: number
}

export const uploadSimpleSnap = async (
  meetingId: number,
  snapData: SnapData,
  image: File,
) => {
  const formData = new FormData()
  formData.append(
    'snap',
    new Blob([JSON.stringify(snapData)], { type: 'application/json' }),
  )
  formData.append('image', image)

  const response = await fetch(`/api/v1/meetings/${meetingId}/snaps/simple`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw errorData
  }

  return response.json()
}

export const uploadRandomMissionSnap = async (
  meetingId: number,
  snapData: SnapData,
  image: File,
) => {
  const formData = new FormData()
  formData.append(
    'snap',
    new Blob([JSON.stringify(snapData)], { type: 'application/json' }),
  )
  formData.append('image', image)

  const response = await fetch(
    `/api/v1/meetings/${meetingId}/snaps/random-mission`,
    {
      method: 'POST',
      body: formData,
      credentials: 'include',
    },
  )

  if (!response.ok) {
    const errorData = await response.json()
    throw errorData
  }

  return response.json()
}

export const uploadMeetingMissionSnap = async (
  meetingId: number,
  snapData: SnapData,
  image: File,
) => {
  const formData = new FormData()
  formData.append(
    'snap',
    new Blob([JSON.stringify(snapData)], { type: 'application/json' }),
  )
  formData.append('image', image)

  const response = await fetch(
    `/api/v1/meetings/${meetingId}/snaps/meeting-mission`,
    {
      method: 'POST',
      body: formData,
      credentials: 'include',
    },
  )

  if (!response.ok) {
    const errorData = await response.json()
    throw errorData
  }

  return response.json()
}

export const getSnapDetail = (meetingId: number, snapId: number) =>
  apiCall(`/meetings/${meetingId}/snaps/${snapId}`)
