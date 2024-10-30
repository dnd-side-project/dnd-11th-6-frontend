import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query'
import { ApiResponse, ApiError, apiCall } from './apiUtils'

type UploadSnapResponse = ApiResponse<{ snapId: number; snapUrl: string }>

type GetSnapDetailResponse = ApiResponse<{
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

interface SnapData {
  shootDate: string
  randomMissionId?: number
  missionId?: number
}

interface UploadSnapParams {
  meetingId: number
  snapData: SnapData
  image: File
  missionType: 'random' | 'select' | null
}

export const useUploadSnap = (
  options?: UseMutationOptions<UploadSnapResponse, ApiError, UploadSnapParams>,
) =>
  useMutation<UploadSnapResponse, ApiError, UploadSnapParams>({
    mutationFn: async ({ meetingId, snapData, image, missionType }) => {
      let endpoint = '/snaps/simple'

      if (missionType === 'random') {
        endpoint = '/snaps/random-mission'
      } else if (missionType === 'select') {
        endpoint = '/snaps/meeting-mission'
      }
      console.log('snapData', snapData)

      const formData = new FormData()
      formData.append(
        'snap',
        new Blob([JSON.stringify(snapData)], { type: 'application/json' }),
      )
      formData.append('image', image)

      const response = await fetch(`/api/v1/meetings/${meetingId}${endpoint}`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw errorData
      }

      return response.json()
    },
    ...options,
  })

export const useGetSnapDetail = (
  meetingId: number,
  snapId: number,
  options?: UseQueryOptions<GetSnapDetailResponse, ApiError>,
) =>
  useQuery<GetSnapDetailResponse, ApiError>({
    queryKey: ['snaps', meetingId, snapId],
    queryFn: () => apiCall(`/meetings/${meetingId}/snaps/${snapId}`),
    enabled: !!meetingId && !!snapId,
    retry: false,
    ...options,
  })
