import type { Meta, StoryObj } from '@storybook/react'
import Tooltip from '@/components/Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    onClose: { action: 'closed' },
    position: {
      control: { type: 'radio' },
      options: ['top', 'bottom'],
    },
    className: { control: 'text' },
    arrowClassName: { control: 'text' },
    bgColor: { control: 'text' },
    textColor: { control: 'text' },
    rounded: { control: 'text' },
    padding: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    message: 'This is a default tooltip',
    position: 'bottom',
    arrowClassName: 'left-1/2',
  },
}

export const TopPosition: Story = {
  args: {
    message: 'This tooltip is positioned at the top',
    position: 'top',
    arrowClassName: 'left-1/2',
  },
}

export const BottomPosition: Story = {
  args: {
    message: 'This tooltip is positioned at the bottom',
    position: 'bottom',
    arrowClassName: 'left-1/2',
  },
}

export const CustomColors: Story = {
  args: {
    message: 'Custom colored tooltip',
    position: 'bottom',
    arrowClassName: 'left-1/2',
    bgColor: 'bg-blue-500',
    textColor: 'text-yellow-200',
  },
}

export const CustomShape: Story = {
  args: {
    message: 'Custom shaped tooltip',
    position: 'bottom',
    arrowClassName: 'left-1/2',
    rounded: 'rounded-lg',
    padding: 'p-3',
  },
}

export const CameraViewExample: Story = {
  args: {
    message: '내 사진에 미션을 더 해봐요!',
    position: 'bottom',
    className: 'top-12 left-24',
    arrowClassName: 'left-12',
  },
}

export const PhotoViewExample: Story = {
  args: {
    message: '내 사진에 미션을 더 해봐요!',
    position: 'top',
    arrowClassName: 'left-1/2',
    className: 'bottom-16 left-1/2',
  },
}
