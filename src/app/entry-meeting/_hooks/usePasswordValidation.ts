import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { validateLeaderAuthKey, validatePassword } from '@/apis/meetingApi'
import useDebounce from '@/hooks/useDebounce'
import { ApiError } from '@/types/api'
import {
  ValidateLeaderAuthKeyResponse,
  ValidatePasswordResponse,
} from '@/types/meeting'

const passwordSchema = z.object({
  password: z.string().min(6, '최소 6자 이상 입력해주세요.'),
  leaderAuthKey: z
    .string()
    .length(4, '정확히 4자리를 입력해주세요.')
    .optional(),
})

type PasswordFormData = z.infer<typeof passwordSchema>

export const usePasswordValidation = (currentMeetingId: number) => {
  const [isLeader, setIsLeader] = useState(false)
  const [apiErrorMessagePassword, setApiErrorMessagePassword] = useState<
    string | null
  >(null)
  const [apiErrorMessageLeaderAuthKey, setApiErrorMessageLeaderAuthKey] =
    useState<string | null>(null)

  const {
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
  })

  const passwordValue = watch('password')
  const leaderAuthKeyValue = watch('leaderAuthKey')
  const debouncedPassword = useDebounce(passwordValue, 500)
  const debouncedLeaderAuthKey = useDebounce(leaderAuthKeyValue, 500)

  const validatePasswordMutation = useMutation<
    ValidatePasswordResponse,
    ApiError,
    { meetingId: number; password: string }
  >({
    mutationFn: ({ meetingId, password }) =>
      validatePassword(meetingId, password),
    onError: (error) => {
      setApiErrorMessagePassword(
        error.error?.code === 'MEETING_INVALIDATE_PASSWORD'
          ? '암호가 일치하지 않습니다.'
          : error.error?.message || '오류가 발생했습니다. 다시 시도해주세요.',
      )
    },
    onSuccess: () => {
      setApiErrorMessagePassword(null)
    },
  })

  const validateLeaderAuthKeyMutation = useMutation<
    ValidateLeaderAuthKeyResponse,
    ApiError,
    { meetingId: number; leaderAuthKey: string }
  >({
    mutationFn: ({ meetingId, leaderAuthKey }) =>
      validateLeaderAuthKey(meetingId, leaderAuthKey),
    onError: (error) => {
      setApiErrorMessageLeaderAuthKey(
        error.error?.code === 'MEETING_INVALIDATE_AUTH_KEY'
          ? '암호가 일치하지 않습니다.'
          : error.error?.message || '오류가 발생했습니다. 다시 시도해주세요.',
      )
    },
    onSuccess: () => {
      setApiErrorMessageLeaderAuthKey(null)
    },
  })

  useEffect(() => {
    if (debouncedPassword && debouncedPassword.length >= 6) {
      validatePasswordMutation.mutate({
        meetingId: currentMeetingId,
        password: debouncedPassword,
      })
    } else {
      setApiErrorMessagePassword(null)
    }
  }, [debouncedPassword, currentMeetingId])

  useEffect(() => {
    if (
      isLeader &&
      debouncedLeaderAuthKey &&
      debouncedLeaderAuthKey.length === 4
    ) {
      validateLeaderAuthKeyMutation.mutate({
        meetingId: currentMeetingId,
        leaderAuthKey: debouncedLeaderAuthKey,
      })
    } else {
      setApiErrorMessageLeaderAuthKey(null)
    }
  }, [isLeader, debouncedLeaderAuthKey, currentMeetingId])

  useEffect(() => {
    reset({ password: '', leaderAuthKey: '' })
    validatePasswordMutation.reset()
    validateLeaderAuthKeyMutation.reset()
  }, [isLeader, reset])

  return {
    control,
    errors,
    isLeader,
    setIsLeader,
    apiErrorMessagePassword,
    apiErrorMessageLeaderAuthKey,
    validatePassword: validatePasswordMutation,
    validateLeaderAuthKey: validateLeaderAuthKeyMutation,
  }
}

export default usePasswordValidation
