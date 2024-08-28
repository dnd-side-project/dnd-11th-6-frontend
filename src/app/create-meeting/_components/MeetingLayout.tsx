import React, { ReactNode } from 'react'
import { Button } from '@/components/Button'
import useMeetStore from '@/stores/useMeetStore'

interface MeetingLayoutProps {
  title: string
  description: string
  children: ReactNode
  onSubmit: () => void
  isValid: boolean
  showBackButton?: boolean
}

const MeetingLayout = ({
  title,
  description,
  children,
  onSubmit,
  isValid,
  showBackButton = true,
}: MeetingLayoutProps) => {
  const { setStep } = useMeetStore()

  return (
    <div className="flex flex-col h-full">
      <div className="mb-[42px]">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <form onSubmit={onSubmit} className="flex-grow flex flex-col">
        <div className="flex-grow">{children}</div>
        <div className="flex gap-2 mt-auto">
          {showBackButton && (
            <Button
              className="text-gray-700"
              onClick={() => setStep((prev) => prev - 1)}
              type="button"
              variant="light"
              fullWidth={false}
            >
              이전
            </Button>
          )}
          <Button
            type="submit"
            disabled={!isValid}
            fullWidth
            variant="primary"
            className="text-white"
          >
            다음
          </Button>
        </div>
      </form>
    </div>
  )
}

export default MeetingLayout
