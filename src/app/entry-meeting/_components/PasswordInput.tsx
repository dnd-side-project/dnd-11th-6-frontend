import React from 'react'
import { Controller } from 'react-hook-form'
import Image from 'next/image'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import ToggleSwitch from '@/components/ToogleSwitch'
import useMeetingStore from '@/stores/useMeetingStore'
import CrownSvg from 'public/icons/CrownSvg'
import BackIcon from 'public/icons/back.svg'
import usePasswordValidation from '../_hooks/usePasswordValidation'

interface PasswordInputProps {
  onEnterClick: () => void
  onBackClick: () => void
  onHomeClick: () => void
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
