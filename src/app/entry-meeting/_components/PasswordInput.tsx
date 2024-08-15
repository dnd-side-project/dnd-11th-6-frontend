import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { z } from 'zod'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import debounce from '@/utils/debounce'
import BackIcon from 'public/icons/back.svg'

const passwordSchema = z.object({
  password: z
    .string()
    .min(1, '암호를 입력해주세요.')
    .min(6, '암호는 최소 6자 이상이어야 합니다.'),
  leaderAuthKey: z
    .string()
    .min(4, '관리자 인증키는 4자리여야 합니다.')
    .optional(),
})

type PasswordFormData = z.infer<typeof passwordSchema>

interface PasswordInputProps {
  onEnterClick: () => void
  onBackClick: () => void
}

function PasswordInput({ onEnterClick, onBackClick }: PasswordInputProps) {
  const [isLeader, setIsLeader] = useState(false)

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

  const [isCheckingPassword, setIsCheckingPassword] = useState(false)
  const [isSuccessPassword, setIsSuccessPassword] = useState(false)
  const [errorMessagePassword, setErrorMessagePassword] = useState<
    string | null
  >(null)

  const [isCheckingLeaderAuthKey, setIsCheckingLeaderAuthKey] = useState(false)
  const [isSuccessLeaderAuthKey, setIsSuccessLeaderAuthKey] = useState(false)
  const [errorMessageLeaderAuthKey, setErrorMessageLeaderAuthKey] = useState<
    string | null
  >(null)

  const passwordValue = watch('password')
  const leaderAuthKeyValue = watch('leaderAuthKey')

  useEffect(() => {
    reset({
      password: '',
      leaderAuthKey: '',
    })

    setIsCheckingPassword(false)
    setIsSuccessPassword(false)
    setErrorMessagePassword(null)
    setIsCheckingLeaderAuthKey(false)
    setIsSuccessLeaderAuthKey(false)
    setErrorMessageLeaderAuthKey(null)
  }, [isLeader, reset])

  const fetchPasswordValidation = useCallback(
    debounce(async (password: string) => {
      if (!password || password.length < 6) return
      setIsCheckingPassword(true)
      setIsSuccessPassword(false)
      setErrorMessagePassword(null)

      try {
        const endpoint = isLeader
          ? `/api/v1/meetings/validate-password/leader`
          : `/api/v1/meetings/validate-password`

        const bodyData = password

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
        })

        const data = await response.json()

        if (response.ok) {
          setIsSuccessPassword(true)
          setErrorMessagePassword(null)
        } else {
          setErrorMessagePassword(data.error.message)
        }
      } catch (error) {
        setErrorMessagePassword('네트워크 오류가 발생했습니다.')
      } finally {
        setIsCheckingPassword(false)
      }
    }, 500),
    [isLeader],
  )

  const fetchLeaderAuthKeyValidation = useCallback(
    debounce(async (leaderAuthKey: string) => {
      if (!leaderAuthKey || leaderAuthKey.length !== 4) return
      setIsCheckingLeaderAuthKey(true)
      setIsSuccessLeaderAuthKey(false)
      setErrorMessageLeaderAuthKey(null)

      try {
        const response = await fetch(
          `/api/v1/meetings/validate-password/leader`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(leaderAuthKey),
          },
        )

        const data = await response.json()

        if (response.ok) {
          setIsSuccessLeaderAuthKey(true)
          setErrorMessageLeaderAuthKey(null)
        } else {
          setErrorMessageLeaderAuthKey(data.error.message)
        }
      } catch (error) {
        setErrorMessageLeaderAuthKey('네트워크 오류가 발생했습니다.')
      } finally {
        setIsCheckingLeaderAuthKey(false)
      }
    }, 500),
    [],
  )

  useEffect(() => {
    fetchPasswordValidation(passwordValue)
  }, [passwordValue, fetchPasswordValidation])

  useEffect(() => {
    if (leaderAuthKeyValue !== undefined) {
      fetchLeaderAuthKeyValidation(leaderAuthKeyValue)
    }
  }, [leaderAuthKeyValue, fetchLeaderAuthKeyValidation])

  // ======== DEBUGGING CODE START ========
  console.log('isCheckingPassword:', isCheckingPassword)
  console.log('isSuccessPassword:', isSuccessPassword)
  console.log('errorMessagePassword:', errorMessagePassword)

  console.log('passwordValue:', passwordValue)
  console.log('leaderAuthKeyValue:', leaderAuthKeyValue)

  console.log('isCheckingLeaderAuthKey:', isCheckingLeaderAuthKey)
  console.log('isSuccessLeaderAuthKey:', isSuccessLeaderAuthKey)
  console.log('errorMessageLeaderAuthKey:', errorMessageLeaderAuthKey)

  console.log('passwordValue:', passwordValue)
  console.log('leaderAuthKeyValue:', leaderAuthKeyValue)
  // ======== DEBUGGING CODE END ========

  return (
    <div className="flex flex-col min-h-screen w-full p-4">
      <div className="flex items-start">
        <button type="button" onClick={onBackClick} className="">
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
          success={isSuccessPassword}
          error={errors.password?.message || errorMessagePassword}
          checking={isCheckingPassword}
        />
        {isLeader && (
          <Input
            name="leaderAuthKey"
            control={control}
            type="password"
            label="관리자 인증키"
            placeholder="관리자 인증키 4자리를 입력해주세요."
            success={isSuccessLeaderAuthKey}
            error={errors.leaderAuthKey?.message || errorMessageLeaderAuthKey}
            checking={isCheckingLeaderAuthKey}
          />
        )}
      </div>
      <Button
        onClick={onEnterClick}
        type="submit"
        fullWidth
        variant="primary"
        className="mt-auto mb-5"
        disabled={
          isLeader
            ? !(isSuccessPassword && isSuccessLeaderAuthKey)
            : !isSuccessPassword
        }
      >
        완료
      </Button>
    </div>
  )
}

export default PasswordInput
