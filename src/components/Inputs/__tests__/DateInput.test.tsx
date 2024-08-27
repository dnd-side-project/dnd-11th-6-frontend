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
    const dateInput = screen.getByLabelText('Test Date')
    expect(dateInput).toBeInTheDocument()
    expect(dateInput).toHaveAttribute('type', 'date')
  })

  it('displays error message', () => {
    render(
      <TestWrapper>
        <DateInput name="test" label="Test Date" error="This is an error" />
      </TestWrapper>,
    )
    expect(screen.getByText('This is an error')).toBeInTheDocument()
  })

  it('applies min and max attributes', () => {
    render(
      <TestWrapper>
        <DateInput
          name="test"
          label="Test Date"
          min="2023-01-01"
          max="2023-12-31"
        />
      </TestWrapper>,
    )
    const dateInput = screen.getByLabelText('Test Date')
    expect(dateInput).toHaveAttribute('min', '2023-01-01')
    expect(dateInput).toHaveAttribute('max', '2023-12-31')
  })
})
