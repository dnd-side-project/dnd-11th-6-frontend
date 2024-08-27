import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { z } from 'zod'
import { useCheckNickname, useJoinMeeting } from '@/apis/queries/meetingQueries'
import { Button } from '@/components/Button'
import { Input } from '@/components/Inputs'
import useDebounce from '@/hooks/useDebounce'
import useMeetingStore from '@/stores/useMeetingStore'
import useUserStore from '@/stores/useUserStore'
import BackIcon from 'public/icons/back.svg'

const nicknameSchema = z.object({
  nickname: z
    .string()
    .min(2, '최소 2자부터 입력 가능해요. :(')
    .max(8, '최대 8자까지 입력 가능해요. :(')
    .regex(/^[a-zA-Z0-9가-힣]+$/, '특수문자 및 공백은 사용할 수 없어요. :('),

  role: z.enum(['LEADER', 'PARTICIPANT']),
})

type NicknameFormData = z.infer<typeof nicknameSchema>

interface NicknameInputProps {
  onEnterClick: () => void
  onBackClick?: () => void
  onHomeClick?: () => void
}

function NicknameInput({
  onEnterClick,
  onBackClick,
  onHomeClick,
}: NicknameInputProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<NicknameFormData>({
    resolver: zodResolver(nicknameSchema),
    defaultValues: {
      nickname: '',
      role: 'PARTICIPANT',
    },
    mode: 'onChange',
  })

  const setNickname = useUserStore((state) => state.setNickname)
  const setParticipantId = useUserStore((state) => state.setParticipantId)
  const userRole = useUserStore((state) => state.role)
  const meetingName = useMeetingStore((state) => state.meetingData?.name)
  const meetingId = useMeetingStore((state) => state.meetingData?.meetingId)
  const [apiErrorMessage, setApiErrorMessage] = useState<string | undefined>(
    undefined,
  )
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined,
  )
  const nicknameValue = watch('nickname')
  const debouncedNickname = useDebounce(nicknameValue, 500)

  const isNicknameValid =
    nicknameSchema.shape.nickname.safeParse(nicknameValue).success

  const {
    data: nicknameCheckData,
    isLoading,
    isSuccess,
    isError,
    error: nicknameCheckError,
  } = useCheckNickname(meetingId!, debouncedNickname, {
    queryKey: ['checkNickname', meetingId, debouncedNickname],
    enabled: isNicknameValid && debouncedNickname.length > 0,
  })
  const joinMeetingMutation = useJoinMeeting()

  useEffect(() => {
    if (!isNicknameValid) {
      setApiErrorMessage(undefined)
      setSuccessMessage(undefined)
      return
    }

    if (isError) {
      console.error(nicknameCheckError)
      setApiErrorMessage('오류가 발생했습니다. 다시 시도해주세요.')
      setSuccessMessage(undefined)
    } else if (isSuccess) {
      if (!nicknameCheckData.data.isAvailableNickname) {
        setApiErrorMessage('이미 사용중인 닉네임이에요. :(')
        setSuccessMessage(undefined)
      } else {
        setApiErrorMessage(undefined)
        setSuccessMessage('사용가능한 닉네임이에요!')
      }
    } else {
      setApiErrorMessage(undefined)
      setSuccessMessage(undefined)
    }
  }, [
    isError,
    isSuccess,
    nicknameCheckData,
    nicknameCheckError,
    isNicknameValid,
  ])

  const errorMessage = errors.nickname?.message || apiErrorMessage || undefined

  const onSubmit = handleSubmit((formData) => {
    joinMeetingMutation.mutate(
      {
        meetingId: meetingId!,
        nickname: formData.nickname,
        role: userRole,
      },
      {
        onSuccess: (joinMeetingData) => {
          setNickname(formData.nickname)
          setParticipantId(joinMeetingData.data.participantId)
          onEnterClick()
        },
        onError: (joinMeetingError) => {
          console.error('Error joining meeting:', joinMeetingError)
          setApiErrorMessage(
            '모임 참가 중 오류가 발생했습니다. 다시 시도해주세요.',
          )
          setSuccessMessage(undefined)
        },
      },
    )
  })

  return (
    <form onSubmit={onSubmit} className="flex flex-col min-h-screen w-full p-4">
      <div className="flex items-start">
        <button type="button" onClick={onHomeClick} className="">
          <Image src={BackIcon} alt="back" />
        </button>
      </div>
      <div className="text-gray-900 font-bold text-[22px] mt-9">
        {meetingName} 앨범에서
      </div>
      <div className="text-gray-900 font-bold text-[22px]">
        어떤 닉네임으로 불리고 싶나요?
      </div>
      <div className="text-gray-700 font-normal text-sm mt-2">
        특수문자, 공백은 사용할 수 없어요.
      </div>
      <div className="mb-10" />
      <Input
        name="nickname"
        control={control}
        rules={{ required: '닉네임을 입력해주세요' }}
        placeholder="나의 닉네임 입력"
        success={isSuccess && !errorMessage && isNicknameValid}
        error={errorMessage}
        checking={isLoading}
        description="(최대8자)"
        successMessage={successMessage}
      />

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
          type="submit"
          fullWidth
          variant="primary"
          className=" text-white"
          disabled={
            !isSuccess ||
            !!errorMessage ||
            nicknameValue === '' ||
            !isNicknameValid
          }
        >
          완료
        </Button>
      </div>
    </form>
  )
}

export default NicknameInput
