import React, { ComponentProps } from 'react'
import { useForm } from 'react-hook-form'
import { StoryFn, Meta } from '@storybook/react'
import { TextareaInput } from './index'

export default {
  title: 'Components/Inputs/TextareaInput',
  component: TextareaInput,
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    error: { control: 'text' },
    rows: { control: 'number' },
  },
} as Meta<typeof TextareaInput>

const Template: StoryFn<ComponentProps<typeof TextareaInput>> = (args) => {
  const { control } = useForm()
  return <TextareaInput {...args} control={control} />
}

export const Default = Template.bind({})
Default.args = {
  name: 'default',
  label: 'Default Textarea',
  rows: 3,
}

export const WithError = Template.bind({})
WithError.args = {
  name: 'withError',
  label: 'Textarea with Error',
  error: 'This field has an error',
  rows: 3,
}
