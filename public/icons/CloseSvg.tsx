interface CloseIconProps {
  fillColor?: string
  size?: number
}

function CloseSvg({ fillColor = '#4E5256', size = 24 }: CloseIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 4L4 20"
        stroke={fillColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 20L4 4"
        stroke={fillColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default CloseSvg
