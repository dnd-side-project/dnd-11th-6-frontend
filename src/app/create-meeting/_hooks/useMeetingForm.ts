import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import createMeeting from '@/apis/meetingApi'
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
  const { step, setStep, formData, setFormData, setMeetingResult } =
    useMeetStore()

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
    const meetingDateValues = meetingDateForm.getValues()

    const formattedMeetingDate = {
      date: dayjs(meetingDateValues.date).format('YYYY-MM-DDTHH:mm'),
      endDate: dayjs(meetingDateValues.endDate).format('YYYY-MM-DDTHH:mm'),
    }

    setFormData({
      meeting: meetingForm.getValues(),
      meetingDate: formattedMeetingDate,
      theme: themeForm.getValues(),
      password: passwordForm.getValues(),
    })
  }, [meetingForm, meetingDateForm, themeForm, passwordForm, setFormData])

  const createMeetingMutation = useMutation({
    mutationFn: createMeeting,
    onSuccess: (data) => {
      if (data.status === 200) {
        setMeetingResult(data.data)
        setStep(5)
      }
    },
    onError: (error) => {
      console.error('Failed to create meeting:', error)
    },
  })

  const handleStepSubmit = async (stepNumber: number) => {
    let isValid = false
    const triggerFields = {
      1: () => meetingForm.trigger(['name', 'description']),
      2: () => meetingDateForm.trigger(['date', 'endDate']),
      3: () => themeForm.trigger(['photo', 'color']),
      4: () => passwordForm.trigger(['password']),
    }

    const triggerFunction =
      triggerFields[stepNumber as keyof typeof triggerFields]
    if (triggerFunction) {
      isValid = await triggerFunction()
    } else {
      console.error(`Invalid step number: ${stepNumber}`)
      return
    }

    if (isValid) {
      updateFormData()
      if (stepNumber < 4) {
        setStep(stepNumber + 1)
      } else {
        createMeetingMutation.mutate(useMeetStore.getState().formData)
      }
    }
  }
  const onSubmit = () => handleStepSubmit(step)

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
