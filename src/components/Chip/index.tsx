import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import Image, { StaticImageData } from 'next/image'
import cn from '@/utils/cn'

const chipVariants = cva(
  'px-3 py-[6px] flex justify-center items-center rounded-full text-sm font-medium transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'bg-white text-gray-800 hover:bg-gray-300',
        active: 'bg-[#00C4DF1A] text-[#12C7E0] border border-[#12C7E0]',
      },
      size: {
        sm: 'text-xs py-1 px-2',
        md: 'text-sm py-[6px] px-3',
        lg: 'text-base py-2 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  label: string
  chipImage?: string | StaticImageData
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, variant, size, label, chipImage, ...props }, ref) => (
    <button
      className={cn(chipVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      <span>{label}</span>
      {chipImage && (
        <Image
          className="ml-1"
          src={chipImage}
          alt={`${label} icon`}
          width={16}
          height={16}
        />
      )}
    </button>
  ),
)

Chip.displayName = 'Chip'

export default Chip
