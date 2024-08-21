import { useQuery } from '@tanstack/react-query'
import fetchMeetingData from '@/apis/meetingApi'
import { MeetingDataTypes } from '@/lib/meetingDataTypes'

const useMeetingData = (meetingId: number) =>
  useQuery<MeetingDataTypes, Error>({
    queryKey: ['meeting', meetingId],
    queryFn: () => fetchMeetingData(meetingId),
  })

export default useMeetingData
