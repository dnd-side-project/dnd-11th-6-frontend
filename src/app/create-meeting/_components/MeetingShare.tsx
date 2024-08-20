import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/Button'
import Tooltip from '@/components/Tooltip'
import useMeetStore from '@/stores/useMeetStore'
import useTooltipStore from '@/stores/useTooltipStore'

function MeetingShare() {
  const { activeTooltip, showTooltip, hideTooltip } = useTooltipStore()
  const { meetingResult } = useMeetStore()

  return (
    <div className="flex flex-col items-center">
      <div className="mb-[42px] text-center">
        <h2 className="text-xl font-bold mb-2">모임이 생성되었어요 🎉</h2>
        <p className="text-sm text-gray-600 mb-7">
          생성된 모임 앨범을 친구들에게 알려보세요.
        </p>
        <Image
          src={meetingResult?.qrCodeUrl || ''}
          width={195}
          height={195}
          className="mb-4 w-full"
          alt="qrCode"
        />
        <p className=" text-lg font-medium text-gray-600">{}</p>
      </div>
      <div className="bg-gray-100 p-5 rounded-2xl mb-7 w-full">
        <div className="flex justify-between mb-4">
          <span className="text-sm text-gray-600">시작 시간</span>
          <span className="text-sm font-medium">
            {meetingResult?.startDate}
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-sm text-gray-600">종료 시간</span>
          <span className="text-sm font-medium">{meetingResult?.endDate}</span>
        </div>
        <div className="flex justify-between mb-4">
          <div className="flex justify-center relative">
            <span className="text-sm font-medium flex items-center text-gray-600">
              비밀번호
              <button onClick={() => showTooltip('password')} className="ml-1 ">
                <Image
                  src="../icons/info.svg"
                  width={16}
                  height={16}
                  alt="info"
                />
              </button>
              {activeTooltip === 'password' && (
                <Tooltip
                  textColor="text-black"
                  bgColor="bg-white"
                  arrowClassName="left-12 bg-white"
                  className="top-[28px] left-[138px] "
                  message="모임 앨범에 진입할 때 사용해요."
                  onClose={hideTooltip}
                  position="bottom"
                />
              )}
            </span>
          </div>
          <span className="text-sm font-medium flex items-center">
            {meetingResult?.password}
          </span>
        </div>
        <div className="flex justify-between relative">
          <span className="text-sm text-gray-600 flex justify-center">
            관리자키
            <button onClick={() => showTooltip('admin')} className="ml-1 ">
              <Image
                src="../icons/info.svg"
                width={16}
                height={16}
                alt="info"
              />
            </button>
            {activeTooltip === 'admin' && (
              <Tooltip
                textColor="text-black"
                bgColor="bg-white"
                arrowClassName="left-[138px]"
                className="top-[28px] left-[138px]"
                message="모임 앨범을 관리할 수 있는 관리자 암호에예요."
                onClose={hideTooltip}
                position="top"
              />
            )}
          </span>
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">
              {meetingResult?.leaderAuthKey}
            </span>
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-600 ml-1">함께 공유하기</span>
          </div>
        </div>
        <Button
          // onClick={}
          variant="primary"
          className="mt-auto mb-5"
          fullWidth
        >
          <Image src="../icons/share.svg" width={20} height={20} alt="share" />
          공유하기
        </Button>
      </div>
      <Button
        // onClick={}
        variant="primary"
        className="mt-auto mb-5"
        fullWidth
      >
        앨범 입장하기
      </Button>
    </div>
  )
}

export default MeetingShare
