import axios from 'axios'
import { API_BASE_URL } from '@/constant/base_url'
import { MeetingDataTypes } from '@/lib/meetingDataTypes'

const fetchMeetingData = async (
  meetingId: number,
): Promise<MeetingDataTypes> => {
  const { data } = await axios.get(`${API_BASE_URL}/meetings/${meetingId}`)
  return data.data
}

export default fetchMeetingData
