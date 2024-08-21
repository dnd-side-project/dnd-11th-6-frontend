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
import useDebounce from '@/hooks/useDebounce'
import useMeetingStore from '@/stores/useMeetingStore'
import BackIcon from 'public/icons/back.svg'

const passwordSchema = z.object({
  password: z.string().min(6, '최소 6자 이상 입력해주세요.'),
  leaderAuthKey: z.string().length(4, '정확히 4자리를 입력해주세요.').optional(),
})

type PasswordFormData = z.infer<typeof passwordSchema>

interface PasswordInputProps {
  onEnterClick: () => void
  onBackClick: () => void
  onHomeClick: () => void
}

const usePasswordValidation = (currentMeetingId: number) => {
  const [isLeader, setIsLeader] = React.useState(false)
  const [apiErrorMessagePassword, setApiErrorMessagePassword] = React.useState<string | null>(null)
  const [apiErrorMessageLeaderAuthKey, setApiErrorMessageLeaderAuthKey] = React.useState<string | null>(null)

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
      validatePassword.mutate({ meetingId: currentMeetingId, password: debouncedPassword })
    } else {
      setApiErrorMessagePassword(null)
    }
  }, [debouncedPassword, currentMeetingId])

  React.useEffect(() => {
    if (isLeader && debouncedLeaderAuthKey && debouncedLeaderAuthKey.length === 4) {
      validateLeaderAuthKey.mutate({ meetingId: currentMeetingId, leaderAuthKey: debouncedLeaderAuthKey })
    } else {
      setApiErrorMessageLeaderAuthKey(null)
    }
  }, [isLeader, debouncedLeaderAuthKey, currentMeetingId])

  React.useEffect(() => {
    if (validatePassword.isError) {
      setApiErrorMessagePassword(
        validatePassword.error?.error?.code === 'MEETING_INVALIDATE_PASSWORD'
          ? '암호가 일치하지 않습니다.'
          : validatePassword.error?.error?.message || '오류가 발생했습니다. 다시 시도해주세요.'
      )
    } else if (validatePassword.isSuccess) {
      setApiErrorMessagePassword(null)
    }
  }, [validatePassword.isError, validatePassword.isSuccess, validatePassword.error])

  React.useEffect(() => {
    if (validateLeaderAuthKey.isError) {
      setApiErrorMessageLeaderAuthKey(
        validateLeaderAuthKey.error?.error?.code === 'MEETING_INVALIDATE_AUTH_KEY'
          ? '암호가 일치하지 않습니다.'
          : validateLeaderAuthKey.error?.error?.message || '오류가 발생했습니다. 다시 시도해주세요.'
      )
    } else if (validateLeaderAuthKey.isSuccess) {
      setApiErrorMessageLeaderAuthKey(null)
    }
  }, [validateLeaderAuthKey.isError, validateLeaderAuthKey.isSuccess, validateLeaderAuthKey.error])

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

const RoleToggle = ({ isLeader, setIsLeader }: { isLeader: boolean; setIsLeader: (value: boolean) => void }) => (
  <div className="flex justify-center mt-6 mb-4">
    <div className="relative bg-gray-200 rounded-full p-1 w-[260px]">
      <div
        className={`absolute top-[2px] ${
          isLeader ? 'left-[calc(50%+2px)]' : 'left-[2px]'
        } w-[calc(50%-4px)] h-[calc(100%-4px)] bg-black rounded-full transition-all duration-300 z-0`}
      />
      <button
        onClick={() => setIsLeader(false)}
        className={`relative z-10 w-1/2 py-2 rounded-full transition-all duration-300 ${
          !isLeader ? 'text-white' : 'text-gray-700'
        }`}
      >
        멤버
      </button>
      <button
        onClick={() => setIsLeader(true)}
        className={`relative z-10 w-1/2 py-2 rounded-full transition-all duration-300 ${
          isLeader ? 'text-white' : 'text-gray-700'
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1 inline-block"
        >
          <path
            d="M12.75 16.5H5.25C4.9425 16.5 4.6875 16.245 4.6875 15.9375C4.6875 15.63 4.9425 15.375 5.25 15.375H12.75C13.0575 15.375 13.3125 15.63 13.3125 15.9375C13.3125 16.245 13.0575 16.5 12.75 16.5Z"
            fill={isLeader ? 'white' : '#AAAFB3'}
          />
          <path
            d="M15.2622 4.14027L12.2622 6.28527C11.8647 6.57027 11.2947 6.39777 11.1222 5.94027L9.70468 2.16027C9.46468 1.50777 8.54218 1.50777 8.30218 2.16027L6.87718 5.93277C6.70468 6.39777 6.14218 6.57027 5.74468 6.27777L2.74468 4.13277C2.14468 3.71277 1.34968 4.30527 1.59718 5.00277L4.71718 13.7403C4.82218 14.0403 5.10718 14.2353 5.42218 14.2353H12.5697C12.8847 14.2353 13.1697 14.0328 13.2747 13.7403L16.3947 5.00277C16.6497 4.30527 15.8547 3.71277 15.2622 4.14027ZM10.8747 11.0628H7.12468C6.81718 11.0628 6.56218 10.8078 6.56218 10.5003C6.56218 10.1928 6.81718 9.93777 7.12468 9.93777H10.8747C11.1822 9.93777 11.4372 10.1928 11.4372 10.5003C11.4372 10.8078 11.1822 11.0628 10.8747 11.0628Z"
            fill={isLeader ? 'white' : '#AAAFB3'}
          />
        </svg>
        모임장
      </button>
    </div>
  </div>
)

function PasswordInput({ onEnterClick, onBackClick, onHomeClick }: PasswordInputProps) {
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
      
      <RoleToggle isLeader={isLeader} setIsLeader={setIsLeader} />
      
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
                error={apiErrorMessageLeaderAuthKey || errors.leaderAuthKey?.message}
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
          disabled={isLeader ? !(isPasswordValid && isLeaderAuthKeyValid) : !isPasswordValid}
        >
          완료
        </Button>
      </div>
    </div>
  )
}

export default PasswordInput
