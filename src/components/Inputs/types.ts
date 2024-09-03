import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  FieldError,
} from 'react-hook-form'

export interface BaseInputProps<T extends FieldValues> {
  name: Path<T>
  control?: Control<T>
  rules?: RegisterOptions
  label?: string
  placeholder?: string
  error?: string | FieldError | null
  className?: string
  description?: string
}
