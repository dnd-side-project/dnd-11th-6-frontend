import { useState } from 'react'
import useZodForm from '@/hooks/useZodForm'
import { CreateMeetingSchema, MeetingFormModel } from '@/lib/meetingSchema'

function useMeetingForm() {
  const [step, setStep] = useState(1)

  const form = useZodForm<MeetingFormModel>(CreateMeetingSchema, {
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

  const onSubmit = async (data: MeetingFormModel) => {
    if (step === 1) {
      const isStep1Valid = await form.trigger([
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
    } else {
      console.log('Meeting created:', data)
    }
  }

  return {
    form,
    step,
    setStep,
    onSubmit,
  }
}

export default useMeetingForm
