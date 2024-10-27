import { useQuery } from '@tanstack/react-query'

const checkPreviousUser = async (meetingId: number) => {
  const response = await fetch(
    `/api/check-previous-user?meetingId=${meetingId}`,
  )
  if (!response.ok) {
    throw new Error('Failed to check previous user')
  }
  return response.json()
}

export default function usePreviousUser(meetingId: number) {
  return useQuery({
    queryKey: ['previousUser'],
    queryFn: () => checkPreviousUser(meetingId),
    enabled: !!meetingId,
  })
}
