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
      canvas.width = 360
      canvas.height = 480
      const context = canvas.getContext('2d')
      const { videoWidth, videoHeight } = video
      const aspectRatio = videoWidth / videoHeight
      const desiredAspectRatio = 360 / 480

      let sx = 0
      let sy = 0
      let sWidth = videoWidth
      let sHeight = videoHeight

      if (aspectRatio > desiredAspectRatio) {
        sHeight = videoHeight
        sWidth = videoHeight * desiredAspectRatio
        sx = (videoWidth - sWidth) / 2
        sy = 0
      } else {
        sWidth = videoWidth
        sHeight = videoWidth / desiredAspectRatio
        sx = 0
        sy = (videoHeight - sHeight) / 2
      }

      if (!isRearCamera) {
        context?.scale(-1, 1)
        context?.drawImage(
          video,
          sx,
          sy,
          sWidth,
          sHeight,
          -canvas.width,
          0,
          canvas.width,
          canvas.height,
        )
        context?.scale(-1, 1)
      } else {
        context?.drawImage(
          video,
          sx,
          sy,
          sWidth,
          sHeight,
          0,
          0,
          canvas.width,
          canvas.height,
        )
      }

      const dataUrl = canvas.toDataURL('image/png')
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
