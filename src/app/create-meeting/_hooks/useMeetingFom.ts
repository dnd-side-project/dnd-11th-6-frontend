import { useState } from 'react'
import useZodForm from '@/hooks/useZodForm'
import {
  MeetingFormModel,
  MeetingSchema,
  PasswordFormModel,
  PasswordSchema,
  ThemeFormModel,
  ThemeSchema,
} from '@/lib/meetingSchema'

function useMeetingForm() {
  const [step, setStep] = useState(1)
  const [pin, setPin] = useState<string>('')

  const meetingForm = useZodForm<MeetingFormModel>(MeetingSchema, {
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      date: '',
      time: '',
      isRecurring: false,
      endDate: '',
    },
  })

  const themeForm = useZodForm<ThemeFormModel>(ThemeSchema, {
    mode: 'onChange',
    defaultValues: {
      photo: '',
      color: '',
    },
  })

  const passwordForm = useZodForm<PasswordFormModel>(PasswordSchema, {
    mode: 'onChange',
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = async (
    data: MeetingFormModel | ThemeFormModel | PasswordFormModel,
  ) => {
    if (step === 1) {
      const isStep1Valid = await meetingForm.trigger([
        'name',
        'description',
        'date',
        'time',
        'isRecurring',
        'endDate',
      ])
      if (isStep1Valid) {
        setStep(2)
      }
    } else if (step === 2) {
      const isStep2Valid = await themeForm.trigger(['photo', 'color'])
      if (isStep2Valid) {
        setStep(3)
      }
    } else if (step === 3) {
      const { password } = passwordForm.getValues()
      const allData = { ...data, password }
      const generatedPin = Math.floor(1000 + Math.random() * 9000).toString()
      setPin(generatedPin)
      setStep(4)
      console.log(allData)
    } else if (step === 4) {
      setStep(5)
    }
  }

  return {
    meetingForm,
    themeForm,
    passwordForm,
    step,
    pin,
    setStep,
    onSubmit,
  }
}

export default useMeetingForm
