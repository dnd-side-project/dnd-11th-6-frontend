import React from 'react'
import useUserStore from '@/stores/useUserStore'

const SnapProgressBar = () => {
  const { shootCount } = useUserStore()
  const percentage = (shootCount / 10) * 100

  return (
    <div className="w-full bg-gray-200 rounded-full" style={{ height: '10px' }}>
      <div
        className="bg-[#12C7E0] rounded-full"
        style={{ width: `${percentage}%`, height: '10px' }}
      />
      <div className="text-sm text-gray-600 mt-2 flex justify-between">
        <span>
          {shootCount === 10
            ? '모든 사진 촬영을 마쳤어요!'
            : `남은 스냅 ${10 - shootCount}장`}
        </span>
        <span>{`지금까지 ${shootCount}장`}</span>
      </div>
    </div>
  )
}

export default SnapProgressBar
