'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useCamera from '@/hooks/useCamera'
import CameraView from './_components/CameraView'
import PhotoView from './_components/PhotoView'

function PhotoCapture() {
  const [photo, setPhoto] = useState<string | null>(null)
  const {
    isCameraOpen,
    isRearCamera,
    videoRef,
    canvasRef,
    openCamera,
    takePicture,
    toggleCamera,
  } = useCamera(setPhoto)

  const router = useRouter()
  function goBack() {
    router.back()
  }

  return (
    <div className="flex flex-col items-center">
      {isCameraOpen && (
        <CameraView
          videoRef={videoRef}
          isRearCamera={isRearCamera}
          onCapture={takePicture}
          onToggleCamera={toggleCamera}
          goBack={() => goBack()}
        />
      )}
      {photo && (
        <PhotoView
          photo={photo}
          onRetake={openCamera}
          goBack={() => goBack()}
        />
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

export default PhotoCapture
