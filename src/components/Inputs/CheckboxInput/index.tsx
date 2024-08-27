import { Controller, FieldValues } from 'react-hook-form'
import { BaseInputProps } from '../types'

export interface CheckboxInputProps<T extends FieldValues>
  extends Pick<BaseInputProps<T>, 'name' | 'control' | 'rules' | 'className'> {
  label: string
}

export function CheckboxInput<T extends FieldValues>({
  name,
  control,
  label,
  className = '',
}: CheckboxInputProps<T>) {
  const renderCheckbox = (field: any) => {
    const props = {
      ...field,
      id: name,
      type: 'checkbox',
      className: `mr-2 ${className}`,
    }

    return (
      <div className="mb-6">
        <label htmlFor={name} className="flex items-center">
          <input {...props} />
          <span className="text-gray-600 text-sm">{label}</span>
        </label>
      </div>
    )
  }

  return control ? (
    <Controller
      name={name}
      control={control}
      render={({ field }) => renderCheckbox(field)}
    />
  ) : (
    renderCheckbox({ name })
  )
}
