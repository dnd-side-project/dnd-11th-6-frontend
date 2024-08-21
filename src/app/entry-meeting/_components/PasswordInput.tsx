import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { z } from 'zod'
import {
  useValidateLeaderAuthKey,
  useValidatePassword,
} from '@/apis/queries/entryQueries'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import ToggleSwitch from '@/components/ToogleSwitch'
import useDebounce from '@/hooks/useDeboune'
import useMeetingStore from '@/stores/useMeetingStore'
import CrownSvg from 'public/icons/CrownSvg'
import BackIcon from 'public/icons/back.svg'

const passwordSchema = z.object({
  password: z.string().min(6, '최소 6자 이상 입력해주세요.'),
  leaderAuthKey: z
    .string()
    .length(4, '정확히 4자리를 입력해주세요.')
    .optional(),
})

type PasswordFormData = z.infer<typeof passwordSchema>

interface PasswordInputProps {
  onEnterClick: () => void
  onBackClick: () => void
  onHomeClick: () => void
}

const usePasswordValidation = (currentMeetingId: number) => {
  const [isLeader, setIsLeader] = React.useState(false)
  const [apiErrorMessagePassword, setApiErrorMessagePassword] = React.useState<
    string | null
  >(null)
  const [apiErrorMessageLeaderAuthKey, setApiErrorMessageLeaderAuthKey] =
    React.useState<string | null>(null)

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

  React.useEffect(() => {
    if (debouncedPassword && debouncedPassword.length >= 6) {
      validatePassword.mutate({
        meetingId: currentMeetingId,
        password: debouncedPassword,
      })
    } else {
      setApiErrorMessagePassword(null)
    }
  }, [debouncedPassword, currentMeetingId])

  React.useEffect(() => {
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

  React.useEffect(() => {
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

  React.useEffect(() => {
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

  React.useEffect(() => {
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

const CrownIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <CrownSvg isLeader={isActive} />
)

function PasswordInput({
  onEnterClick,
  onBackClick,
  onHomeClick,
}: PasswordInputProps) {
  const { meetingData } = useMeetingStore()
  const {
    control,
    errors,
    isLeader,
    setIsLeader,
    apiErrorMessagePassword,
    apiErrorMessageLeaderAuthKey,
    validatePassword,
    validateLeaderAuthKey,
  } = usePasswordValidation(meetingData?.meetingId!)

  const isPasswordValid = validatePassword.isSuccess
  const isLeaderAuthKeyValid = validateLeaderAuthKey.isSuccess

  return (
    <div className="flex flex-col min-h-screen w-full p-4">
      <div className="flex items-start">
        <button type="button" onClick={onHomeClick} className="">
          <Image src={BackIcon} alt="back" />
        </button>
      </div>
      <div className="text-gray-900 font-bold text-[22px] mt-9">
        모임 앨범의 암호를 입력해주세요
      </div>
      <div className="text-gray-700 font-normal text-sm mt-2">
        재밌고 안전한 모임 앨범을 위해 입력이 필요해요.
      </div>

      <ToggleSwitch
        leftOption="멤버"
        rightOption="모임장"
        value={isLeader}
        onChange={setIsLeader}
        RightIcon={CrownIcon}
      />

      <div className="mt-6">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              label="모임 암호"
              placeholder="암호를 입력해주세요"
              success={isPasswordValid}
              error={apiErrorMessagePassword || errors.password?.message}
              checking={validatePassword.isPending}
            />
          )}
        />
        {isLeader && (
          <Controller
            name="leaderAuthKey"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                label="관리자 인증키"
                placeholder="관리자 인증키 4자리를 입력해주세요."
                success={isLeaderAuthKeyValid}
                error={
                  apiErrorMessageLeaderAuthKey || errors.leaderAuthKey?.message
                }
                checking={validateLeaderAuthKey.isPending}
              />
            )}
          />
        )}
      </div>

      <div className="flex mt-auto mb-5">
        <Button
          type="button"
          variant="light"
          className="mr-2 w-28"
          padding="px-6"
          onClick={onBackClick}
        >
          이전
        </Button>
        <Button
          onClick={onEnterClick}
          type="submit"
          fullWidth
          variant="primary"
          className="text-white"
          disabled={
            isLeader
              ? !(isPasswordValid && isLeaderAuthKeyValid)
              : !isPasswordValid
          }
        >
          완료
        </Button>
      </div>
    </div>
  )
}

export default PasswordInput
