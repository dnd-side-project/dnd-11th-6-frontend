import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CameraCaptureButton from '@/assets/CameraCaptureButton.svg'
import CameraSwitchButton from '@/assets/CameraSwitchButton.svg'
import Close from '@/assets/close.svg'
import Tooltip from '@/components/Tooltip'
import useMissionStore from '@/stores/useMissionStore'
import useTooltipStore from '@/stores/useTooltipStore'
import PlusGray from 'public/icons/plus-gray.svg'

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
  const { activeTooltip, hideTooltip, showTooltip } = useTooltipStore()
  const currentMission = useMissionStore((state) => state.currentMission)
  const setCurrentMission = useMissionStore((state) => state.setCurrentMission)

  useEffect(() => {
    if (currentMission) {
      hideTooltip()
    } else {
      showTooltip('mission')
    }
  }, [currentMission, hideTooltip, showTooltip])

  return (
    <div className="flex flex-col min-h-screen w-full ">
      {/* header */}
      <div className="p-4">
        <div className="flex justify-between items-center h-12 w-full">
          <div className="relative">
            <Link href="/create-mission">
              <div className="flex justify-between items-center px-3 py-2 rounded-[14px] bg-gray-200 text-body2 text-gray-700">
                {currentMission ? (
                  <>미션 바꾸기</>
                ) : (
                  <>
                    <Image
                      src={PlusGray}
                      alt="Plus Gray"
                      className="w-4 h-4 mr-2"
                    />
                    미션 추가하기
                  </>
                )}
              </div>
              {!currentMission && activeTooltip === 'mission' && (
                <Tooltip
                  message="내 사진에 미션을 더 해봐요!"
                  onClose={hideTooltip}
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
      </div>

      {/* camera */}
      <div className="w-full mt-auto mb-auto">
        <div className="relative w-full pb-[100%] overflow-hidden rounded-[14px]">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto max-w-none"
            style={{
              transform: `${isRearCamera ? '' : 'scaleX(-1)'} translate(-50%, -50%)`,
            }}
          />
        </div>
      </div>

      {/* footer */}
      <div className="flex flex-col mt-auto mb-9">
        <div className="flex justify-center">
          {currentMission ? (
            <div className="flex justify-center text-gray-50 bg-point-mint px-3 py-2 rounded-[14px] text-sm">
              {currentMission}
              <button onClick={() => setCurrentMission(null)} className="ml-2">
                X
              </button>
            </div>
          ) : (
            <div className="flex justify-center text-gray-500 bg-gray-200 px-3 py-2 rounded-[14px] text-sm">
              모임의 순간을 담아주세요!
            </div>
          )}
        </div>

        <div className="flex items-center justify-center w-full mt-5">
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
    </div>
  )
}

export default CameraView
