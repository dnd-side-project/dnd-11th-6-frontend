'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading'
import useParticipantsMe from '@/hooks/useParticipantsMe'
import useTokens from '@/hooks/useTokens'
import useMeetingStore from '@/stores/useMeetingStore'

const MAX_TOKEN_CHECKS = 3
const CHECK_INTERVAL = 500

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { meetingData } = useMeetingStore()
  const [isClient, setIsClient] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const checkCountRef = useRef(0)
  const lastTokenCheckRef = useRef<boolean | null>(null)
  const [isTokenCheckStable, setIsTokenCheckStable] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const {
    data: tokenData,
    isLoading: tokenCheckLoading,
    refetch: refetchTokens,
  } = useTokens(meetingData?.meetingId ?? 0)

  const { refetch: checkAuth } = useParticipantsMe(
    meetingData?.meetingId ?? 0,
    tokenData?.hasTokens ?? false,
    false,
  )

  useEffect(() => {
    if (isClient && meetingData?.meetingId) {
      const startTokenChecks = async () => {
        const performCheck = async () => {
          if (checkCountRef.current >= MAX_TOKEN_CHECKS) {
            if (timerRef.current) {
              clearTimeout(timerRef.current)
            }
            setIsTokenCheckStable(true)
            return
          }

          try {
            const result = await refetchTokens()
            checkCountRef.current += 1

            if (result.data) {
              lastTokenCheckRef.current = result.data.hasTokens
              console.log(
                `Token check #${checkCountRef.current}/${MAX_TOKEN_CHECKS}:`,
                {
                  hasTokens: result.data.hasTokens,
                  isStable: checkCountRef.current >= 2,
                  lastCheck: lastTokenCheckRef.current,
                },
              )
            }

            if (
              !result.data?.hasTokens &&
              checkCountRef.current < MAX_TOKEN_CHECKS
            ) {
              timerRef.current = setTimeout(performCheck, CHECK_INTERVAL)
            } else {
              setIsTokenCheckStable(true)
            }
          } catch (error) {
            console.error('Token check failed:', error)
            checkCountRef.current += 1
            if (checkCountRef.current < MAX_TOKEN_CHECKS) {
              timerRef.current = setTimeout(performCheck, CHECK_INTERVAL)
            } else {
              setIsTokenCheckStable(true)
            }
          }
        }

        await performCheck()
      }

      startTokenChecks()

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }
      }
    }
    return undefined
  }, [isClient, meetingData?.meetingId, refetchTokens])

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !meetingData?.meetingId || !isTokenCheckStable) {
      return
    }

    const validateAuth = async () => {
      if (!lastTokenCheckRef.current) {
        console.log('No tokens found after all checks, redirecting to home')
        router.push('/')
        return
      }

      try {
        const result = await checkAuth()
        if (result.data) {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Auth validation failed:', error)
        router.push('/')
      }
    }

    validateAuth()
  }, [isClient, meetingData?.meetingId, isTokenCheckStable, router, checkAuth])

  if (!isClient || !meetingData) {
    return null
  }

  if (tokenCheckLoading || !isTokenCheckStable) {
    return <Loading />
  }

  if (isTokenCheckStable && !lastTokenCheckRef.current) {
    router.push('/')
    return null
  }

  if (!isAuthenticated) {
    return <Loading />
  }

  return children
}
