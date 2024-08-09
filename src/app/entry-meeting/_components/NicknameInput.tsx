import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { z } from 'zod'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

const nicknameSchema = z.object({
  nickname: z.string().min(2, '닉네임은 최소 2글자 이상이어야 합니다.'),
  isAdmin: z.boolean(),
  adminKey: z
    .string()
    .optional()
    .refine((val) => {
      if (val === undefined) return true
      return val.length > 0
    }, '관리자 인증키를 입력해주세요.'),
})

type NicknameFormData = z.infer<typeof nicknameSchema>

interface NicknameInputProps {
  onNicknameSubmit: (data: NicknameFormData) => void
}

function NicknameInput({ onNicknameSubmit }: NicknameInputProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NicknameFormData>({
    resolver: zodResolver(nicknameSchema),
    defaultValues: {
      nickname: '',
      isAdmin: false,
      adminKey: '',
    },
  })

  const isAdmin = watch('isAdmin')

  const onSubmit = (data: NicknameFormData) => {
    onNicknameSubmit(data)
  }

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mb-12">
          <Image src="/favicon.ico" alt="Logo" width={40} height={40} />
        </div>
      </div>

      <div className="flex justify-center mb-16">모임 이름</div>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <Input
          name="nickname"
          control={control}
          label="사용할 닉네임을 입력해주세요."
          placeholder="닉네임을 입력하세요"
          error={errors.nickname?.message}
        />

        <div className="flex justify-end mt-4 mb-4">
          <Input
            name="isAdmin"
            control={control}
            type="checkbox"
            as="checkbox"
            label="관리자 인증을 하시겠어요?"
            className="flex-row-reverse"
          />
        </div>

        {isAdmin && (
          <Input
            name="adminKey"
            control={control}
            label="관리자 인증키를 입력해주세요."
            type="password"
            placeholder="관리자 인증키를 입력하세요"
            error={errors.adminKey?.message}
          />
        )}

        <Button type="submit" fullWidth variant="primary">
          완료
        </Button>
      </form>
    </div>
  )
}

export default NicknameInput
