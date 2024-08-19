import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
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
    mutationFn: async (data: any) => {
      const meetingData = {
        name: data.meeting.name,
        description: data.meeting.description,
        startDate: data.meetingDate.date,
        endDate: data.meetingDate.endDate,
        symbolColor: data.theme.color,
        password: data.password.password,
      }

      const meetingFormData = new FormData()
      meetingFormData.append('meeting', JSON.stringify(meetingData))

      // 파일이 있는 경우에만 추가
      if (data.theme.photo instanceof File) {
        meetingFormData.append('thumbnail', data.theme.photo)
      }

      const response = await fetch(
        'http://api.get-snappy.co.kr/api/v1/meetings',
        {
          method: 'POST',
          body: meetingFormData,
        },
      )

      if (!response.ok) {
        throw new Error('Failed to create meeting')
      }

      return response.json()
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
      updateFormData()
      const isStep4Valid = await passwordForm.trigger(['password'])
      if (isStep4Valid) {
        // Submit the form data to the API
        try {
          const result = await createMeetingMutation.mutateAsync(formData)
          console.log(result)
          setStep(5)
        } catch (error) {
          console.error('Failed to create meeting:', error)
          // Handle error (e.g., show error message to user)
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
    isLoading: createMeetingMutation.isPending,
    isError: createMeetingMutation.isError,
    error: createMeetingMutation.error,
  }
}

export default useMeetingForm
