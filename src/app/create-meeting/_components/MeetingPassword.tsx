import React from 'react'
import { Controller } from 'react-hook-form'
import Image from 'next/image'
import { Button } from '@/components/Button'
import useMeetStore from '@/stores/useMeetStore'
import useMeetingForm from '../_hooks/useMeetingForm'

function MeetingPassword() {
  const { passwordForm, onSubmit } = useMeetingForm()
  const { setStep } = useMeetStore()

  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
    watch,
  } = passwordForm

  const password = watch('password') || ''

  const handleNumberClick = (number: number) => {
    if (password.length < 4) {
      setValue('password', password + number, { shouldValidate: true })
    }
  }

  const handleDelete = () => {
    setValue('password', password.slice(0, -1), { shouldValidate: true })
  }

  const renderKeypadButton = (number: number | string) => (
    <button
      type="button"
      key={`keypad-${number}`}
      className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-semibold focus:outline-none "
      onClick={() => typeof number === 'number' && handleNumberClick(number)}
    >
      {number}
    </button>
  )

  return (
    <div className="flex flex-col h-full">
      <div className="mb-2">
        <h2 className="text-xl font-bold mb-2">비밀번호를 설정해주세요.</h2>
        <p className="text-sm text-gray-600">
          안전한 이용을 위해 비밀번호를 설정해주세요.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <div className="flex justify-between mb-10">
          <Controller
            name="password"
            control={control}
            render={() => (
              <>
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={`password-${index}`}
                    style={{ height: '3rem' }}
                    className={`w-12 border-2 rounded-lg flex items-center justify-center text-3xl bg-gray-100
                    }
                    `}
                  >
                    {password[index] ? password[index] : ''}
                  </div>
                ))}
              </>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-9">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => renderKeypadButton(num))}
          <div />
          {renderKeypadButton(0)}
          <button
            key="delete-button"
            type="button"
            className="w-20 h-20 rounded-full  flex items-center justify-center text-[28px] font-semibold focus:outline-none "
            onClick={handleDelete}
          >
            <Image
              src="../icons/delete.svg"
              width={24}
              height={24}
              alt="delete"
            />
          </button>
        </div>
        <div className="flex gap-2 mt-10">
          <Button
            className=" text-gray-700"
            onClick={() => setStep(3)}
            type="button"
            variant="light"
            fullWidth={false}
            width="50%"
          >
            이전
          </Button>
          <Button type="submit" disabled={!isValid} fullWidth variant="primary">
            다음
          </Button>
        </div>
      </form>
    </div>
  )
}

export default MeetingPassword
