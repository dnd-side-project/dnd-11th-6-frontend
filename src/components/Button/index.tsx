import React from 'react'

type ButtonVariant = 'primary' | 'light' | 'outline'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariant
  fullWidth?: boolean
  width?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gray-900 text-white text-lg ',
  light: 'bg-gray-100 border border-gray-300 text-gray-900 text-lg ',
  outline: 'bg-white border border-gray-700 text-gray-900 text-lg',
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  fullWidth = false,
  width,
  disabled = false,
  type = 'button',
  ...props
}: ButtonProps) {
  const widthStyle = width ? { width } : fullWidth ? { width: '100%' } : {}
  const animationClass = disabled
    ? ''
    : 'transform transition-transform duration-150 active:scale-95'

  return (
    <button
      type={type}
      className={`
        inline-flex py-[14px] px-[34px] items-center justify-center  rounded-xl
        transition duration-150 ease-in-out
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-30 cursor-not-allowed' : animationClass}
        ${className}
      `}
      style={widthStyle}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
