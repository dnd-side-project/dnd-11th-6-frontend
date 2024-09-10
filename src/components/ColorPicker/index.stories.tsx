import type { Meta, StoryObj } from '@storybook/react'
import ColorPicker from '.'

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  argTypes: {
    onColorSelect: { action: 'color selected' },
  },
}

export default meta
type Story = StoryObj<typeof ColorPicker>

export const Default: Story = {
  args: {
    selectedColor: null,
  },
}
