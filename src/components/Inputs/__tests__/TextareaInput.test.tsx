import { PropsWithChildren } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { render, screen } from '@testing-library/react'
import { TextareaInput } from '../TextareaInput'

const TestWrapper = ({ children }: PropsWithChildren) => {
  const methods = useForm()
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe('TextareaInput', () => {
  it('renders correctly', () => {
    render(
      <TestWrapper>
        <TextareaInput name="test" label="Test Textarea" rows={3} />
      </TestWrapper>,
    )
    expect(screen.getByLabelText('Test Textarea')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '3')
  })

  it('displays error message', () => {
    render(
      <TestWrapper>
        <TextareaInput
          name="test"
          label="Test Textarea"
          error="This is an error"
        />
      </TestWrapper>,
    )
    expect(screen.getByText('This is an error')).toBeInTheDocument()
  })
})
