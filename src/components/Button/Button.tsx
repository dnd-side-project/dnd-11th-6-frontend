interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  width?: string
  height?: string
  bgColor?: string
  borderColor?: string
  textColor?: string
  fontSize?: string
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
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`cursor-pointer inline-flex justify-center items-center ${width} ${height} ${bgColor} border ${borderColor} rounded ${textColor} ${fontSize} ${className}`}
      disabled={disabled}
      onClick={onClick}
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
}

export default Button
