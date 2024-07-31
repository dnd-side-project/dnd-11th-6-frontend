import { UseFormReturn } from 'react-hook-form'
import {
  MeetingFormModel,
  PasswordFormModel,
  ThemeFormModel,
} from '@/lib/meetingSchema'

export interface Step1Props {
  form: UseFormReturn<MeetingFormModel>
  onSubmit: (data: MeetingFormModel) => void
}

export interface Step2Props {
  form: UseFormReturn<ThemeFormModel>
  onSubmit: (data: ThemeFormModel) => void
}

export interface Step3Props {
  form: UseFormReturn<PasswordFormModel>
  onSubmit: (data: PasswordFormModel) => void
}
