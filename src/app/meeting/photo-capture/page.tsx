'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useCamera from '@/hooks/useCamera'
import useMissionStore from '@/stores/useMissionStore'
import CameraView from './_components/CameraView'
import PhotoView from './_components/PhotoView'

function PhotoCapture() {
  const router = useRouter()
  const [photo, setPhoto] = useState<string | null>(null)
  const [captureTime, setCaptureTime] = useState<Date | null>(null)
  const { setMissionId, setMissionType, setCurrentMission } = useMissionStore()

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

  const goHome = () => {
    // 미션 데이터 초기화
    setMissionId(null)
    setMissionType(null)
    setCurrentMission(null)

    // 홈으로 이동
    router.push(`/meeting-home`)
  }

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
          goHome={goHome}
        />
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

export default PhotoCapture
