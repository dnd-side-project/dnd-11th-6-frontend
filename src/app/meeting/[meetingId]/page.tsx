function MeetingPage({ params }: { params: { meetingId: string } }) {
  const meetingId = params.meetingId as string

  const photos = [
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
  return (
    <div className="flex flex-col">
      <div>meeting: {meetingId}</div>
      <div className="flex justify-between items-center mb-3">
        <div className="text-xl">LOGO</div>
        <div className="rounded-full w-12 h-12 bg-gray-300" />
      </div>
      <div className="flex justify-between bg-gray-300 mb-5">
        <div>***님은 1장 중 1장 찍으셨어요</div>
        <div>찍은사진 보기&gt;</div>
      </div>
      <div className="flex justify-between">
        <div className="flex mb-5">
          <input type="checkbox" />
          <div>모임 미션 사진 보기</div>
        </div>
        <div>사진 삭제하기</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-pink-200 w-full h-52 cursor-pointer"
          >
            {photo.name}
          </div>
        ))}
      </div>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <button
          type="button"
          className="w-52 h-12 bg-black text-white rounded-full"
        >
          📷 사진 찍기
        </button>
      </div>
    </div>
  )
}

export default MeetingPage
