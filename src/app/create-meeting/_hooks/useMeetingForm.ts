import { useCallback } from 'react'
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
  const { step, setStep, setPin, formData, setFormData } = useMeetStore()

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
      console.log(isStep3Valid)
      if (isStep3Valid) {
        updateFormData()
        setStep(4)
      }
    } else if (step === 4) {
      updateFormData()
      const generatedPin = Math.floor(1000 + Math.random() * 9000).toString()
      setPin(generatedPin)
      setStep(5)
      console.log(formData)
    } else if (step === 5) {
      setStep(6)
    }
  }

  return {
    meetingForm,
    meetingDateForm,
    themeForm,
    passwordForm,
    onSubmit,
  }
}

export default useMeetingForm
