import React from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import { StoryFn, Meta } from '@storybook/react'
import { Input, InputProps } from '.'

export default {
  title: 'Components/FlexibleInput',
  component: Input,
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
    },
  },
} as Meta<typeof Input>

const Template: StoryFn<InputProps<FieldValues>> = (args) => {
  const { control } = useForm()
  return <Input {...args} control={control} />
}

export const Default = Template.bind({})
Default.args = {
  name: 'default',
  label: 'Default Input',
  placeholder: 'Enter text...',
}

export const WithValidation = Template.bind({})
WithValidation.args = {
  name: 'withValidation',
  label: 'Input with Validation',
  placeholder: 'Enter text...',
}

export const WithError = Template.bind({})
WithError.args = {
  name: 'withError',
  label: 'Input with Error',
  placeholder: 'Enter text...',
  error: 'This field has an error',
}

export const Password = Template.bind({})
Password.args = {
  name: 'password',
  label: 'Password Input',
  type: 'password',
  placeholder: 'Enter password...',
}

export const WithoutReactHookForm: StoryFn<InputProps<FieldValues>> = (
  args,
) => <Input {...args} />
WithoutReactHookForm.args = {
  name: 'withoutReactHookForm',
  label: 'Regular Input',
  placeholder: 'Enter text...',
}
