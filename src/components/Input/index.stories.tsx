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
    error: { control: 'text' },
    success: { control: 'boolean' },
    checking: { control: 'boolean' },
    description: { control: 'text' },
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

export const WithSuccess = Template.bind({})
WithSuccess.args = {
  name: 'withSuccess',
  label: 'Input with Success',
  placeholder: 'Enter text...',
  success: true,
  successMessage: '알맞는 링크를 찾았어요!',
}

export const Checking = Template.bind({})
Checking.args = {
  name: 'checking',
  label: 'Input while Checking',
  placeholder: 'Enter text...',
  checking: true,
  checkingMessage: '확인 중...',
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

export const AllFeatures = Template.bind({})
AllFeatures.args = {
  name: 'allFeatures',
  label: 'Input with All Features',
  placeholder: 'Enter text...',
  description: '(description)',
  error: 'This is an error message',
  errorMessage: '유효하지 않은 입력입니다',
  success: false,
  successMessage: '올바른 입력입니다',
  checking: false,
  checkingMessage: '입력 확인 중...',
}
