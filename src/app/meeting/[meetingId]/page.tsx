import MeetingPageClient from './MeetingPageClient'

async function getPhotos() {
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

async function MeetingPage({ params }: { params: { meetingId: number } }) {
  const photos = await getPhotos()
  return (
    <MeetingPageClient
      initialMeetingId={params.meetingId}
      initialPhotos={photos}
    />
  )
}

export default MeetingPage
