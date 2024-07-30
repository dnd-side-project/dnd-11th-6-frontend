import React from 'react'

interface RenderStep5Props {
  onShareMeeting: () => void
  onGoToMyMeeting: () => void
}

function RenderStep5({ onShareMeeting, onGoToMyMeeting }: RenderStep5Props) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">모임이 생성되었어요</h2>
      <p className="text-lg mb-6">미리 공유해볼까요?</p>
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

export default RenderStep5
