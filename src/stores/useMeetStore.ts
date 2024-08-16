import { create } from 'zustand'
import {
  MeetingFormModel,
  ThemeFormModel,
  PasswordFormModel,
  MeetingDateFormModel,
} from '@/lib/meetingSchema'

interface FormData {
  meeting: Partial<MeetingFormModel>
  meetingDate: Partial<MeetingDateFormModel>
  theme: Partial<ThemeFormModel>
  password: Partial<PasswordFormModel>
}

interface MeetState {
  step: number
  pin: string
  formData: FormData
}

interface MeetActions {
  setStep: (step: number) => void
  setPin: (pin: string) => void
  setFormData: (data: Partial<FormData>) => void
  resetForm: () => void
}

interface MeetStore extends MeetState, MeetActions {}

const initialFormData: FormData = {
  meeting: {
    name: '',
    description: '',
  },
  meetingDate: {
    date: '',
    endDate: '',
  },
  theme: {
    photo: '',
    color: '',
  },
  password: {
    password: '',
  },
}

const useMeetStore = create<MeetStore>((set) => ({
  step: 1,
  pin: '',
  formData: initialFormData,
  setStep: (step: number) => set({ step }),
  setPin: (pin: string) => set({ pin }),
  setFormData: (data: Partial<FormData>) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),
  resetForm: () => set({ formData: initialFormData, step: 1, pin: '' }),
}))

export default useMeetStore
