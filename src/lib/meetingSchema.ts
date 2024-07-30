import * as z from 'zod'

export const CreateMeetingSchema = z
  .object({
    name: z.string().min(1, { message: '모임 이름을 입력해주세요.' }),
    description: z.string().min(1, { message: '모임 설명을 입력해주세요.' }),
    date: z.string().min(1, { message: '날짜를 선택해주세요.' }),
    time: z.string().min(1, { message: '시간을 선택해주세요.' }),
    isRecurring: z.boolean().optional(),
    endDate: z.string().optional(),
    photo: z.string().optional(),
    color: z.string().optional(),
    password: z.string().min(6, '비밀번호는 최소 6자리 이상이어야 합니다.'),
  })
  .refine(
    (data) => {
      if (data.isRecurring && data.endDate) {
        return new Date(data.endDate) > new Date(data.date)
      }
      return true
    },
    {
      message: '종료일은 시작일 이후여야 합니다.',
      path: ['endDate'],
    },
  )

export type MeetingFormModel = z.infer<typeof CreateMeetingSchema>
