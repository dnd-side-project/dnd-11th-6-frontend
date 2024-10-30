import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { z } from 'zod'
import {
  useValidateLeaderAuthKey,
  useValidatePassword,
} from '@/apis/meetingApi'
import { Button } from '@/components/Button'
import { TextInput } from '@/components/Inputs/TextInput'
import { ToggleSwitch } from '@/components/ToogleSwitch'
import useDebounce from '@/hooks/useDebounce'
import useMeetingStore from '@/stores/useMeetingStore'
import useUserStore from '@/stores/useUserStore'
import CrownSvg from 'public/icons/CrownSvg'
import BackIcon from 'public/icons/back.svg'

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

interface CrownIconProps {
  isActive: boolean
}

const CrownIcon = ({ isActive }: CrownIconProps) => (
  <CrownSvg isLeader={isActive} />
)

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

  const handleEnterClick = () => {
    if (isLeader && isPasswordValid && isLeaderAuthKeyValid) {
      setUserRole('LEADER')
    } else if (!isLeader && isPasswordValid) {
      setUserRole('PARTICIPANT')
    }
    onEnterClick()
  }

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

      <ToggleSwitch
        leftOption="멤버"
        rightOption="모임장"
        value={isLeader}
        onChange={setIsLeader}
        width="260px"
        activeColor="bg-black"
        inactiveColor="bg-gray-200"
        activeTextColor="text-white"
        inactiveTextColor="text-gray-700"
        RightIcon={CrownIcon}
      />

      <div className="mt-6">
        <TextInput
          name="password"
          control={control}
          label="모임 암호"
          type="password"
          placeholder="암호를 입력해주세요"
          success={isPasswordValid}
          successMessage="비밀번호 입력 완료!"
          error={errorMessagePassword}
          checking={validatePassword.isPending}
        />
        {isLeader && (
          <TextInput
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
