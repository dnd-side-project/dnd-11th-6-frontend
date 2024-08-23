import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

interface Snapshot {
  snapId: number
  snapUrl: string
  type: 'SIMPLE' | 'RANDOM_MISSION' | 'MEETING_MISSION'
}

interface SnapshotsResponse {
  status: number
  data: {
    nextCursorId: number
    data: Snapshot[]
    count: number
    hasNext: boolean
  }
}

const useSnapshots = (meetingId: number) => {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([])
  const [totalSnapshots, setTotalSnapshots] = useState<number>(0)
  const [cursorId, setCursorId] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [hasMore, setHasMore] = useState(true)

  const fetchSnapshots = useCallback(async () => {
    if (!hasMore || loading) return

    setLoading(true)
    try {
      const response = await axios.get<SnapshotsResponse>(
        `/api/v1/meetings/${meetingId}/snaps`,
        {
          params: { cursorId, limit: 5 },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
        },
      )

      const newSnapshots = response.data.data.data
      setTotalSnapshots(response.data.data.count)
      setSnapshots((prevSnapshots) => [...prevSnapshots, ...newSnapshots])
      setCursorId(response.data.data.nextCursorId)
      setHasMore(response.data.data.hasNext)
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('An error occurred while fetching snapshots'),
      )
    } finally {
      setLoading(false)
    }
  }, [meetingId, cursorId, hasMore, loading])

  useEffect(() => {
    fetchSnapshots()
  }, [meetingId])

  return {
    totalSnapshots,
    snapshots,
    loading,
    error,
    fetchMore: fetchSnapshots,
    hasMore,
  }
}

export default useSnapshots
