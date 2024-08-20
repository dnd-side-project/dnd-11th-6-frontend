import { create } from 'zustand'
import { MeetingFormData, MeetingResult } from '@/lib/meetingTypes'
import generateQRCode from '@/utils/qrCode'

interface MeetState {
  step: number
  formData: MeetingFormData
  meetingResult: MeetingResult | null
}

interface MeetActions {
  setStep: (step: number | ((prevStep: number) => number)) => void
  setFormData: (data: Partial<MeetingFormData>) => void
  resetForm: () => void
  setMeetingResult: (result: Omit<MeetingResult, 'qrCodeUrl'>) => Promise<void>
}

interface MeetStore extends MeetState, MeetActions {}

const initialFormData: MeetingFormData = {
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
  setStep: (step) =>
    set((state) => ({
      step: typeof step === 'function' ? step(state.step) : step,
    })),
  setFormData: (data: Partial<MeetingFormData>) =>
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
      const qrCodeUrl = await generateQRCode(
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
      set({ meetingResult: result })
    }
  },
}))

export default useMeetStore
