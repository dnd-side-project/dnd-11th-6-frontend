import { useCallback, useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { useParticipants } from '@/apis/queries/participantsQueries'
import useMeetingStore from '@/stores/useMeetingStore'
import useUserStore from '@/stores/useUserStore'
import Edit from 'public/icons/edit.svg'
import Leader from 'public/icons/leader.svg'

function MeetingDetail() {
  const role = useUserStore((state) => state.role)
  const meetingData = useMeetingStore((state) => state.meetingData)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showToggle, setShowToggle] = useState(false)
  const description = meetingData?.description ?? ''
  const MAX_LENGTH = 80

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '-'
    return dayjs(dateString).format('YYYY.MM.DD A hh:mm')
  }

  const limit = 10
  const {
    data: participantsData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useParticipants(meetingData?.meetingId ?? 0, limit)

  const observer = useRef<IntersectionObserver | null>(null)
  const lastParticipantRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      })
      if (node) observer.current.observe(node)
    },
    [isFetching, hasNextPage, fetchNextPage],
  )

  useEffect(() => {
    setShowToggle(description.length > MAX_LENGTH)
  }, [description])

  return (
    <div>
      <div className="flex flex-col px-5 py-4">
        <div className="flex justify-between items-center">
          <div className=" text-body1-semibold">우리는 이런 모임이에요!</div>
          {role === 'LEADER' && (
            <Link href="/manage-meeting">
              <Image src={Edit} alt="edit" />
            </Link>
          )}
        </div>
        <hr className="h-[1px] w-full bg-gray-800 mt-3 mb-3" />
        <div>{}</div>
        <div>
          {isExpanded ? description : description.slice(0, MAX_LENGTH)}
          {showToggle && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500"
            >
              {isExpanded ? '\u00A0접기' : '...더보기'}
            </button>
          )}
        </div>
        <div className="flex mt-4">
          <div className="flex flex-col w-1/2 bg-gray-50 rounded-[14px] p-3">
            <div className="text-label-semibold text-gray-700">시작</div>
            <div className="text-caption mt-1 text-gray-500">
              {formatDate(meetingData?.startDate)}
            </div>
          </div>
          <div className="w-3" />
          <div className="flex flex-col w-1/2 bg-gray-50 rounded-[14px] p-3">
            <div className="text-label-semibold text-gray-700">종료</div>
            <div className="text-caption mt-1 text-gray-500">
              {formatDate(meetingData?.endDate)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-5 py-4">
        <div className="flex items-center">
          <div className="text-body1-semibold text-gray-800 mr-2">
            참여자 정보
          </div>
          <div
            className="text-label "
            style={{ color: meetingData?.symbolColor }}
          >
            총 {participantsData?.pages[0]?.data.count ?? '-'}명
          </div>
        </div>
        <hr className="h-[1px] w-full bg-gray-800 mt-3 mb-3" />
        <div>
          {participantsData?.pages.map((page, pageIndex) =>
            page.data.data.map((participant, index) => (
              <div
                key={`${pageIndex}-${index}`}
                className="flex justify-between mb-5"
                ref={
                  pageIndex === participantsData.pages.length - 1 &&
                  index === page.data.data.length - 1
                    ? lastParticipantRef
                    : null
                }
              >
                <div className="flex">
                  <div className="text-label text-gray-800 mr-2">
                    {participant.nickname}
                  </div>
                  {participant.role === 'LEADER' && (
                    <Image src={Leader} alt="leader" />
                  )}
                </div>
                {participant.shootCount === 10 ? (
                  <div className="text-label text-gray-800">촬영 완료</div>
                ) : (
                  <div className="px-2 bg-gray-50 text-label-semibold text-gray-700">
                    <span style={{ color: meetingData?.symbolColor }}>
                      {participant.shootCount}
                    </span>{' '}
                    / 10
                  </div>
                )}
              </div>
            )),
          )}
          {isFetching && <div>Loading...</div>}
        </div>
      </div>
    </div>
  )
}

export default MeetingDetail
