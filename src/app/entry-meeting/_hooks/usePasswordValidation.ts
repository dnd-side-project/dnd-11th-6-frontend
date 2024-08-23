import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  useValidateLeaderAuthKey,
  useValidatePassword,
} from '@/apis/queries/meetingQueries'
import useDebounce from '@/hooks/useDebounce'

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

  const validatePassword = useValidatePassword()
  const validateLeaderAuthKey = useValidateLeaderAuthKey()

  useEffect(() => {
    if (debouncedPassword && debouncedPassword.length >= 6) {
      validatePassword.mutate({
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
      validateLeaderAuthKey.mutate({
        meetingId: currentMeetingId,
        leaderAuthKey: debouncedLeaderAuthKey,
      })
    } else {
      setApiErrorMessageLeaderAuthKey(null)
    }
  }, [isLeader, debouncedLeaderAuthKey, currentMeetingId])

  useEffect(() => {
    if (validatePassword.isError) {
      setApiErrorMessagePassword(
        validatePassword.error?.error?.code === 'MEETING_INVALIDATE_PASSWORD'
          ? '암호가 일치하지 않습니다.'
          : validatePassword.error?.error?.message ||
              '오류가 발생했습니다. 다시 시도해주세요.',
      )
    } else if (validatePassword.isSuccess) {
      setApiErrorMessagePassword(null)
    }
  }, [
    validatePassword.isError,
    validatePassword.isSuccess,
    validatePassword.error,
  ])

  useEffect(() => {
    if (validateLeaderAuthKey.isError) {
      setApiErrorMessageLeaderAuthKey(
        validateLeaderAuthKey.error?.error?.code ===
          'MEETING_INVALIDATE_AUTH_KEY'
          ? '암호가 일치하지 않습니다.'
          : validateLeaderAuthKey.error?.error?.message ||
              '오류가 발생했습니다. 다시 시도해주세요.',
      )
    } else if (validateLeaderAuthKey.isSuccess) {
      setApiErrorMessageLeaderAuthKey(null)
    }
  }, [
    validateLeaderAuthKey.isError,
    validateLeaderAuthKey.isSuccess,
    validateLeaderAuthKey.error,
  ])

  useEffect(() => {
    reset({ password: '', leaderAuthKey: '' })
    validatePassword.reset()
    validateLeaderAuthKey.reset()
  }, [isLeader, reset])

  return {
    control,
    errors,
    isLeader,
    setIsLeader,
    apiErrorMessagePassword,
    apiErrorMessageLeaderAuthKey,
    validatePassword,
    validateLeaderAuthKey,
  }
}

export default usePasswordValidation
