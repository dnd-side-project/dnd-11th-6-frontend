import * as z from 'zod'

export const MeetingSchema = z
  .object({
    name: z.string().min(1, { message: '모임 이름을 입력해주세요.' }),
    description: z.string().min(1, { message: '모임 설명을 입력해주세요.' }),
    date: z.string().min(1, { message: '날짜를 선택해주세요.' }),
    isRecurring: z.boolean().optional(),
    endDate: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.isRecurring) {
        if (!data.endDate) {
          return false
        }
        return new Date(data.endDate) > new Date(data.date)
      }
      return true
    },
    {
      message: '종료일은 필수이며, 시작일 이후여야 합니다.',
      path: ['endDate'],
    },
  )

export const ThemeSchema = z.object({
  photo: z.string().optional(),
  color: z.string().optional(),
})

export const PasswordSchema = z.object({
  password: z.string().min(6, '비밀번호는 최소 6자리 이상이어야 합니다.'),
})

export type MeetingFormModel = z.infer<typeof MeetingSchema>
export type ThemeFormModel = z.infer<typeof ThemeSchema>
export type PasswordFormModel = z.infer<typeof PasswordSchema>
