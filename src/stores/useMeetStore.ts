import QRCode from 'qrcode'
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

interface MeetingResult {
  meetingLink: string
  name: string
  leaderAuthKey: string
  password: string
  startDate: string
  endDate: string
  qrCodeUrl?: string
}

interface MeetState {
  step: number
  formData: FormData
  meetingResult: MeetingResult | null
}

interface MeetActions {
  setStep: (step: number) => void
  setFormData: (data: Partial<FormData>) => void
  resetForm: () => void
  setMeetingResult: (result: Omit<MeetingResult, 'qrCodeUrl'>) => Promise<void>
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
  meetingResult: null,
  setStep: (step: number) => set({ step }),
  setFormData: (data: Partial<FormData>) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),
  resetForm: () =>
    set({ formData: initialFormData, step: 1, meetingResult: null }),
  setMeetingResult: async (result: Omit<MeetingResult, 'qrCodeUrl'>) => {
    try {
      const qrCodeUrl = await QRCode.toDataURL(
        `http://get-snappy.co.kr:3000/${result.meetingLink}`,
      )
      set({
        meetingResult: {
          ...result,
          qrCodeUrl,
        },
      })
    } catch (error) {
      console.error('Failed to generate QR code:', error)
      set({ meetingResult: result }) // QR 코드 생성 실패 시 원본 결과만 저장
    }
  },
}))

export default useMeetStore
