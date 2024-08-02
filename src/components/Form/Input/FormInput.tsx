import React from 'react'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'

interface FormInputProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  type?: string
  placeholder?: string
  error?: string
}

function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  placeholder,
  error,
}: FormInputProps<T>) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-bold mb-2">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <input
            onChange={onChange}
            onBlur={onBlur}
            value={value as string}
            ref={ref}
            id={name}
            type={type}
            className="w-full p-2 border rounded"
            placeholder={placeholder}
          />
        )}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default FormInput
