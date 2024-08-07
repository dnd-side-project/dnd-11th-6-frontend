import React from 'react'
import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  FieldError,
} from 'react-hook-form'

export interface InputProps<T extends FieldValues> {
  name: Path<T>
  control?: Control<T>
  rules?: RegisterOptions
  label: string
  type?: string
  placeholder?: string
  error?: string | FieldError
  className?: string
  as?: 'input' | 'textarea'
}

export function Input<T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  placeholder,
  error,
  className = '',
  as = 'input',
}: InputProps<T>) {
  const inputClassName = `w-full p-2 border rounded ${className} ${error ? 'border-red-500' : 'border-gray-300'}`

  const renderInput = (field: any) => {
    const props = {
      ...field,
      id: name,
      type,
      placeholder,
      className: inputClassName,
    }

    return as === 'textarea' ? <textarea {...props} /> : <input {...props} />
  }

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-bold mb-2">
        {label}
      </label>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => renderInput(field)}
        />
      ) : (
        renderInput({ name })
      )}
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {typeof error === 'string' ? error : error.message}
        </p>
      )}
    </div>
  )
}
