import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { createMission } from '@/apis/missionApi'
import { Button } from '@/components/Button'
import { TextInput } from '@/components/Inputs/TextInput'
import useMeetingStore from '@/stores/useMeetingStore'
import { ApiError } from '@/types/api'
import { CreateMissionResponse } from '@/types/mission'
import CloseSvg from 'public/icons/CloseSvg'

const missionSchema = z.object({
  content: z
    .string()
    .nonempty('미션 내용을 입력해주세요')
    .max(15, '15자 이내로 입력해주세요'),
})

type MissionFormData = z.infer<typeof missionSchema>

interface NewMissionProps {
  onClose: () => void
  onSuccess: () => void
}

function NewMission({ onClose, onSuccess }: NewMissionProps) {
  const meetingId = useMeetingStore((state) => state.meetingData?.meetingId)
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null)

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

  const missionValue = watch('content')

  const createMissionMutation = useMutation<
    CreateMissionResponse,
    ApiError,
    { content: string }
  >({
    mutationFn: (data) => {
      if (!meetingId) {
        throw new Error('Meeting ID is not available')
      }
      return createMission(meetingId, data)
    },
    onSuccess: () => {
      onSuccess()
      onClose()
    },
    onError: (error) => {
      if (error instanceof Error) {
        setApiErrorMessage(error.message)
      } else if (error.error?.message) {
        setApiErrorMessage(error.error.message)
      } else {
        setApiErrorMessage(
          '미션 생성 중 오류가 발생했습니다. 다시 시도해주세요.',
        )
      }
    },
  })

  const onSubmit = (data: MissionFormData) => {
    if (!meetingId) {
      setApiErrorMessage('유효하지 않은 모임입니다.')
      return
    }

    setApiErrorMessage(null)
    createMissionMutation.mutate(data)
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
        <button type="button" className="" onClick={onClose} aria-label="close">
          <CloseSvg size={24} />
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
        <TextInput
          name="content"
          control={control}
          rules={{ required: '미션 내용을 입력해주세요' }}
          placeholder="미션 내용을 입력해주세요"
          className="mt-10"
          error={errorMessage}
        />
        <div className="text-sm text-gray-500 flex justify-end">
          {missionValue.length} / 15
        </div>
        <div className="flex-grow" />

        <Button
          type="submit"
          variant="primary"
          className="mt-auto mb-5 w-full text-white"
          disabled={
            !missionValue || createMissionMutation.isPending || !meetingId
          }
        >
          {createMissionMutation.isPending ? '미션 생성 중...' : '완료'}
        </Button>
      </form>
    </div>
  )
}

export default NewMission
