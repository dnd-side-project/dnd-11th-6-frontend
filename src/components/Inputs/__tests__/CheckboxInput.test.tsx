import { PropsWithChildren } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { render, screen } from '@testing-library/react'
import { CheckboxInput } from '../CheckboxInput'

const TestWrapper = ({ children }: PropsWithChildren) => {
  const methods = useForm()
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe('CheckboxInput', () => {
  it('renders correctly', () => {
    render(
      <TestWrapper>
        <CheckboxInput name="test" label="Test Checkbox" />
      </TestWrapper>,
    )
    expect(screen.getByLabelText('Test Checkbox')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })
})
