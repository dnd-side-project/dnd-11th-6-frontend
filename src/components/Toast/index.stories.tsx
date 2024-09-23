import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import Toast from '.'

interface ToastProps {
  message: string
  type?: 'default' | 'info' | 'warning' | 'success'
  position?: 'top' | 'bottom'
  duration?: number
  link?: string
  onClose?: () => void
}

export default {
  title: 'Components/Toast',
  component: Toast,
  argTypes: {
    message: { control: 'text' },
    type: {
      control: {
        type: 'select',
        options: ['default', 'info', 'warning', 'success'],
      },
    },
    position: {
      control: { type: 'radio', options: ['top', 'bottom'] },
    },
    duration: { control: 'number' },
    link: { control: 'text' },
  },
} as Meta

const Template: StoryFn<ToastProps> = (args) => <Toast {...args} />

export const Default = Template.bind({})
Default.args = {
  message: '토스트 메시지입니다!',
  type: 'default',
  position: 'top',
  duration: 3000,
}

export const Info = Template.bind({})
Info.args = {
  ...Default.args,
  message: '토스트 메시지입니다!',
  type: 'info',
}

export const Warning = Template.bind({})
Warning.args = {
  ...Default.args,
  message: '토스트 메시지입니다!',
  type: 'warning',
}

export const Success = Template.bind({})
Success.args = {
  ...Default.args,
  message: '토스트 메시지입니다!',
  type: 'success',
}

export const BottomPosition = Template.bind({})
BottomPosition.args = {
  ...Default.args,
  message: '토스트 메시지입니다!',
  position: 'bottom',
}

export const WithLink = Template.bind({})
WithLink.args = {
  ...Default.args,
  type: 'info',
  message: '토스트 메시지입니다!',
  link: 'https://google.com',
}
