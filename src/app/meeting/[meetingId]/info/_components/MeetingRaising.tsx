import React, { useState } from 'react'
import {
  useGetMeetingPassword,
  useShareMeeting,
} from '@/apis/queries/meetingQueries'
import useMeetingStore from '@/stores/useMeetingStore'
import useUserStore from '@/stores/useUserStore'
import Image from 'next/image'
import Link from 'public/icons/link.svg'
import Share from 'public/icons/share.svg'
import QRCode from 'public/icons/qr-code.svg'
import { useGetParticipantMissions } from '@/apis/queries/missionQuries'
import QRPopup from '@/components/QRPopup'

function MeetingRaising() {
  const role = useUserStore((state) => state.role)
  const nickname = useUserStore((state) => state.nickname)
  const meetingName = useMeetingStore((state) => state.meetingData?.name)
  console.log('meetingName:', meetingName)
  const meetingSymbolColor = useMeetingStore(
    (state) => state.meetingData?.symbolColor,
  )
  const meetingId =
    useMeetingStore((state) => state.meetingData?.meetingId) ?? 0

  const {
    data: shareData,
    isLoading: isShareDataLoading,
    error: shareDataError,
  } = useShareMeeting(meetingId)

  const {
    data: missionData,
    isLoading: isMissionDataLoading,
    error: missionDataError,
  } = useGetParticipantMissions(meetingId)

  const {
    data: passwordData,
    isLoading: isPasswordDataLoading,
    error: passwordDataError,
  } = useGetMeetingPassword(meetingId)

  const [sharePassword, setSharePassword] = useState(false)
  const [shareAdminKey, setShareAdminKey] = useState(false)
  const [copyStatus, setCopyStatus] = useState('공유하기')
  const [showQRPopup, setShowQRPopup] = useState(false)

  console.log('role:', role)
  console.log('nickname:', nickname)

  const handleShare = () => {
    const meetingLink = `https://get-snappy/${shareData?.data.meetingLink}`
    let shareText = `우리 모임에서 같이 스냅피하자!\n${meetingLink}\n`

    if (sharePassword) {
      shareText += '비밀번호: 0000\n'
    }
    if (shareAdminKey && role === 'LEADER') {
      shareText += '관리자키: 0000\n'
    }

    navigator.clipboard.writeText(shareText).then(() => {
      setCopyStatus('복사완료!')
      setTimeout(() => setCopyStatus('공유하기'), 2000)
    })
  }
  if (isShareDataLoading || isMissionDataLoading || isPasswordDataLoading)
    return <div>데이터를 불러오는 중...</div>
  if (shareDataError || missionDataError || passwordDataError)
    return <div>데이터를 불러오는데 실패했습니다.</div>

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col px-5 py-4">
        <div className="text-body1-semibold text-gray-800">
          모임을 공유해보세요!
        </div>
        <hr className="h-[1px] w-full bg-gray-800 mt-3 mb-3" />
        <div className="flex">
          <Image src={Link} alt="link" className="mr-2" />
          <div className="text-body2 text-gray-700">
            https://get-snappy/{shareData?.data.meetingLink}
          </div>
        </div>
        <div className="flex mt-3">
          <label className="mr-5 flex items-center">
            <input
              type="checkbox"
              className="mr-2 cursor-pointer accent-point-mint"
              checked={sharePassword}
              onChange={(e) => setSharePassword(e.target.checked)}
            />
            <span className="text-body2 text-gray-700">
              비밀번호 {passwordData?.data.password}
            </span>
          </label>
          {role === 'LEADER' && (
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer accent-point-mint"
                checked={shareAdminKey}
                onChange={(e) => setShareAdminKey(e.target.checked)}
              />
              <span className="text-body2 text-gray-700">
                관리자키 {passwordData?.data.leaderAuthKey}
              </span>
            </label>
          )}
        </div>

        <div className="flex mt-4">
          <button
            onClick={() => setShowQRPopup(true)}
            className="flex justify-center items-center w-1/2 bg-gray-50 rounded-[14px] p-[14px] text-label-medium text-gray-700"
          >
            <Image src={Share} alt="share" className="mr-2" />
            QR 보기
          </button>
          <div className="w-3" />
          <button
            onClick={handleShare}
            className="flex justify-center items-center w-1/2 bg-gray-50 rounded-[14px] p-[14px] text-label-medium text-gray-700"
          >
            <Image src={Share} alt="share" className="mr-2" />
            {copyStatus}
          </button>
        </div>
      </div>

      <div className="flex flex-col px-5 py-4 flex-grow">
        <div className="flex items-center">
          <div className="text-body1-semibold text-gray-800 mr-2">
            등록된 모임 미션
          </div>
          <div className="text-label text-point-mint">
            {missionData?.data.length}개
          </div>
        </div>
        <hr className="h-[1px] w-full bg-gray-800 mt-4 mb-5" />
        <div className="flex-grow flex flex-col">
          {missionData?.data.length === 0 ? (
            <div className="flex-grow flex flex-col justify-center items-center text-body2-medium text-center text-gray-600">
              <p>등록된 모임 미션이 아직 없어요 ;-(</p>
              <p>관리자에게 미션 추가를 요청해보세요.</p>
            </div>
          ) : (
            <div className="flex-grow flex flex-col">
              {missionData?.data.map((mission, index) => (
                <div
                  key={index}
                  className="flex justify-between mb-4 bg-gray-100 rounded-lg px-4 py-[14px]"
                >
                  <div className="flex">
                    <div className="text-body2 text-gray-800 mr-2">
                      {mission.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {showQRPopup && meetingName && (
        <QRPopup
          qrData={`https://get-snappy/${shareData?.data.meetingLink}`}
          meetingName={meetingName}
          // themeColor={meetingSymbolColor}
          onClose={() => setShowQRPopup(false)}
        />
      )}
    </div>
  )
}

export default MeetingRaising
