import { useCallback } from 'react'
import useZodForm from '@/hooks/useZodForm'
import {
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
      theme: themeForm.getValues(),
      password: passwordForm.getValues(),
    })
  }, [meetingForm, themeForm, passwordForm, setFormData])

  const onSubmit = async () => {
    if (step === 1) {
      const isStep1Valid = await meetingForm.trigger([
        'name',
        'description',
        // 'date',
        // 'isRecurring',
        // 'endDate',
      ])
      if (isStep1Valid) {
        updateFormData()
        setStep(2)
      }
    } else if (step === 2) {
      const isStep2Valid = await themeForm.trigger(['photo', 'color'])
      if (isStep2Valid) {
        updateFormData()
        setStep(3)
      }
    } else if (step === 3) {
      updateFormData()
      const generatedPin = Math.floor(1000 + Math.random() * 9000).toString()
      setPin(generatedPin)
      setStep(4)
      console.log(formData)
    } else if (step === 4) {
      setStep(5)
    }
  }

  return {
    meetingForm,
    themeForm,
    passwordForm,
    onSubmit,
  }
}

export default useMeetingForm
