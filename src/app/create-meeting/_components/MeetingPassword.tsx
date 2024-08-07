import React from 'react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import useMeetingForm from '../_hooks/useMeetingForm'

function MeetingPassword() {
  const { passwordForm, onSubmit } = useMeetingForm()
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = passwordForm

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="password"
        control={control}
        label="비밀번호를 설정해주세요."
        type="password"
        placeholder="******"
        error={errors.password?.message}
      />
      <Button
        type="submit"
        className={`w-full p-3 rounded-md ${
          isValid
            ? 'bg-black text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        disabled={!isValid}
      >
        등록하기
      </Button>
    </form>
  )
}

export default MeetingPassword
