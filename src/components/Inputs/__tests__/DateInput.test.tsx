import { PropsWithChildren } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { render, screen } from '@testing-library/react'
import { DateInput } from '../DateInput'

const TestWrapper = ({ children }: PropsWithChildren) => {
  const methods = useForm()
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe('DateInput', () => {
  it('renders correctly', () => {
    render(
      <TestWrapper>
        <DateInput name="test" label="Test Date" />
      </TestWrapper>,
    )
    expect(screen.getByLabelText('Test Date')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'date')
  })

  it('displays error message', () => {
    render(
      <TestWrapper>
        <DateInput name="test" label="Test Date" error="This is an error" />
      </TestWrapper>,
    )
    expect(screen.getByText('This is an error')).toBeInTheDocument()
  })
})
