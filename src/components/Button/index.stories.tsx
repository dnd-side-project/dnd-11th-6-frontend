import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Button } from '.'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['primary', 'light', 'outline'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
} as Meta<typeof Button>

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Primary Button',
  variant: 'primary',
  size: 'md',
}

export const Light = Template.bind({})
Light.args = {
  children: 'Light Button',
  variant: 'light',
  size: 'md',
}

export const Outline = Template.bind({})
Outline.args = {
  children: 'Outline Button',
  variant: 'outline',
  size: 'md',
}

export const Small = Template.bind({})
Small.args = {
  children: 'Small Button',
  size: 'sm',
}

export const Medium = Template.bind({})
Medium.args = {
  children: 'Medium Button',
  size: 'md',
}

export const Large = Template.bind({})
Large.args = {
  children: 'Large Button',
  size: 'lg',
}

export const FullWidth = Template.bind({})
FullWidth.args = {
  children: 'Full Width Button',
  fullWidth: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'Disabled Button',
  disabled: true,
}

export const WithIcon: StoryFn<typeof Button> = (args) => (
  <Button {...args}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 mr-2"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
        clipRule="evenodd"
      />
    </svg>
    Button with Icon
  </Button>
)
WithIcon.args = {
  variant: 'primary',
  size: 'md',
}
