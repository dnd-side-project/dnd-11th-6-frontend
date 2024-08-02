import useMeetingStore from '@/stores/useMeetingStore'
import MeetingPageClient from './MeetingPageClient'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getPhotos(meetingId: string) {
  return [
    { id: '1', url: 'photo1' },
    { id: '2', url: 'photo2' },
    { id: '3', url: 'photo3' },
    { id: '4', url: 'photo4' },
    { id: '5', url: 'photo5' },
    { id: '6', url: 'photo6' },
    { id: '7', url: 'photo7' },
    { id: '8', url: 'photo8' },
    { id: '9', url: 'photo9' },
    { id: '10', url: 'photo10' },
  ]
}

async function MeetingPage({ params }: { params: { meetingId: string } }) {
  const photos = await getPhotos(params.meetingId)
  useMeetingStore.setState({ meetingId: params.meetingId, photos })
  return <MeetingPageClient />
}

export default MeetingPage
