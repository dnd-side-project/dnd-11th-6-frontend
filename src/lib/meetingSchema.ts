import * as z from 'zod'

export const MeetingSchema = z.object({
  name: z.string().min(3, { message: '3글자 이상 입력해주세요.' }),
  description: z.string().min(8, { message: '8글자 이상 입력해주세요.' }),
})

export const MeetingDateSchema = z
  .object({
    date: z.string().min(1, { message: '시작 날짜를 선택해주세요.' }),
    endDate: z.string().min(1, { message: '종료 날짜를 선택해주세요.' }),
  })
  .refine(
    (data) => {
      if (data.date && data.endDate) {
        return new Date(data.date) < new Date(data.endDate)
      }
      return false
    },
    {
      message: '종료 날짜는 시작 날짜보다 뒤여야 합니다.',
      path: ['endDate'],
    },
  )

export const ThemeSchema = z.object({
  photo: z
    .instanceof(File, { message: '사진을 선택해주세요.' })
    .refine((file) => file.size <= 5000000, '파일 크기는 5MB 이하여야 합니다.')
    .optional(),
  color: z.string().min(1, { message: '색상을 선택해주세요.' }),
})

export const PasswordSchema = z.object({
  password: z
    .string()
    .length(4, '비밀번호는 4자리여야 합니다.')
    .regex(/^\d{4}$/, '비밀번호는 4자리 숫자여야 합니다.'),
})

export type MeetingFormModel = z.infer<typeof MeetingSchema>
export type MeetingDateFormModel = z.infer<typeof MeetingDateSchema>
export type ThemeFormModel = z.infer<typeof ThemeSchema>
export type PasswordFormModel = z.infer<typeof PasswordSchema>
