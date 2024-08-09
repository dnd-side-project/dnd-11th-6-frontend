import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { z } from 'zod'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

const passwordSchema = z.object({
  password: z
    .string()
    .min(1, '암호를 입력해주세요.')
    .min(6, '암호는 최소 6자 이상이어야 합니다.'),
})

type PasswordFormData = z.infer<typeof passwordSchema>

interface PasswordInputProps {
  onPasswordSubmit: (password: string) => void
}

function PasswordInput({ onPasswordSubmit }: PasswordInputProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = (data: PasswordFormData) => {
    onPasswordSubmit(data.password)
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
          name="password"
          control={control}
          type="password"
          label="모임의 암호를 입력하세요."
          placeholder="암호를 입력하세요"
          error={errors.password?.message}
        />
        <Button type="submit" fullWidth variant="primary">
          입력하기
        </Button>
      </form>
    </div>
  )
}

export default PasswordInput
