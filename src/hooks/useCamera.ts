import { useState, useRef, useEffect, useCallback } from 'react'

function useCamera(setPhoto: (photo: string | null) => void) {
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [isRearCamera, setIsRearCamera] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const isMountedRef = useRef(true)

  const openCamera = useCallback(async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('미디어 장치가 지원되지 않는 브라우저입니다.')
      return
    }

    setIsCameraOpen(true)
    setPhoto(null)

    try {
      const constraints = {
        video: {
          facingMode: isRearCamera ? 'environment' : 'user',
          width: { ideal: 1080 },
          height: { ideal: 1080 },
          aspectRatio: { exact: 1 },
        },
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      if (!isMountedRef.current) {
        stream.getTracks().forEach((track) => track.stop())
        return
      }

      streamRef.current = stream

      if (videoRef.current && isMountedRef.current) {
        videoRef.current.srcObject = stream
        try {
          await videoRef.current.play()
        } catch (playError) {
          if (playError instanceof Error && playError.name !== 'AbortError') {
            console.error('비디오 재생 중 오류 발생:', playError)
          }
        }
      }
    } catch (err) {
      if (
        isMountedRef.current &&
        err instanceof Error &&
        err.name !== 'AbortError'
      ) {
        console.error('카메라를 열 수 없습니다:', err)
      }
    }
  }, [isRearCamera])

  const drawImageOnCanvas = useCallback(
    (
      context: CanvasRenderingContext2D,
      video: HTMLVideoElement,
      size: number,
      sx: number,
      sy: number,
      sSize: number,
    ) => {
      if (!isRearCamera) {
        context.scale(-1, 1)
        context.drawImage(video, sx, sy, sSize, sSize, -size, 0, size, size)
        context.scale(-1, 1)
      } else {
        context.drawImage(video, sx, sy, sSize, sSize, 0, 0, size, size)
      }
    },
    [isRearCamera],
  )

  const takePicture = useCallback(() => {
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

        const scaleX = video.videoWidth / videoRect.width
        const scaleY = video.videoHeight / videoRect.height
        const centerX = videoRect.width / 2
        const centerY = videoRect.height / 2
        const sx = (centerX - size / 2) * scaleX
        const sy = (centerY - size / 2) * scaleY
        const sSize = size * scaleX

        drawImageOnCanvas(context, video, size, sx, sy, sSize)

        const dataUrl = canvas.toDataURL('image/jpeg', 0.95)
        setPhoto(dataUrl)

        const stream = video.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
        setIsCameraOpen(false)
      }
    }
  }, [isRearCamera])

  const toggleCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }
    setIsRearCamera((prev) => !prev)
  }, [])

  useEffect(() => {
    isMountedRef.current = true
    openCamera()
    return () => {
      isMountedRef.current = false
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [isRearCamera, openCamera])

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
