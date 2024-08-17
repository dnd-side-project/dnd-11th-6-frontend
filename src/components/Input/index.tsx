import React from 'react'
import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  FieldError,
} from 'react-hook-form'
import Image from 'next/image'
import Check from 'public/icons/check.svg'
import Meatballs from 'public/icons/meatballs.svg'

export interface InputProps<T extends FieldValues> {
  name: Path<T>
  control?: Control<T>
  rules?: RegisterOptions
  label?: string
  type?: string
  placeholder?: string
  error?: string | FieldError | null
  success?: boolean
  checking?: boolean
  className?: string
  as?: 'input' | 'textarea' | 'checkbox'
  errorMessage?: string
  successMessage?: string
  checkingMessage?: string
  description?: string
  wrapperClassName?: string
}

export function Input<T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  placeholder,
  error = null,
  success,
  checking,
  className = '',
  as = 'input',
  successMessage = '알맞은 링크를 찾았어요!',
  checkingMessage = '확인중',
  description,
  wrapperClassName = '',
}: InputProps<T>) {
  const inputClassName = `w-full h-[54px] py-4 px-[18px] border rounded-[14px] text-[18px] focus:border-gray-900 focus:outline-none focus:ring-0 ${className} ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-500'}`

  const renderInput = (field: any) => {
    const props = {
      ...field,
      id: name,
      type,
      placeholder,
      className: as === 'checkbox' ? 'mr-2' : inputClassName,
    }

    if (as === 'textarea') return <textarea rows={3} {...props} />
    if (as === 'checkbox') {
      return (
        <label htmlFor={name} className="flex items-center">
          <input {...props} />
          <span>{label}</span>
        </label>
      )
    }
    return (
      <div className="relative">
        <input {...props} />
        {description && (
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
            {description}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`mb-4 ${wrapperClassName}`}>
      {as !== 'checkbox' && (
        <label htmlFor={name} className="block mb-2 text-gray-600 text-sm">
          {label}
        </label>
      )}
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => renderInput(field)}
        />
      ) : (
        renderInput({ name })
      )}
      {error && error !== '' && (
        <p className="text-red-600 text-sm mt-1">
          {typeof error === 'string' ? error : error.message}
        </p>
      )}
      {success && (
        <div className="flex">
          {' '}
          <Image src={Check} alt="Check" className="mt-1" />{' '}
          <p className="text-green-600 text-sm mt-1 ml-1">{successMessage}</p>{' '}
        </div>
      )}
      {checking && (
        <div className="flex">
          {' '}
          <Image src={Meatballs} alt="Meatballs" className="mt-1" />{' '}
          <p className="text-gray-700 text-sm mt-1 ml-1">{checkingMessage}</p>
        </div>
      )}
    </div>
  )
}
