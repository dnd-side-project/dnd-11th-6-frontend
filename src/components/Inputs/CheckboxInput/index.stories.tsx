import React from 'react'
import { useForm } from 'react-hook-form'
import { Meta, StoryObj } from '@storybook/react'
import { CheckboxInput } from './index'

const meta: Meta<typeof CheckboxInput> = {
  title: 'Components/Inputs/CheckboxInput',
  component: CheckboxInput,
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof CheckboxInput>

export const Default: Story = {
  render: (args) => {
    const { control } = useForm()
    return <CheckboxInput {...args} control={control} />
  },
  args: {
    name: 'default',
    label: 'Accept terms and conditions',
  },
}
