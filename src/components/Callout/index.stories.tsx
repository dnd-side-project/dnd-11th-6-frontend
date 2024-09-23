import { Meta } from '@storybook/react'
import Callout from './index'

export default {
  title: 'Components/Callout',
  component: Callout,
  argTypes: {
    onButtonClick: { action: 'clicked' },
  },
} as Meta<typeof Callout>

function Template(args: React.ComponentProps<typeof Callout>) {
  return <Callout {...args} />
}
export function Default(args: React.ComponentProps<typeof Callout>) {
  return <Template {...args} />
}
Default.args = {
  title: '모임 링크가 없으신가요?',
  content:
    '안전한 모임 앨범을 위해 링크가 없으면 입장이 어려워요.\n링크가 없다면 나만의 모임 앨범을 새로 만들어보세요.',

  buttonText: '새로운 모임 앨범 만들기',
  onButtonClick: () => {},
}
