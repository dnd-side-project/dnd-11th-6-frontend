// src/components/Inputs/TextInput/TextInput.stories.tsx
import React from 'react'
import { useForm } from 'react-hook-form'
import { StoryFn, Meta } from '@storybook/react'
import { TextInput, TextInputProps } from './index'

export default {
  title: 'Components/Inputs/TextInput',
  component: TextInput,
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'password'],
    },
    error: { control: 'text' },
    success: { control: 'boolean' },
    checking: { control: 'boolean' },
    description: { control: 'text' },
  },
} as Meta<typeof TextInput>

const Template: StoryFn<TextInputProps<any>> = (args) => {
  const { control } = useForm()
  return <TextInput {...args} control={control} />
}

export const Default = Template.bind({})
Default.args = {
  name: 'default',
  label: 'Default Input',
  placeholder: 'Enter text...',
}

export const Password = Template.bind({})
Password.args = {
  name: 'password',
  label: 'Password Input',
  type: 'password',
  placeholder: 'Enter password...',
}

// ... 기존의 다른 스토리들
