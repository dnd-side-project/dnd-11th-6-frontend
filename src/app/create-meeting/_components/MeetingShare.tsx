import React, { useState } from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/Button'
import Tooltip from '@/components/Tooltip'
import useMeetStore from '@/stores/useMeetStore'
import useTooltipStore from '@/stores/useTooltipStore'
import Share from 'public/icons/share.svg'
import Logo from 'public/logo.svg'

function MeetingShare() {
  const { activeTooltip, showTooltip, hideTooltip } = useTooltipStore()
  const { meetingResult } = useMeetStore()
  const [shareAdminKey, setShareAdminKey] = useState(false)
  const [copyStatus, setCopyStatus] = useState('공유하기')

  const handleShare = () => {
    const meetingLink = `https://get-snappy.co.kr/entry-meeting/${meetingResult?.meetingLink}`
    let shareText = `우리 모임에서 같이 스냅피하자!\n${meetingLink}\n`
    shareText += `시작 시간: ${meetingResult?.startDate}\n`
    shareText += `종료 시간: ${meetingResult?.endDate}\n`
    shareText += `비밀번호: ${meetingResult?.password}\n`
    if (shareAdminKey) {
      shareText += `관리자키: ${meetingResult?.leaderAuthKey}\n`
    }

    navigator.clipboard.writeText(shareText).then(() => {
      setCopyStatus('복사완료!')
      setTimeout(() => setCopyStatus('공유하기'), 2000)
    })
  }

  if (!meetingResult) {
    return null
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-[42px] text-center">
        <h2 className="text-xl font-bold mb-2">모임이 생성되었어요 🎉</h2>
        <p className="text-sm text-gray-600 mb-7">
          생성된 모임 앨범을 친구들에게 알려보세요.
        </p>
        <Image
          src={meetingResult.qrCodeUrl || Logo}
          width={195}
          height={195}
          className="mb-4 w-full"
          alt="qrCode"
        />
        <p className="text-lg font-medium text-gray-600">
          {meetingResult.name}
        </p>
      </div>
      <div className="bg-gray-100 p-5 rounded-2xl mb-7 w-full">
        <div className="flex justify-between mb-4">
          <span className="text-sm text-gray-600">시작 시간</span>
          <span className="text-sm font-medium">
            {dayjs(meetingResult.startDate).format('YYYY/MM/DD A hh:mm')}
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-sm text-gray-600">종료 시간</span>
          <span className="text-sm font-medium">
            {dayjs(meetingResult.endDate).format('YYYY/MM/DD A hh:mm')}
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <div className="flex justify-center relative">
            <span className="text-sm font-medium flex items-center text-gray-600">
              비밀번호
              <button onClick={() => showTooltip('password')} className="ml-1">
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
                  className="top-[28px] left-[138px]"
                  message="모임 앨범에 진입할 때 사용해요."
                  onClose={hideTooltip}
                  position="bottom"
                />
              )}
            </span>
          </div>
          <span className="text-sm font-medium flex items-center">
            {meetingResult.password}
          </span>
        </div>
        <div className="flex justify-between relative">
          <span className="text-sm text-gray-600 flex justify-center">
            관리자키
            <button onClick={() => showTooltip('admin')} className="ml-1">
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
                message="모임 앨범을 관리할 수 있는 관리자 암호에요."
                onClose={hideTooltip}
                position="top"
              />
            )}
          </span>
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">
              {meetingResult.leaderAuthKey}
            </span>

            <label className="text-sm text-gray-600 ml-1">
              <input
                type="checkbox"
                checked={shareAdminKey}
                onChange={(e) => setShareAdminKey(e.target.checked)}
                className="mr-2"
              />
              함께 공유하기
            </label>
          </div>
        </div>
        <Button
          variant="primary"
          className="bg-white text-black mt-5"
          fullWidth
        >
          <Image src="../icons/share.svg" width={20} height={20} alt="share" />
          <button
            onClick={handleShare}
            className="text-black font-semibold text-base ml-2"
          >
            <Image src={Share} alt="share" className="mr-2" />
            {copyStatus}
          </button>
        </Button>
      </div>
      <Link href="/entry-meeting">
        <Button variant="primary" className="mt-auto mb-5 text-white" fullWidth>
          앨범 입장하기
        </Button>
      </Link>
    </div>
  )
}

export default MeetingShare
