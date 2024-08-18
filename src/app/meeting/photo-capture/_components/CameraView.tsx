import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CameraCaptureButton from '@/assets/CameraCaptureButton.svg'
import CameraSwitchButton from '@/assets/CameraSwitchButton.svg'
import Close from '@/assets/close.svg'
import Tooltip from '@/components/Tooltip'

type CameraViewProps = {
  videoRef: React.RefObject<HTMLVideoElement>
  isRearCamera: boolean
  onCapture: () => void
  onToggleCamera: () => void
  goBack: () => void
}

function CameraView({
  videoRef,
  isRearCamera,
  onCapture,
  onToggleCamera,
  goBack,
}: CameraViewProps) {
  const [showTooltip, setShowTooltip] = useState(true)
  const [isMissionSelected] = useState(false)

  return (
    <div className="min-h-screen w-full p-4">
      <div className="flex justify-between items-center h-12 w-full">
        <div className="relative">
          {' '}
          <Link href="/create-mission">
            <div className="flex justify-between items-center px-3 py-2 rounded-[14px] bg-gray-200">
              {isMissionSelected ? (
                <>미션 바꾸기</>
              ) : (
                <>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1"
                  >
                    <path
                      d="M6.0002 1.19995L6.0002 10.8M10.8002 5.99995L1.2002 5.99995"
                      stroke="#AAAFB3"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  미션 추가하기
                </>
              )}
            </div>
            {!isMissionSelected && showTooltip && (
              <Tooltip
                message="내 사진에 미션을 더 해봐요!"
                onClose={() => setShowTooltip(false)}
                position="bottom"
                arrowClassName="left-12"
                className="top-12 left-28"
              />
            )}
          </Link>
        </div>

        <div className="flex-1">{} </div>
        <div
          role="button"
          tabIndex={0}
          onClick={goBack}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') goBack()
          }}
          className="flex-1 flex justify-end items-center cursor-pointer"
        >
          <Image src={Close} alt="Close Button" className="w-6 h-6" />
        </div>
      </div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: '360px',
          height: '480px',
          objectFit: 'cover',
          transform: isRearCamera ? 'none' : 'scaleX(-1)',
        }}
        className="mt-3"
      />
      <div className="flex justify-center">
        {isMissionSelected ? (
          <div className="flex justify-center text-gray-50 bg-gray-700 px-3 py-2 mt-4 rounded-[14px] text-sm">
            이래저래이래저래 사진을 찍어보세요
          </div>
        ) : (
          <div className="flex justify-center text-gray-500 bg-gray-200 px-3 py-2 mt-4 rounded-[14px] text-sm">
            모임의 순간을 담아주세요!
          </div>
        )}
      </div>

      <div className="flex items-center justify-center w-full mt-7">
        <button
          type="button"
          onClick={onToggleCamera}
          className="flex items-center justify-center w-1/3"
        >
          <Image
            src={CameraSwitchButton}
            alt="Camera Switch Button"
            className="w-6 h-6"
          />
        </button>
        <div className="flex items-center justify-center w-1/3">
          <button type="button" onClick={onCapture}>
            <Image
              src={CameraCaptureButton}
              alt="Camera Capture Button"
              className="w-16 h-16"
            />
          </button>
        </div>
        <div className="w-1/3" />
      </div>
    </div>
  )
}

export default CameraView
