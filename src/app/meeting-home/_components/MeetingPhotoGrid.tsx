import React, { useRef, useCallback } from 'react'
import Image from 'next/image'
import useSnapshots from '@/apis/getSnapApi'
import useMeetingStore from '@/stores/useMeetingStore'

interface PhothoGirdProps {
  activeChip: string
}

const MeetingPhotoGrid = ({ activeChip }: PhothoGirdProps) => {
  const { meetingData } = useMeetingStore()
  const {
    totalSnapshots,
    snapshots,
    loading: snapshotsLoading,
    error: snapshotsError,
    fetchMore,
    hasMore,
  } = useSnapshots(meetingData?.meetingId ?? 0, activeChip)

  const observer = useRef<IntersectionObserver | null>(null)
  const lastSnapshotElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (snapshotsLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMore()
        }
      })
      if (node) observer.current.observe(node)
    },
    [snapshotsLoading, hasMore, fetchMore],
  )

  if (snapshotsError) return <div>Error loading snapshots</div>
  return (
    <>
      <div>
        <span className="text-gray-500 text-xs mr-[6px]">전체사진</span>
        <span className="text-gray-700 text-xs font-bold">
          {totalSnapshots}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 p-4">
        {snapshots.map((snapshot, index) => (
          <div
            key={`${snapshot.snapId}${index}`}
            className="aspect-square relative"
            ref={index === snapshots.length - 1 ? lastSnapshotElementRef : null}
          >
            <Image
              src={`https://dnd-11th-6.s3.ap-northeast-2.amazonaws.com/${snapshot.snapUrl}`}
              alt={`Photo ${snapshot.snapId} ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
        {snapshotsLoading && <div>Loading more...</div>}
      </div>
    </>
  )
}

export default MeetingPhotoGrid
