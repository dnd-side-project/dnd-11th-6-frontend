import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '.'

describe('Button', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  test('applies correct classes for primary variant', () => {
    render(<Button variant="primary">Primary</Button>)
    const button = screen.getByText('Primary')
    expect(button).toHaveClass('bg-gray-900')
    expect(button).toHaveClass('text-white')
  })

  test('applies correct classes for light variant', () => {
    render(<Button variant="light">Light</Button>)
    const button = screen.getByText('Light')
    expect(button).toHaveClass('bg-gray-100')
    expect(button).toHaveClass('text-gray-900')
  })

  test('applies correct classes for outline variant', () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByText('Outline')
    expect(button).toHaveClass('bg-white')
    expect(button).toHaveClass('border-gray-500')
    expect(button).toHaveClass('text-gray-900')
  })

  test('applies correct classes for different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    expect(screen.getByText('Small')).toHaveClass('text-sm')

    rerender(<Button size="md">Medium</Button>)
    expect(screen.getByText('Medium')).toHaveClass('text-base')

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByText('Large')).toHaveClass('text-lg')
  })

  test('applies full width class when fullWidth prop is true', () => {
    render(<Button fullWidth>Full Width</Button>)
    expect(screen.getByText('Full Width')).toHaveClass('w-full')
  })

  test('disables button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByText('Disabled')).toBeDisabled()
    expect(screen.getByText('Disabled')).toHaveClass('opacity-30')
    expect(screen.getByText('Disabled')).toHaveClass('cursor-not-allowed')
  })

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('does not call onClick handler when disabled', () => {
    const handleClick = jest.fn()
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>,
    )
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
