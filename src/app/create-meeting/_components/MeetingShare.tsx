import React from 'react'

interface MeetingShareProps {
  onShareMeeting: () => void
  onGoToMyMeeting: () => void
}

function MeetingShare({ onShareMeeting, onGoToMyMeeting }: MeetingShareProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-[42px] text-center">
        <h2 className="text-xl font-bold mb-2">모임이 생성되었어요 🎉</h2>
        <p className="text-sm text-gray-600">
          생성된 모임 앨범을 친구들에게 알려보세요.
        </p>
      </div>
      <div className="bg-gray-100 w-full aspect-square mb-6 flex items-center justify-center">
        <p className="text-gray-400">축하 이미지</p>
      </div>
      <button
        type="button"
        onClick={onShareMeeting}
        className="w-full p-3 mb-3 bg-gray-300 text-black rounded-md"
      >
        만든 모임앨범 공유하기
      </button>
      <button
        type="button"
        onClick={onGoToMyMeeting}
        className="w-full p-3 bg-black text-white rounded-md"
      >
        내 모임앨범으로 가기
      </button>
    </div>
  )
}

export default MeetingShare
