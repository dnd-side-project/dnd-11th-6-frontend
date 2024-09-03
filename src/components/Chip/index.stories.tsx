import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import Chip from '.'

export default {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    label: { control: 'text' },
    variant: {
      control: { type: 'select', options: ['default', 'active'] },
    },
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
    },
    onClick: { action: 'clicked' },
  },
} as Meta

const Template: StoryFn<typeof Chip> = (args) => <Chip {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Default Chip',
}

export const Active = Template.bind({})
Active.args = {
  label: 'Active Chip',
  variant: 'active',
}

export const Small = Template.bind({})
Small.args = {
  label: 'Small Chip',
  size: 'sm',
}

export const Large = Template.bind({})
Large.args = {
  label: 'Large Chip',
  size: 'lg',
}

export const WithImage = Template.bind({})
WithImage.args = {
  label: 'Chip with Image',
  chipImage: '/path/to/your/image.png',
}
