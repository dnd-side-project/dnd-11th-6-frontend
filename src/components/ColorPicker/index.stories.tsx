import type { Meta, StoryObj } from '@storybook/react'
import COLORS from '@/constant/color'
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

export const WithSelectedColor: Story = {
  args: {
    selectedColor: COLORS[1], // Selects '#FF862E'
  },
}

export const WithBlackSelected: Story = {
  args: {
    selectedColor: 'black',
  },
}

// This story demonstrates what happens if a color outside the COLORS array is selected
// It's useful for testing error handling or fallback behavior
export const WithInvalidColor: Story = {
  args: {
    selectedColor: '#FFA500' as any, // TypeScript will warn about this, which is good for type safety
  },
}
