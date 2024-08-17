import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { z } from 'zod'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import useDebounce from '@/hooks/useDeboune'
import BackIcon from 'public/icons/back.svg'

const nicknameSchema = z.object({
  nickname: z
    .string()
    .min(2, '최소 2자부터 입력 가능해요. :(')
    .max(8, '최대 8자까지 입력 가능해요. :(')
    .regex(/^[a-zA-Z0-9가-힣]+$/, '특수문자 및 공백은 사용할 수 없어요. :('),

  isAdmin: z.boolean(),
})

type NicknameFormData = z.infer<typeof nicknameSchema>

interface NicknameInputProps {
  onEnterClick: () => void
  onBackClick?: () => void
}

function NicknameInput({ onEnterClick, onBackClick }: NicknameInputProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<NicknameFormData>({
    resolver: zodResolver(nicknameSchema),
    defaultValues: {
      nickname: '',
      isAdmin: false,
    },
    mode: 'onChange',
  })

  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null)

  const nicknameValue = watch('nickname')
  const debouncedNickname = useDebounce(nicknameValue, 500)

  const { isLoading, isSuccess, isError, error } = useQuery<
    {
      data: any
      status: number
      error: { code: string; message: string }
    },
    { data: any; status: number; error: { code: string; message: string } }
  >({
    queryKey: ['nickname', debouncedNickname],
    queryFn: async () => {
      if (!debouncedNickname) return null
      const response = await fetch(
        `/api/v1/meetings?nickname=${debouncedNickname}`,
      )
      const result = await response.json()
      if (!response.ok) throw result
      return result
    },
    enabled:
      !!debouncedNickname &&
      nicknameSchema.shape.nickname.safeParse(debouncedNickname).success,
    retry: false,
  })

  useEffect(() => {
    if (isError) {
      if (error.error.code === 'VALIDATION_ERROR') {
        setApiErrorMessage('이미 사용중인 닉네임이에요. :(')
      } else {
        setApiErrorMessage('오류가 발생했습니다. 다시 시도해주세요.')
      }
    } else {
      setApiErrorMessage(null)
    }
  }, [isError, error])

  const errorMessage = apiErrorMessage || errors.nickname?.message || null

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    onEnterClick()
  })

  return (
    <form onSubmit={onSubmit} className="flex flex-col min-h-screen w-full p-4">
      <div className="flex items-start">
        <button type="button" onClick={onBackClick} className="">
          <Image src={BackIcon} alt="back" />
        </button>
      </div>
      <div className="text-gray-900 font-bold text-[22px] mt-9">
        [모임 이름] 앨범에서
      </div>
      <div className="text-gray-900 font-bold text-[22px]">
        어떤 닉네임으로 불리고 싶나요?
      </div>
      <div className="text-gray-700 font-normal text-sm mt-2">
        특수문자, 공백은 사용할 수 없어요.
      </div>

      <Input
        name="nickname"
        control={control}
        rules={{ required: '닉네임을 입력해주세요' }}
        placeholder="나의 닉네임 입력"
        wrapperClassName="mt-10"
        success={isSuccess}
        error={errorMessage}
        checking={isLoading}
        description="(최대8자)"
      />

      <Button
        type="submit"
        variant="primary"
        className="mt-auto mb-5"
        disabled={!isSuccess || !!errorMessage || nicknameValue === ''}
      >
        완료
      </Button>
    </form>
  )
}

export default NicknameInput
