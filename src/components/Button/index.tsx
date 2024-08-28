import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import cn from '@/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl transition-all duration-150 ease-in-out',
  {
    variants: {
      variant: {
        primary: 'bg-gray-900 text-white',
        light: 'bg-gray-100 text-gray-900',
        outline: 'bg-white border border-gray-500 text-gray-900',
      },
      size: {
        sm: 'text-sm py-2 px-4',
        md: 'text-base py-3 px-6',
        lg: 'text-lg py-4 px-8',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, fullWidth, children, disabled, ...props },
    ref,
  ) => (
    <button
      className={cn(
        buttonVariants({ variant, size, fullWidth }),
        disabled && 'opacity-30 cursor-not-allowed',
        !disabled && 'transform active:scale-95',
        className,
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  ),
)

Button.displayName = 'Button'
