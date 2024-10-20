import { Controller, FieldValues } from 'react-hook-form'
import { BaseInputProps } from '../types'

export interface DateInputProps<T extends FieldValues>
  extends Omit<BaseInputProps<T>, 'placeholder' | 'description'> {
  min?: string
  max?: string
}
export function DateInput<T extends FieldValues>({
  name,
  control,
  label,
  error = null,
  className = '',
  min,
  max,
}: DateInputProps<T>) {
  const inputClassName = `w-full py-4 px-[18px] border rounded-[14px] text-[18px] focus:outline-none focus:ring-0 ${className} ${
    error ? 'border-red-500' : 'border-gray-600'
  }`

  const renderDateInput = (field: any) => {
    const props = {
      ...field,
      id: name,
      type: 'date',
      className: inputClassName,
      min,
      max,
    }
    return (
      <div className="mb-6">
        <div className="mb-2">
          <label htmlFor={name} className="block text-gray-600 text-sm mb-2">
            {label}
          </label>
          <input {...props} type="date" min={min} max={max} />
        </div>
        {error && (
          <p className="text-red-600 text-sm">
            {typeof error === 'string' ? error : error.message}
          </p>
        )}
      </div>
    )
  }

  return control ? (
    <Controller
      name={name}
      control={control}
      render={({ field }) => renderDateInput(field)}
    />
  ) : (
    renderDateInput({ name })
  )
}
