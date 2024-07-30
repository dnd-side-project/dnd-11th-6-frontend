import { useState } from 'react'
import useZodForm from '@/hooks/useZodForm'
import { CreateMeetingSchema, MeetingFormModel } from '@/lib/meetingSchema'

function useMeetingForm() {
  const [step, setStep] = useState(1)

  const meetingForm = useZodForm<MeetingFormModel>(CreateMeetingSchema, {
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      date: '',
      time: '',
      isRecurring: false,
      endDate: '',
      photo: '',
      color: '',
    },
  })

  const passwordForm = useZodForm<MeetingFormModel>(CreateMeetingSchema, {
    mode: 'onChange',
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = async (data: MeetingFormModel) => {
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
      const isStep2Valid = await meetingForm.trigger(['photo', 'color'])
      if (isStep2Valid) {
        setStep(3)
      }
    } else {
      const { password } = passwordForm.getValues()
      const allData = { ...data, password }
      console.log('Meeting created with password:', allData)
      // Here you would typically send the data to your backend
    }
  }

  return {
    meetingForm,
    passwordForm,
    step,
    setStep,
    onSubmit,
  }
}

export default useMeetingForm
