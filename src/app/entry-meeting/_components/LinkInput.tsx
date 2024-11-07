import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { Button } from '@/components/Button'
import Callout from '@/components/Callout'
import { TextInput } from '@/components/Inputs/TextInput'
import useCheckMeetingLink from '@/hooks/useCheckMeetingLink'
import useDebounce from '@/hooks/useDebounce'
import useMeetingStore from '@/stores/useMeetingStore'
import BackIcon from 'public/icons/back.svg'

const LinkSchema = z.object({
  link: z.string().url('올바른 주소를 입력해주세요'),
})

interface LinkInputProps {
  onEnterClick: () => void
  onHomeClick?: () => void
}

type LinkFormData = z.infer<typeof LinkSchema>

function LinkInput({ onEnterClick, onHomeClick }: LinkInputProps) {
  const router = useRouter()
  const {
    control,
    watch,
    formState: { errors },
  } = useForm<LinkFormData>({
    defaultValues: {
      link: '',
    },
    mode: 'onChange',
  })
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null)
  const setMeetingData = useMeetingStore((state) => state.setMeetingData)
  const linkValue = watch('link')
  const debouncedLink = useDebounce(linkValue, 500)

  const { data, isLoading, isSuccess, isError, error } = useCheckMeetingLink(
    debouncedLink,
    {
      enabled: !!debouncedLink && debouncedLink.length > 0,
      queryKey: ['checkMeetingLink', debouncedLink],
    },
  )

  useEffect(() => {
    if (data) {
      setMeetingData(data.data)
    }
  }, [data, setMeetingData])

  useEffect(() => {
    if (isError) {
      if (error.error) {
        if (error.error.code === 'MEETING_LINK_NOT_FOUND') {
          setApiErrorMessage('이 링크에 해당되는 모임이 없어요:(')
        } else if (error?.error?.code === 'MEETING_EXPIRED') {
          setApiErrorMessage('이미 만료된 모임이에요.')
        }
      } else {
        setApiErrorMessage('오류가 발생했습니다. 다시 시도해주세요.')
      }
    } else {
      setApiErrorMessage(null)
    }
  }, [isError, error])

  const errorMessage = apiErrorMessage || errors.link?.message || null

  return (
    <div className="flex flex-col min-h-screen w-full p-4">
      <div className="flex items-start">
        <button type="button" onClick={onHomeClick} className="">
          <Image src={BackIcon} alt="back" />
        </button>
      </div>
      <div className="text-gray-900 font-bold text-[22px] mt-9">반가워요!</div>
      <div className="text-gray-900 font-bold text-[22px]">
        모임 앨범 링크를 입력해주세요.
      </div>
      <div className="text-gray-700 font-normal text-sm mt-2">
        프라이빗한 모임 앨범을 위해 입력이 필요해요.
      </div>

      <TextInput
        name="link"
        control={control}
        rules={{ required: '링크를 입력해주세요' }}
        placeholder="링크 입력"
        className="mt-10"
        success={isSuccess}
        error={errorMessage}
        checking={isLoading}
      />

      <Callout
        className="mt-4"
        title="모임 링크가 없으신가요?"
        content="안전한 모임 앨범을 위해 링크가 없으면 입장이 어려워요.\n링크가 없다면 나만의 모임 앨범을 새로 만들어보세요."
        buttonText="새로운 모임 앨범 만들기"
        onButtonClick={() => {
          router.push('/create-meeting')
        }}
      />

      <Button
        onClick={onEnterClick}
        variant="primary"
        className="mt-auto mb-5 text-white"
        disabled={!isSuccess}
      >
        완료
      </Button>
    </div>
  )
}

export default LinkInput
