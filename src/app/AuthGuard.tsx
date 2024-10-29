'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGetParticipantsMe } from '@/apis/queries/participantsQueries'
import Loading from '@/components/Loading'
import useTokens from '@/hooks/useTokens'
import useMeetingStore from '@/stores/useMeetingStore'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { meetingData } = useMeetingStore()
  const [isClient, setIsClient] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const {
    data: tokenData,
    isSuccess: tokenCheckSuccess,
    isLoading: tokenCheckLoading,
  } = useTokens(meetingData?.meetingId ?? 0)

  const { refetch: checkAuth, isError: authError } = useGetParticipantsMe(
    meetingData?.meetingId ?? 0,
    tokenData?.hasTokens ?? false,
    false,
  )

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!meetingData?.meetingId || !tokenCheckSuccess) return

    const validateAuth = async () => {
      // if no tokens found, redirect to home
      if (!tokenData?.hasTokens) {
        console.log('No tokens found, redirecting to home')
        router.push('/')
        return
      }

      // if tokens found, check if user is authenticated
      try {
        await checkAuth()
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Auth validation failed:', error)
      }
    }

    validateAuth()
  }, [
    meetingData?.meetingId,
    tokenCheckSuccess,
    tokenData?.hasTokens,
    router,
    checkAuth,
  ])

  if (!isClient) {
    return null
  }

  if (!meetingData) {
    router.push('/')
    return null
  }

  if (tokenCheckLoading) {
    return <Loading />
  }

  if (!tokenData?.hasTokens) {
    router.push('/')
    return null
  }

  if (!isAuthenticated) {
    return <Loading />
  }

  return children
}
