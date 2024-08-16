import { forwardRef } from 'react'
import Image from 'next/image'

const Section2 = forwardRef<HTMLElement>((_props, ref) => (
  <section
    ref={ref}
    className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white snap-start"
  >
    <div className="text-left mb-6 px-4 w-full">
      <p className="text-sm font-medium mb-2 text-yellow-400">Snappy는?</p>
      <p className="text-[22px] font-bold line leading-[30px]">
        스냅피는
        <br />
        모임의 시간을 재밌게 즐길 수 있는
        <br />
        사진 앨범 서비스에요
      </p>
    </div>
    <Image src="/image1.svg" alt="Flags Icon" width={800} height={800} />
  </section>
))

Section2.displayName = 'Section2'

export default Section2
