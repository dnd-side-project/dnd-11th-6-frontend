export interface ToggleSwitchProps {
  leftOption: string
  rightOption: string
  value: boolean
  onChange: (value: boolean) => void
  width?: string
  activeColor?: string
  inactiveColor?: string
  activeTextColor?: string
  inactiveTextColor?: string
  LeftIcon?: React.ComponentType<{ isActive: boolean }>
  RightIcon?: React.ComponentType<{ isActive: boolean }>
}

export const ToggleSwitch = ({
  leftOption,
  rightOption,
  value,
  onChange,
  width = '260px',
  activeColor = 'bg-black',
  inactiveColor = 'bg-gray-200',
  activeTextColor = 'text-white',
  inactiveTextColor = 'text-gray-700',
  LeftIcon,
  RightIcon,
}: ToggleSwitchProps) => {
  const handleLeftClick = () => onChange(false)
  const handleRightClick = () => onChange(true)

  return (
    <div className="flex justify-center mt-6 mb-4">
      <div
        className={`relative ${inactiveColor} rounded-full p-1`}
        style={{ width }}
      >
        <div
          className={`absolute top-[2px] ${
            value ? 'left-[calc(50%+2px)]' : 'left-[2px]'
          } w-[calc(50%-4px)] h-[calc(100%-4px)] ${activeColor} rounded-full transition-all duration-300 z-0`}
        />
        <div className="relative z-10 flex">
          <button
            onClick={handleLeftClick}
            className={`relative z-10 w-1/2 py-2 rounded-full transition-all duration-300 ${
              !value ? activeTextColor : inactiveTextColor
            } flex items-center justify-center`}
          >
            {LeftIcon && <LeftIcon isActive={!value} />}
            <span className="ml-1">{leftOption}</span>
          </button>
          <button
            onClick={handleRightClick}
            className={`relative z-10 w-1/2 py-2 rounded-full transition-all duration-300 ${
              value ? activeTextColor : inactiveTextColor
            } flex items-center justify-center`}
          >
            {' '}
            {RightIcon && <RightIcon isActive={value} />}
            <span className="ml-1">{rightOption}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ToggleSwitch
