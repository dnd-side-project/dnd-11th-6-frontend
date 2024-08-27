import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { z } from 'zod'
import { Button } from '@/components/Button'
import { Input } from '@/components/Inputs'
import useMeetingStore from '@/stores/useMeetingStore'
import Close from 'public/icons/close.svg'

const missionSchema = z.object({
  content: z
    .string()
    .nonempty('미션 내용을 입력해주세요')
    .max(20, '20자 이내로 입력해주세요'),
})

type MissionFormData = z.infer<typeof missionSchema>

interface NewMissionProps {
  onClose: () => void
  onSuccess: () => void
}

function NewMission({ onClose, onSuccess }: NewMissionProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof missionSchema>>({
    defaultValues: {
      content: '',
    },
    mode: 'onChange',
  })

  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null)
  const missionValue = watch('content')
  const meetingId = useMeetingStore(
    (state) => state.meetingData?.meetingId ?? 0,
  )

  const createMission = useMutation<
    { status: number; data: any },
    { status: number; error: { code: string; message: string } },
    MissionFormData
  >({
    mutationFn: async (data: MissionFormData) => {
      const response = await fetch(`/api/v1/meetings/${meetingId}/missions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok) throw result
      return result
    },
    onSuccess: () => {
      onSuccess()
      onClose()
    },
    onError: (error) => {
      if (error.error?.message) {
        setApiErrorMessage(error.error.message)
      } else {
        setApiErrorMessage(
          '미션 생성 중 오류가 발생했습니다. 다시 시도해주세요.',
        )
      }
    },
  })

  const onSubmit = (data: MissionFormData) => {
    setApiErrorMessage(null)
    createMission.mutate(data)
  }

  useEffect(() => {
    if (errors.content?.message) {
      setApiErrorMessage(errors.content.message)
    } else {
      setApiErrorMessage(null)
    }
  }, [errors.content])

  const errorMessage = apiErrorMessage || errors.content?.message

  return (
    <div className="flex flex-col min-h-screen w-full p-4">
      <div className="flex justify-end">
        <button type="button" className="" onClick={onClose}>
          <Image src={Close} alt="close" />
        </button>
      </div>
      <div className="text-gray-900 font-bold text-[22px] mt-9">
        새로운 미션을 등록해주세요
      </div>
      <div className="text-gray-700 font-normal text-sm mt-2">
        우리 모임의 특색이 담긴 모임 미션을 생성해보아요
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-grow"
      >
        <Input
          name="content"
          control={control}
          rules={{ required: '링크를 입력해주세요' }}
          placeholder="링크 입력"
          className="mt-10"
          error={errorMessage}
        />
        <div className="text-sm text-gray-500 flex justify-end">
          {missionValue.length} / 20
        </div>
        <div className="flex-grow" />

        <Button
          type="submit"
          variant="primary"
          className="mt-auto mb-5 w-full text-white"
          disabled={!missionValue || createMission.isPending}
        >
          완료
        </Button>
      </form>
    </div>
  )
}

export default NewMission
