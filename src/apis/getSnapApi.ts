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

const useSnapshots = (meetingId: number, activeChip: string) => {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([])
  const [totalSnapshots, setTotalSnapshots] = useState<number>(0)
  const [cursorId, setCursorId] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [endpoint, setEndpoint] = useState<string>('')

  useEffect(() => {
    if (activeChip === '랜덤미션') {
      setEndpoint('random-mission')
    } else if (activeChip === '모임미션') {
      setEndpoint('meeting-mission')
    } else if (activeChip === '내가찍은') {
      setEndpoint('me')
    } else {
      setEndpoint('')
    }
  }, [activeChip])

  const fetchSnapshots = useCallback(
    async (currentEndpoint: string) => {
      if (!hasMore || loading) return

      setLoading(true)
      try {
        const response = await axios.get<SnapshotsResponse>(
          `/api/v1/meetings/${meetingId}/snaps/${currentEndpoint}`,
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
    },
    [meetingId, cursorId, hasMore, loading],
  )

  useEffect(() => {
    setSnapshots([])
    setCursorId(0)
    setHasMore(true)
    fetchSnapshots(endpoint)
  }, [meetingId, activeChip, endpoint])

  return {
    totalSnapshots,
    snapshots,
    loading,
    error,
    fetchMore: () => fetchSnapshots(endpoint),
    hasMore,
  }
}

export default useSnapshots
