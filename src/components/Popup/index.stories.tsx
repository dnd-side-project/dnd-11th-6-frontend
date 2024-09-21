import type { Meta, StoryObj } from '@storybook/react'
import Popup from '.'

const meta: Meta<typeof Popup> = {
  title: 'Components/Popup',
  component: Popup,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Popup>

export const Default: Story = {
  args: {
    isOpen: true,
    title: (
      <>
        <div>해당 미션을</div>
        <div>정말 삭제하시겠어요?</div>
      </>
    ),
    onConfirm: () => console.log('Confirmed'),
    onCancel: () => console.log('Cancelled'),
  },
}

// only one button
export const SingleButton: Story = {
  args: {
    isOpen: true,
    title: (
      <>
        <div>해당 미션을</div>
        <div>정말 삭제하시겠어요?</div>
      </>
    ),
    onConfirm: () => console.log('Confirmed'),
    onCancel: () => console.log('Cancelled'),
    confirmText: '삭제',
    cancelText: '',
  },
}

// only one button
export const WithCloseButton: Story = {
  args: {
    isOpen: true,
    title: (
      <>
        <div>해당 미션을</div>
        <div>정말 삭제하시겠어요?</div>
      </>
    ),
    onConfirm: () => console.log('Confirmed'),
    onCancel: () => console.log('Cancelled'),
    onClose: () => console.log('Closed'),
    hasCloseButton: true,
    closeColor: '#fff',
  },
}
