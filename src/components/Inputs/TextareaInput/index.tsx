import React from 'react'
import { Controller, FieldValues } from 'react-hook-form'
import { BaseInputProps } from '../types'

export interface TextareaInputProps<T extends FieldValues>
  extends Omit<BaseInputProps<T>, 'placeholder'> {
  placeholder?: string
  rows?: number
  maxLength?: number
  showCharCount?: boolean
}

export function TextareaInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  error = null,
  className = '',
  rows = 3,
  maxLength,
  showCharCount,
}: TextareaInputProps<T>) {
  const textareaClassName = `w-full py-4 px-[18px] border rounded-[14px] text-[18px] focus:outline-none focus:ring-0 ${className} ${
    error ? 'border-red-500' : 'border-gray-600'
  }`

  const renderTextarea = (field: any) => {
    const props = {
      ...field,
      id: name,
      placeholder,
      className: textareaClassName,
      rows,
      maxLength,
    }

    const charCount = field.value?.length || 0

    return (
      <div className="mb-6">
        <div className="mb-2">
          <label htmlFor={name} className="block text-gray-600 text-sm mb-2">
            {label}
          </label>
          <textarea {...props} />
        </div>
        <div className={`${error ? 'flex justify-between' : 'w-full'}`}>
          {error && (
            <p className="text-red-600 text-sm">
              {typeof error === 'string' ? error : error.message}
            </p>
          )}
          {showCharCount && maxLength && (
            <span className="text-sm text-gray-600 flex justify-end">
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    )
  }

  return control ? (
    <Controller
      name={name}
      control={control}
      render={({ field }) => renderTextarea(field)}
    />
  ) : (
    renderTextarea({ name })
  )
}
