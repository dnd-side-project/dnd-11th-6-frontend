interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  width?: string
  height?: string
  bgColor?: string
  borderColor?: string
  textColor?: string
  fontSize?: string
  type?: 'button' | 'submit' | 'reset'
}

function Button({
  children,
  className = '',
  width = 'w-auto',
  height = 'h-auto',
  bgColor = 'bg-white',
  borderColor = 'border-white',
  textColor = 'text-black',
  fontSize = 'text-base',
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`cursor-pointer inline-flex justify-center items-center ${width} ${height} ${bgColor} border ${borderColor} rounded ${textColor} ${fontSize} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  className: '',
  width: 'w-auto',
  height: 'h-auto',
  bgColor: 'bg-white',
  borderColor: 'border-white',
  textColor: 'text-black',
  fontSize: 'text-base',
  type: 'button',
}

export default Button
