import Image from 'next/image'
import Link from 'next/link'
import CameraCaptureButton from '@/assets/CameraCaptureButton.svg'
import CameraSwitchButton from '@/assets/CameraSwitchButton.svg'
import Close from '@/assets/close.svg'

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
  return (
    <>
      <div className="flex justify-between items-center h-12 w-full">
        <Link href="/create-mission">
          <div className="flex justify-between items-center px-4 py-3 w-44 h-12 rounded-[14px] border border-black">
            미션 뽑으러가기
            <div>&gt;</div>
          </div>
        </Link>
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
        className="mt-8"
      />
      <div className="flex items-center justify-center w-full mt-10">
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
        <div className="w-1/3">{}</div>
      </div>
    </>
  )
}

export default CameraView
