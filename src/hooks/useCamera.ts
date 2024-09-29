import { useState, useRef, useEffect } from 'react'

function useCamera(setPhoto: (photo: string | null) => void) {
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [isRearCamera, setIsRearCamera] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const openCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('미디어 장치가 지원되지 않는 브라우저입니다.')
      return
    }

    setIsCameraOpen(true)
    setPhoto(null)

    const constraints = {
      video: {
        facingMode: isRearCamera ? 'environment' : 'user',
      },
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      if (videoRef.current) {
        if (videoRef.current.srcObject) {
          const existingStream = videoRef.current.srcObject as MediaStream
          existingStream.getTracks().forEach((track) => track.stop())
          videoRef.current.srcObject = null
        }

        videoRef.current.srcObject = stream

        videoRef.current.onloadeddata = async () => {
          try {
            if (videoRef.current) {
              await videoRef.current.play()
            }
          } catch (err) {
            console.error('비디오를 재생할 수 없습니다:', err)
          }
        }
      }
    } catch (err) {
      console.error('카메라를 열 수 없습니다:', err)
    }
  }

  const takePicture = () => {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (canvas && video) {
      const dpr = window.devicePixelRatio || 1
      const videoRect = video.getBoundingClientRect()
      const size = Math.min(videoRect.width, videoRect.height)

      canvas.width = size * dpr
      canvas.height = size * dpr
      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`

      const context = canvas.getContext('2d')
      if (context) {
        context.scale(dpr, dpr)
      }

      const scaleX = video.videoWidth / videoRect.width
      const scaleY = video.videoHeight / videoRect.height

      const centerX = videoRect.width / 2
      const centerY = videoRect.height / 2

      const sx = (centerX - size / 2) * scaleX
      const sy = (centerY - size / 2) * scaleY
      const sSize = size * scaleX

      if (!isRearCamera) {
        context?.scale(-1, 1)
        context?.drawImage(video, sx, sy, sSize, sSize, -size, 0, size, size)
        context?.scale(-1, 1)
      } else {
        context?.drawImage(video, sx, sy, sSize, sSize, 0, 0, size, size)
      }

      const dataUrl = canvas.toDataURL('image/jpeg', 0.95)
      setPhoto(dataUrl)

      const stream = video.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      setIsCameraOpen(false)
    }
  }

  const toggleCamera = () => {
    setIsRearCamera((prevState) => !prevState)
  }

  useEffect(() => {
    openCamera()
  }, [isRearCamera])

  return {
    isCameraOpen,
    isRearCamera,
    videoRef,
    canvasRef,
    openCamera,
    takePicture,
    toggleCamera,
  }
}

export default useCamera
