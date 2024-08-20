import {
  MeetingFormModel,
  MeetingDateFormModel,
  ThemeFormModel,
  PasswordFormModel,
} from './meetingSchema'

export interface FormData {
  meeting: Partial<MeetingFormModel>
  meetingDate: Partial<MeetingDateFormModel>
  theme: Partial<ThemeFormModel>
  password: Partial<PasswordFormModel>
}

export interface MeetingResult {
  meetingLink: string
  name: string
  leaderAuthKey: string
  password: string
  startDate: string
  endDate: string
  qrCodeUrl?: string
}
