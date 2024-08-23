'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useCamera from '@/hooks/useCamera'
import useMeetingStore from '@/stores/useMeetingStore'
import CameraView from './_components/CameraView'
import PhotoView from './_components/PhotoView'

function PhotoCapture() {
  const router = useRouter()
  const [photo, setPhoto] = useState<string | null>(null)
  const [captureTime, setCaptureTime] = useState<Date | null>(null)
  const meetingId = useMeetingStore((state) => state.meetingData?.meetingId)

  const {
    isCameraOpen,
    isRearCamera,
    videoRef,
    canvasRef,
    openCamera,
    takePicture,
    toggleCamera,
  } = useCamera((photoData: string | null) => {
    setPhoto(photoData)
    setCaptureTime(new Date())
  })

  return (
    <div className="flex flex-col items-center">
      {isCameraOpen && (
        <CameraView
          videoRef={videoRef}
          isRearCamera={isRearCamera}
          onCapture={takePicture}
          onToggleCamera={toggleCamera}
          goBack={() => router.back()}
        />
      )}
      {photo && (
        <PhotoView
          photo={photo}
          captureTime={captureTime}
          onRetake={openCamera}
          goHome={() => router.push(`/meeting/${meetingId}`)}
        />
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

export default PhotoCapture
