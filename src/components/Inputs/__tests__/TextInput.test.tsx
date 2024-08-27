// src/components/Inputs/__tests__/TextInput.test.tsx
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { render, screen, fireEvent } from '@testing-library/react'
// import Image from 'next/image'
import { TextInput } from '../TextInput'

// jest.mock('next/image', () => ({
//   __esModule: true,
//   default: (props: any) => <Image {...props} />,
// }))

const TestWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
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
    expect(screen.getByAltText('Check')).toBeInTheDocument()
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
    expect(screen.getByAltText('Meatballs')).toBeInTheDocument()
  })

  it('renders password input correctly', () => {
    render(
      <TestWrapper>
        <TextInput name="password" label="Password" type="password" />
      </TestWrapper>,
    )
    const input = screen.getByLabelText('Password') as HTMLInputElement
    expect(input).toBeInTheDocument()
    expect(input.type).toBe('password')

    const toggleButton = screen.getByAltText('Show password')
    expect(toggleButton).toBeInTheDocument()

    fireEvent.click(toggleButton)
    expect(input.type).toBe('text')
    expect(screen.getByAltText('Hide password')).toBeInTheDocument()

    fireEvent.click(toggleButton)
    expect(input.type).toBe('password')
    expect(screen.getByAltText('Show password')).toBeInTheDocument()
  })
})
