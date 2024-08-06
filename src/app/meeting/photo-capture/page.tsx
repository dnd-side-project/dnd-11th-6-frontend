'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import CameraCaptureButton from '@/assets/CameraCaptureButton.svg'
import CameraSwitchButton from '@/assets/CameraSwitchButton.svg'
import Refresh from '@/assets/Refresh.svg'
import Close from '@/assets/close.svg'

function PhotoCapture() {
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [photo, setPhoto] = useState<string | null>(null)
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
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (err) {
      console.error('카메라를 열 수 없습니다:', err)
    }
  }

  useEffect(() => {
    openCamera()
  }, [isRearCamera])

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

      let sx
      let sy
      let sWidth
      let sHeight

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
    if (isCameraOpen) {
      openCamera()
    }
  }

  const downloadPhoto = () => {
    if (photo) {
      const link = document.createElement('a')
      link.href = photo
      link.download = `photo_${new Date().getTime()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="flex flex-col items-center">
      {isCameraOpen && (
        <>
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-between items-center px-4 py-3 w-44 h-12 rounded-[14px] border border-black">
              <div>미션 뽑으러가기</div>
              <div>&gt;</div>
            </div>{' '}
            <div className="flex-1">{} </div>
            <div className="flex-1 flex justify-end items-center">
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
          />{' '}
          <div className="flex items-center justify-center w-full mt-10">
            <button
              type="button"
              onClick={toggleCamera}
              className="flex items-center justify-center w-1/3"
            >
              <Image
                src={CameraSwitchButton}
                alt="Camera Switch Button"
                className="w-6 h-6"
              />
            </button>
            <div className="flex items-center justify-center w-1/3">
              <button type="button" onClick={takePicture}>
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
      )}
      {photo && (
        <div className="flex flex-col items-center w-full h-full">
          <div className="flex justify-between items-center w-full">
            <div className="flex-1">{}</div>
            <div className="flex-1 flex justify-center items-center">
              <div>촬영자님의 스냅</div>
            </div>
            <div className="flex-1 flex justify-end items-center">
              <Image src={Close} alt="Close Button" className="w-6 h-6" />
            </div>
          </div>
          <div className="h-11 rounded-[14px] px-[18px] py-[10px] bg-[#F2F5F5] mt-6">
            모임에서 가장 뫄뫄한 사람 찍기
          </div>
          <img
            src={photo}
            alt="찍은 사진"
            className="w-[360px] h-[480px] rounded-[14px] mt-3"
            style={{ objectFit: 'cover' }}
          />
          <div className="text-[#888D91] mt-3">2024.08.06 PM 10:08</div>
          <div className="button-group flex w-full mt-20">
            <button
              type="button"
              onClick={openCamera}
              className="flex justify-center items-center rounded-[14px] border border-black w-20 h-14 mr-3"
            >
              <Image src={Refresh} alt="Retake Button" className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={downloadPhoto}
              className="bg-black text-white rounded-[14px] w-full h-14"
            >
              스냅 업로드하기
            </button>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

export default PhotoCapture
