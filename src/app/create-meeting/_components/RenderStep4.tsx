import React from 'react'
import useMeetStore from '@/stores/useMeetStrore'

function RenderStep4() {
  const { pin, setStep } = useMeetStore()
  return (
    <div className="flex flex-col items-center">
      <p className="text-lg mb-4">관리자 등록을 위해 다음의 PIN이 필요해요!</p>
      <div className="bg-gray-100 rounded-lg p-6 mb-4 relative">
        <span className="text-4xl font-bold">{pin}</span>
      </div>
      <button
        type="button"
        onClick={() => setStep(5)}
        className="w-full p-3 bg-gray-300 text-black rounded-md"
      >
        복사하기
      </button>
      <p className="mt-4 text-sm text-gray-500">
        해당 PIN 번호를 공유하여 관리자를 추가할 수 있어요
      </p>
      <button
        type="button"
        onClick={() => setStep(5)}
        className="w-full p-3 mt-4 bg-black text-white rounded-md"
      >
        다음으로
      </button>
    </div>
  )
}

export default RenderStep4
