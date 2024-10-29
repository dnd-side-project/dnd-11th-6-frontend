import { useQuery } from '@tanstack/react-query'

interface TokenResponse {
  hasTokens: boolean
  tokenStatus: {
    hasAccessToken: boolean
    hasRefreshToken: boolean
  }
}

const checkTokens = async (meetingId: number) => {
  const response = await fetch(`/api/check-tokens?meetingId=${meetingId}`)
  if (!response.ok) {
    throw new Error('Failed to check has tokens')
  }

  const data = await response.json()
  return {
    hasTokens: data.hasTokens,
    tokenStatus: data.tokenStatus,
  }
}

export default function useTokens(meetingId: number) {
  return useQuery<TokenResponse>({
    queryKey: ['tokens', meetingId],
    queryFn: () => checkTokens(meetingId),
    enabled: !!meetingId,
  })
}
