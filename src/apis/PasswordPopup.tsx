'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { reenterMeeting } from '@/apis/apiUtils'
import { TextInput } from '@/components/Inputs/TextInput/index'
import useDebounce from '@/hooks/useDebounce'
import { usePasswordPopupStore } from '@/stores/usePasswordPopupStore'
import Popup from '../components/Popup/index'
import { useValidatePassword } from './queries/meetingQueries'

const passwordSchema = z.object({
  password: z
    .string()
    .min(1, '암호를 입력해주세요.')
    .min(4, '암호는 최소 4자 이상이어야 해요. :(')
    .max(20, '비밀번호는 최대 20자까지 입력 가능해요. :('),
})

type PasswordFormData = z.infer<typeof passwordSchema>

function PasswordPopup() {
  const { isOpen, meetingId, onConfirm, onClose, closePopup } =
    usePasswordPopupStore()
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isReentering, setIsReentering] = useState(false)
  const [lastCheckedPassword, setLastCheckedPassword] = useState('')

  const {
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
    },
    mode: 'onChange',
  })

  const passwordValue = watch('password')
  const debouncedPassword = useDebounce(passwordValue, 500)

  const validatePassword = useValidatePassword({
    onSuccess: () => {
      setIsPasswordValid(true)
      setLastCheckedPassword(debouncedPassword)
    },
    onError: () => {
      setIsPasswordValid(false)
      setLastCheckedPassword(debouncedPassword)
    },
  })

  useEffect(() => {
    if (
      debouncedPassword &&
      debouncedPassword.length >= 4 &&
      meetingId &&
      debouncedPassword !== lastCheckedPassword
    ) {
      validatePassword.mutate({ meetingId, password: debouncedPassword })
    } else if (debouncedPassword !== lastCheckedPassword) {
      setIsPasswordValid(false)
    }
  }, [debouncedPassword, meetingId, lastCheckedPassword, validatePassword])

  useEffect(() => {
    if (!isOpen) {
      reset()
      setIsPasswordValid(false)
      setLastCheckedPassword('')
    }
  }, [isOpen, reset])

  const handleConfirm = useCallback(async () => {
    if (isPasswordValid && meetingId) {
      setIsReentering(true)
      try {
        const success = await reenterMeeting(meetingId, passwordValue)
        if (success) {
          if (onConfirm) {
            onConfirm(passwordValue)
          }
          closePopup()
        } else {
          throw new Error('재입장 실패')
        }
      } catch (error) {
        console.error('Error during re-entry:', error)
        alert('모임 재입장에 실패했습니다. 다시 시도해주세요.')
      } finally {
        setIsReentering(false)
      }
    }
  }, [isPasswordValid, meetingId, passwordValue, onConfirm, closePopup])

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose()
    }
    closePopup()
  }, [onClose, closePopup])

  const errorMessage =
    errors.password?.message ||
    (validatePassword.isError && debouncedPassword === lastCheckedPassword
      ? '틀린 암호입니다.'
      : null)

  return (
    <Popup
      isOpen={isOpen}
      cancelText=""
      confirmText={isReentering ? '재입장 중...' : '입장하기'}
      onClose={handleClose}
      onConfirm={handleConfirm}
      title="다시 오셨네요!"
      hasCloseButton
      confirmDisabled={!isPasswordValid || isReentering}
    >
      <TextInput
        name="password"
        control={control}
        type="password"
        placeholder="암호를 입력해주세요"
        success={isPasswordValid && debouncedPassword === lastCheckedPassword}
        successMessage="비밀번호 입력 완료!"
        error={errorMessage}
        checking={validatePassword.isPending}
      />
    </Popup>
  )
}

export default PasswordPopup
