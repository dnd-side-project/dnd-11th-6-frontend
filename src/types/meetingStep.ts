import { UseFormReturn } from 'react-hook-form'
import { MeetingFormModel } from '@/lib/meetingSchema'

export interface StepProps {
  form: UseFormReturn<MeetingFormModel>
  onSubmit: (data: MeetingFormModel) => void
}
