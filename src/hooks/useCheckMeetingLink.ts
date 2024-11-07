import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import { getMeetingByLink } from '@/apis/meetingApi'
import { ApiError } from '@/types/api'
import { CheckMeetResponse } from '@/types/meeting'

type CheckMeetingLinkOptions = Omit<
  UseQueryOptions<CheckMeetResponse, ApiError, CheckMeetResponse>,
  'queryFn' | 'queryKey'
> & {
  queryKey?: string[]
}

function useCheckMeetingLink(
  link: string,
  options?: CheckMeetingLinkOptions,
): UseQueryResult<CheckMeetResponse, ApiError> {
  return useQuery<CheckMeetResponse, ApiError, CheckMeetResponse>({
    queryKey: options?.queryKey ?? ['meeting', 'link', link],
    queryFn: () => getMeetingByLink(link),
    enabled: options?.enabled ?? !!link,
    retry: options?.retry ?? false,
    ...options,
  })
}

export default useCheckMeetingLink
