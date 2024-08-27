import React, { ComponentProps } from 'react'
import { useForm } from 'react-hook-form'
import { StoryFn, Meta } from '@storybook/react'
import { TextInput } from '.'

export default {
  title: 'Components/Inputs/TextInput',
  component: TextInput,
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    success: { control: 'boolean' },
    checking: { control: 'boolean' },
    description: { control: 'text' },
  },
} as Meta<typeof TextInput>

const Template: StoryFn<ComponentProps<typeof TextInput>> = (args) => {
  const { control } = useForm()
  return <TextInput {...args} control={control} />
}

export const Default = Template.bind({})
Default.args = {
  name: 'default',
  label: 'Default Input',
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
