import { useForm, UseFormProps, FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodSchema } from 'zod'

function useZodForm<TFieldValues extends FieldValues>(
  schema: ZodSchema,
  options?: Omit<UseFormProps<TFieldValues>, 'resolver'>,
) {
  return useForm<TFieldValues>({
    ...options,
    resolver: zodResolver(schema),
  })
}

export default useZodForm
