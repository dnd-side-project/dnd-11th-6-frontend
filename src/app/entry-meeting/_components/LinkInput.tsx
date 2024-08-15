import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/Button'
import Callout from '@/components/Callout'
import { Input } from '@/components/Input'
import useMeetingStore from '@/stores/useMeetingStore'
import debounce from '@/utils/debounce'
import BackIcon from 'public/icons/back.svg'

interface LinkInputProps {
  onEnterClick: () => void
  onBackClick?: () => void
}

interface LinkFormData {
  link: string
}

function LinkInput({ onEnterClick, onBackClick }: LinkInputProps) {
  const router = useRouter()
  const { control, watch } = useForm<LinkFormData>({
    defaultValues: {
      link: '',
    },
    mode: 'onChange',
  })

  const [isChecking, setIsChecking] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const setMeetingData = useMeetingStore((state) => state.setMeetingData)

  const linkValue = watch('link')

  const fetchMeeting = useCallback(
    debounce(async (link: string) => {
      if (!link) return
      setIsChecking(true)
      setIsSuccess(false)
      setErrorMessage(null)

      try {
        const response = await fetch(`/api/v1/meetings?meetingLink=${link}`)
        if (response.ok) {
          const data = await response.json()
          setMeetingData(data.data)
          setIsSuccess(true)
          setErrorMessage(null)
        } else if (response.status === 404) {
          setErrorMessage('이 링크에 해당하는 모임이 없어요. :(')
        } else {
          setErrorMessage('오류가 발생했습니다. 다시 시도해주세요.')
        }
      } catch (error) {
        setErrorMessage('네트워크 오류가 발생했습니다.')
      } finally {
        setIsChecking(false)
      }
    }, 500),
    [setMeetingData],
  )

  useEffect(() => {
    if (linkValue && linkValue.trim() !== '') {
      fetchMeeting(linkValue)
    } else {
      setIsChecking(false)
      setIsSuccess(false)
      setErrorMessage(null)
    }
  }, [linkValue, fetchMeeting])

  useEffect(() => {
    console.log('checking:', isChecking)
    console.log('isSuccess:', isSuccess)
    console.log('errorMessage:', errorMessage)
    console.log('linkValue:', linkValue)
  }, [isChecking, isSuccess, errorMessage, linkValue])

  return (
    <div className="flex flex-col min-h-screen w-full p-4">
      <div className="flex items-start">
        <button type="button" onClick={onBackClick} className="">
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

      <Input
        name="link"
        control={control}
        rules={{ required: '링크를 입력해주세요' }}
        placeholder="링크 입력"
        className="mt-10"
        success={isSuccess}
        error={errorMessage}
        checking={isChecking}
      />

      <Callout
        className="mt-4"
        title="모임 링크가 없으신가요?"
        content="안전한 모임 앨범을 위해 링크가 없으면 입장이 어려워요.<br/> 링크가 없다면 나만의 모임 앨범을 새로 만들어보세요."
        buttonText="새로운 모임 앨범 만들기"
        onButtonClick={() => {
          router.push('/create-meeting')
        }}
      />

      <Button
        onClick={onEnterClick}
        variant="primary"
        className="mt-auto mb-5"
        disabled={!isSuccess}
      >
        완료
      </Button>
    </div>
  )
}

export default LinkInput
