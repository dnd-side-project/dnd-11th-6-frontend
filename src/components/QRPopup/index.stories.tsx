import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import QRPopup from '.'

export default {
  title: 'Components/QRPopup',
  component: QRPopup,
  argTypes: {
    onClose: { action: 'closed' },
  },
} as Meta

const Template: StoryFn<React.ComponentProps<typeof QRPopup>> = (args) => (
  <QRPopup {...args} />
)

export const Default = Template.bind({})
Default.args = {
  qrData: 'https://example.com/meeting/123',
  meetingName: '우리 모임',
}

export const LongMeetingName = Template.bind({})
LongMeetingName.args = {
  qrData: 'https://example.com/meeting/456',
  meetingName: '아주 엄청 매우 정말 말도 안되게 대단히 긴 모임 이름',
}
