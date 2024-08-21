import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { z } from 'zod'
import {
  useValidateLeaderAuthKey,
  useValidatePassword,
} from '@/apis/queries/meetingQueries'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import useDebounce from '@/hooks/useDebounce'
import useMeetingStore from '@/stores/useMeetingStore'
import BackIcon from 'public/icons/back.svg'
import useUserStore from '@/stores/useUserStore'

const passwordSchema = z.object({
  password: z
    .string()
    .min(1, '암호를 입력해주세요.')
    .min(4, '암호는 최소 4자 이상이어야 해요. :(')
    .max(20, '비밀번호는 최대 20자까지 입력 가능해요. :('),
  leaderAuthKey: z
    .string()
    .min(4, '관리자 인증키는 4자리여야 합니다.')
    .optional(),
})

type PasswordFormData = z.infer<typeof passwordSchema>

interface PasswordInputProps {
  onEnterClick: () => void
  onBackClick: () => void
  onHomeClick?: () => void
}

function PasswordInput({
  onEnterClick,
  onBackClick,
  onHomeClick,
}: PasswordInputProps) {
  const [isLeader, setIsLeader] = useState(false)
  const currentMeetingId = useMeetingStore(
    (state) => state.meetingData?.meetingId,
  )
  const setUserRole = useUserStore((state) => state.setRole)

  const handleEnterClick = () => {
    if (isLeader && isPasswordValid && isLeaderAuthKeyValid) {
      setUserRole('LEADER')
    } else if (!isLeader && isPasswordValid) {
      setUserRole('PARTICIPANT')
    }
    onEnterClick()
  }

  const {
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      leaderAuthKey: '',
    },
    mode: 'onChange',
  })

  const [apiErrorMessagePassword, setApiErrorMessagePassword] = useState<
    string | null
  >(null)
  const [apiErrorMessageLeaderAuthKey, setApiErrorMessageLeaderAuthKey] =
    useState<string | null>(null)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isLeaderAuthKeyValid, setIsLeaderAuthKeyValid] = useState(false)

  const passwordValue = watch('password')
  const leaderAuthKeyValue = watch('leaderAuthKey')

  const debouncedPassword = useDebounce(passwordValue, 500)
  const debouncedLeaderAuthKey = useDebounce(leaderAuthKeyValue, 500)

  const validatePassword = useValidatePassword()
  const validateLeaderAuthKey = useValidateLeaderAuthKey()

  useEffect(() => {
    if (debouncedPassword && debouncedPassword.length >= 4) {
      validatePassword.mutate({
        meetingId: currentMeetingId!,
        password: debouncedPassword,
      })
    } else {
      setApiErrorMessagePassword(null)
      setIsPasswordValid(false)
    }
  }, [debouncedPassword])

  useEffect(() => {
    if (
      isLeader &&
      debouncedLeaderAuthKey &&
      debouncedLeaderAuthKey.length === 4
    ) {
      validateLeaderAuthKey.mutate({
        meetingId: currentMeetingId!,
        leaderAuthKey: debouncedLeaderAuthKey,
      })
    } else {
      setApiErrorMessageLeaderAuthKey(null)
      setIsLeaderAuthKeyValid(false)
    }
  }, [isLeader, debouncedLeaderAuthKey])

  useEffect(() => {
    if (validatePassword.isError) {
      if (validatePassword.error) {
        if (
          validatePassword.error.error.code === 'MEETING_INVALIDATE_PASSWORD'
        ) {
          setApiErrorMessagePassword('암호가 일치하지 않습니다.')
        } else {
          setApiErrorMessagePassword(validatePassword.error.error.message)
        }
      } else {
        setApiErrorMessagePassword('오류가 발생했습니다. 다시 시도해주세요.')
      }
      setIsPasswordValid(false)
    } else if (validatePassword.isSuccess) {
      setApiErrorMessagePassword(null)
      setIsPasswordValid(true)
    }
  }, [
    validatePassword.isError,
    validatePassword.isSuccess,
    validatePassword.error,
  ])

  useEffect(() => {
    if (validateLeaderAuthKey.isError) {
      if (validateLeaderAuthKey.error) {
        if (
          validateLeaderAuthKey.error.error.code ===
          'MEETING_INVALIDATE_AUTH_KEY'
        ) {
          setApiErrorMessageLeaderAuthKey('암호가 일치하지 않습니다.')
        } else {
          setApiErrorMessageLeaderAuthKey(
            validateLeaderAuthKey.error.error.message,
          )
        }
      } else {
        setApiErrorMessageLeaderAuthKey(
          '오류가 발생했습니다. 다시 시도해주세요.',
        )
      }
      setIsLeaderAuthKeyValid(false)
    } else if (validateLeaderAuthKey.isSuccess) {
      setApiErrorMessageLeaderAuthKey(null)
      setIsLeaderAuthKeyValid(true)
    }
  }, [
    validateLeaderAuthKey.isError,
    validateLeaderAuthKey.isSuccess,
    validateLeaderAuthKey.error,
  ])

  const errorMessagePassword =
    apiErrorMessagePassword || errors.password?.message || null
  const errorMessageLeaderAuthKey =
    apiErrorMessageLeaderAuthKey || errors.leaderAuthKey?.message || null

  useEffect(() => {
    reset({ password: '', leaderAuthKey: '' })
    validatePassword.reset()
    validateLeaderAuthKey.reset()
    setIsPasswordValid(false)
    setIsLeaderAuthKeyValid(false)
  }, [isLeader, reset])

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

      <div className="mt-6">
        <Input
          name="password"
          control={control}
          type="password"
          label="모임 암호"
          placeholder="암호를 입력해주세요"
          success={isPasswordValid}
          successMessage="비밀번호 입력 완료!"
          error={errorMessagePassword}
          checking={validatePassword.isPending}
        />
        {isLeader && (
          <Input
            name="leaderAuthKey"
            control={control}
            type="password"
            label="관리자 인증키"
            placeholder="관리자 인증키 4자리를 입력해주세요."
            success={isLeaderAuthKeyValid}
            successMessage="인증키 입력 완료!"
            error={errorMessageLeaderAuthKey}
            checking={validateLeaderAuthKey.isPending}
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
          onClick={handleEnterClick}
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
