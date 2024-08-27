import React, { ComponentProps } from 'react'
import { useForm } from 'react-hook-form'
import { StoryFn, Meta } from '@storybook/react'
import { CheckboxInput } from './index'

export default {
  title: 'Components/Inputs/CheckboxInput',
  component: CheckboxInput,
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
  },
} as Meta<typeof CheckboxInput>

const Template: StoryFn<ComponentProps<typeof CheckboxInput>> = (args) => {
  const { control } = useForm()
  return <CheckboxInput {...args} control={control} />
}

export const Default = Template.bind({})
Default.args = {
  name: 'default',
  label: 'Accept terms and conditions',
}
