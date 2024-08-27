import { PropsWithChildren } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { render, screen } from '@testing-library/react'
import { TextInput } from '../TextInput'

const TestWrapper = ({ children }: PropsWithChildren) => {
  const methods = useForm()
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe('TextInput', () => {
  it('renders correctly', () => {
    render(
      <TestWrapper>
        <TextInput name="test" label="Test Input" placeholder="Enter text" />
      </TestWrapper>,
    )
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('displays error message', () => {
    render(
      <TestWrapper>
        <TextInput name="test" label="Test Input" error="This is an error" />
      </TestWrapper>,
    )
    expect(screen.getByText('This is an error')).toBeInTheDocument()
  })

  it('displays success message', () => {
    render(
      <TestWrapper>
        <TextInput
          name="test"
          label="Test Input"
          success
          successMessage="Success!"
        />
      </TestWrapper>,
    )
    expect(screen.getByText('Success!')).toBeInTheDocument()
  })

  it('displays checking message', () => {
    render(
      <TestWrapper>
        <TextInput
          name="test"
          label="Test Input"
          checking
          checkingMessage="Checking..."
        />
      </TestWrapper>,
    )
    expect(screen.getByText('Checking...')).toBeInTheDocument()
  })
})
