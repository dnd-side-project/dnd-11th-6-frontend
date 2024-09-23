import React from 'react'
import { Controller } from 'react-hook-form'
import Image from 'next/image'
import useMeetingForm from '../_hooks/useMeetingForm'
import MeetingLayout from './MeetingLayout'

function MeetingPassword() {
  const { passwordForm, onSubmit } = useMeetingForm()

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
      className="w-20 h-[80px] rounded-full flex items-center justify-center text-2xl font-semibold focus:outline-none"
      onClick={() => typeof number === 'number' && handleNumberClick(number)}
    >
      {number}
    </button>
  )

  return (
    <MeetingLayout
      title="비밀번호를 설정해주세요."
      description="안전한 이용을 위해 비밀번호를 설정해주세요."
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
    >
      <div className="flex justify-between px-1 mb-10">
        <Controller
          name="password"
          control={control}
          render={() => (
            <>
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={`password-${index}`}
                  style={{ height: '3rem' }}
                  className="w-12 border-2 rounded-lg flex items-center justify-center text-3xl bg-gray-100"
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
          className="w-20 h-[80px] rounded-full flex items-center justify-center text-[28px] font-semibold focus:outline-none"
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
    </MeetingLayout>
  )
}

export default MeetingPassword
