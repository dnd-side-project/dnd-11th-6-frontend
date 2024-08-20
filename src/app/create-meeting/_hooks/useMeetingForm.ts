import { useCallback, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import useZodForm from '@/hooks/useZodForm'
import {
  MeetingDateFormModel,
  MeetingDateSchema,
  MeetingFormModel,
  MeetingSchema,
  PasswordFormModel,
  PasswordSchema,
  ThemeFormModel,
  ThemeSchema,
} from '@/lib/meetingSchema'
import useMeetStore from '@/stores/useMeetStore'

function useMeetingForm() {
  const { step, setStep, formData, setFormData } = useMeetStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const meetingForm = useZodForm<MeetingFormModel>(MeetingSchema, {
    mode: 'onChange',
    defaultValues: formData.meeting,
  })

  const meetingDateForm = useZodForm<MeetingDateFormModel>(MeetingDateSchema, {
    mode: 'onChange',
    defaultValues: formData.meetingDate,
  })

  const themeForm = useZodForm<ThemeFormModel>(ThemeSchema, {
    mode: 'onChange',
    defaultValues: formData.theme,
  })

  const passwordForm = useZodForm<PasswordFormModel>(PasswordSchema, {
    mode: 'onChange',
    defaultValues: formData.password,
  })

  const updateFormData = useCallback(() => {
    setFormData({
      meeting: meetingForm.getValues(),
      meetingDate: meetingDateForm.getValues(),
      theme: themeForm.getValues(),
      password: passwordForm.getValues(),
    })
  }, [meetingForm, meetingDateForm, themeForm, passwordForm, setFormData])

  const createMeetingMutation = useMutation({
    mutationFn: async () => {
      const currentFormData = useMeetStore.getState().formData
      const meetingData = {
        name: currentFormData.meeting.name,
        description: currentFormData.meeting.description,
        startDate: currentFormData.meetingDate.date,
        endDate: currentFormData.meetingDate.endDate,
        symbolColor: currentFormData.theme.color,
        password: currentFormData.password.password,
      }

      const meetingFormData = new FormData()
      meetingFormData.append(
        'meeting',
        new Blob([JSON.stringify(meetingData)], { type: 'application/json' }),
      )

      if (currentFormData.theme.photo instanceof File) {
        meetingFormData.append('thumbnail', currentFormData.theme.photo)
      }

      const response = await axios.post(
        'http://api.get-snappy.co.kr/api/v1/meetings',
        meetingFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )

      return response.data
    },
  })

  const onSubmit = async () => {
    if (step === 1) {
      const isStep1Valid = await meetingForm.trigger(['name', 'description'])
      if (isStep1Valid) {
        updateFormData()
        setStep(2)
      }
    } else if (step === 2) {
      const isStep2Valid = await meetingDateForm.trigger(['date', 'endDate'])
      if (isStep2Valid) {
        updateFormData()
        setStep(3)
      }
    } else if (step === 3) {
      const isStep3Valid = await themeForm.trigger(['photo', 'color'])
      if (isStep3Valid) {
        updateFormData()
        setStep(4)
      }
    } else if (step === 4) {
      const isStep4Valid = await passwordForm.trigger(['password'])
      if (isStep4Valid) {
        updateFormData()
        setIsSubmitting(true)
        try {
          const result = await createMeetingMutation.mutateAsync()
          console.log(createMeetingMutation)
          if (result.status === 200) {
            useMeetStore.getState().setMeetingResult(result.data)
            setStep(5)
          }
        } catch (error) {
          console.error('Failed to create meeting:', error)
        } finally {
          setIsSubmitting(false)
        }
      }
    }
  }

  return {
    meetingForm,
    meetingDateForm,
    themeForm,
    passwordForm,
    onSubmit,
    isLoading: createMeetingMutation.isPending || isSubmitting,
    isError: createMeetingMutation.isError,
    error: createMeetingMutation.error,
  }
}

export default useMeetingForm
