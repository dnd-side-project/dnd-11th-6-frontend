import React, { ComponentProps } from 'react'
import { useForm } from 'react-hook-form'
import { StoryFn, Meta } from '@storybook/react'
import { DateInput } from './index'

export default {
  title: 'Components/Inputs/DateInput',
  component: DateInput,
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    error: { control: 'text' },
  },
} as Meta<typeof DateInput>

const Template: StoryFn<ComponentProps<typeof DateInput>> = (args) => {
  const { control } = useForm()
  return <DateInput {...args} control={control} />
}

export const Default = Template.bind({})
Default.args = {
  name: 'default',
  label: 'Select Date',
}

export const WithError = Template.bind({})
WithError.args = {
  name: 'withError',
  label: 'Date Input with Error',
  error: 'This field has an error',
}
