import axios from 'axios'
import { MeetingDataTypes } from '@/lib/meetingDataTypes'

const fetchMeetingData = async (
  meetingId: number,
): Promise<MeetingDataTypes> => {
  const { data } = await axios.get(
    `http://api.get-snappy.co.kr/api/v1/meetings/${meetingId}`,
  )
  return data.data
}

export default fetchMeetingData
