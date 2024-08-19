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
  formData: FormData
}

interface MeetActions {
  setStep: (step: number) => void
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
    photo: undefined,
    color: '',
  },
  password: {
    password: '',
  },
}

const useMeetStore = create<MeetStore>((set) => ({
  step: 1,
  formData: initialFormData,
  setStep: (step: number) => set({ step }),
  setFormData: (data: Partial<FormData>) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),
  resetForm: () => set({ formData: initialFormData, step: 1 }),
}))

export default useMeetStore
