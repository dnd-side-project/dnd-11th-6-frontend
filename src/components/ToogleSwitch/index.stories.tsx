import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { ToggleSwitch, ToggleSwitchProps } from './index'

export default {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
  argTypes: {
    onChange: { action: 'changed' },
    LeftIcon: { control: false },
    RightIcon: { control: false },
  },
} as Meta

const Template: StoryFn<ToggleSwitchProps> = (args) => (
  <ToggleSwitch {...args} />
)

export const Default = Template.bind({})
Default.args = {
  leftOption: 'Off',
  rightOption: 'On',
  value: false,
}

export const CustomColors = Template.bind({})
CustomColors.args = {
  ...Default.args,
  activeColor: 'bg-blue-500',
  inactiveColor: 'bg-gray-300',
  activeTextColor: 'text-white',
  inactiveTextColor: 'text-gray-700',
}

export const CustomWidth = Template.bind({})
CustomWidth.args = {
  ...Default.args,
  width: '300px',
}

export const WithIcons = Template.bind({})
WithIcons.args = {
  ...Default.args,
  LeftIcon: ({ isActive }: { isActive: boolean }) => (
    <span className={`mr-2 ${isActive ? 'text-white' : 'text-gray-700'}`}>
      🔓
    </span>
  ),
  RightIcon: ({ isActive }: { isActive: boolean }) => (
    <span className={`mr-2 ${isActive ? 'text-white' : 'text-gray-700'}`}>
      🔒
    </span>
  ),
}

export const Active = Template.bind({})
Active.args = {
  ...Default.args,
  value: true,
}

export const LongText = Template.bind({})
LongText.args = {
  leftOption: 'Very Long Left Option',
  rightOption: 'Very Long Right Option',
  value: false,
  width: '400px',
}
