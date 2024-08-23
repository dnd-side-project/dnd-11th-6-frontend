import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { ApiResponse, ApiError } from '../apiUtils'

type UploadSnapResponse = ApiResponse<{ snapId: number; snapUrl: string }>

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

export default useUploadSnap
