import { useState, useEffect } from 'react'
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

const useSnapshots = (
  meetingId: number,
  initialCursorId: number = 64,
  limit: number = 3,
) => {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([])
  const [nextCursorId, setNextCursorId] = useState<number | null>(
    initialCursorId,
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchSnapshots = async () => {
    if (!nextCursorId) return

    setLoading(true)
    try {
      const response = await axios.get<SnapshotsResponse>(
        `/api/v1/meetings/${meetingId}/snaps`,
        {
          params: { cursorId: nextCursorId, limit },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Cookie: `ACCESS_TOKEN_53=eyJhbGciOiJIUzI1NiJ9.eyJwWXJOXJOaWFwFOIjoxNSwiaXNwaWFwFOIjoxNSwiaCJzZXNzaW9uSWQiOiJ`,
          },
        },
      )

      setSnapshots((prevSnapshots) => [
        ...prevSnapshots,
        ...response.data.data.data,
      ])
      setNextCursorId(
        response.data.data.hasNext ? response.data.data.nextCursorId : null,
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('An error occurred while fetching snapshots'),
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSnapshots()
  }, [meetingId])

  return {
    snapshots,
    loading,
    error,
    fetchMore: fetchSnapshots,
    hasMore: !!nextCursorId,
  }
}

export default useSnapshots
