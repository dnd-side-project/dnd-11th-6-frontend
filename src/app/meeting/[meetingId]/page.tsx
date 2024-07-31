import MeetingPageClient from './MeetingPageClient'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getPhotos(meetingId: string) {
  return [
    { id: '1', name: 'photo1' },
    { id: '2', name: 'photo2' },
    { id: '3', name: 'photo3' },
    { id: '4', name: 'photo4' },
    { id: '5', name: 'photo5' },
    { id: '6', name: 'photo6' },
    { id: '7', name: 'photo7' },
    { id: '8', name: 'photo8' },
    { id: '9', name: 'photo9' },
    { id: '10', name: 'photo10' },
  ]
}

async function MeetingPage({ params }: { params: { meetingId: string } }) {
  const photos = await getPhotos(params.meetingId)
  return <MeetingPageClient meetingId={params.meetingId} photos={photos} />
}

export default MeetingPage
