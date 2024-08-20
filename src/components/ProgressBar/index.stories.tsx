import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import ProgressBar, { ProgressBarProps } from '.'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 1, max: 10 },
    },
    totalSteps: {
      control: { type: 'number', min: 1, max: 10 },
    },
  },
}

export default meta
type Story = StoryObj<typeof ProgressBar>

const Template: Story = {
  render: (args) => <ProgressBar {...args} />,
}

export const Default: Story = {
  ...Template,
  args: {
    currentStep: 3,
    totalSteps: 5,
  },
}

export const FirstStep: Story = {
  ...Template,
  args: {
    currentStep: 1,
    totalSteps: 5,
  },
}

export const LastStep: Story = {
  ...Template,
  args: {
    currentStep: 5,
    totalSteps: 5,
  },
}

export const ManySteps: Story = {
  ...Template,
  args: {
    currentStep: 5,
    totalSteps: 10,
  },
}

export const InteractiveProgressBar: StoryObj<ProgressBarProps> = {
  render: (args) => {
    const [currentStep, setCurrentStep] = React.useState(args.currentStep)
    return (
      <div>
        <ProgressBar currentStep={currentStep} totalSteps={args.totalSteps} />
        <div className="mt-4">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            className="px-4 py-2 mr-2 bg-gray-200 rounded"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentStep((prev) => Math.min(args.totalSteps, prev + 1))
            }
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Next
          </button>
        </div>
      </div>
    )
  },
  args: {
    currentStep: 1,
    totalSteps: 5,
  },
}
