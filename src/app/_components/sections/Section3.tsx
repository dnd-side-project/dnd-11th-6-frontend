import Image from 'next/image'

function Section3() {
  return (
    <section className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white snap-start">
      <div className="w-full px-4 text-left opacity-0 transform translate-y-4 transition duration-1000 ease-in-out animate-fadeIn">
        <h2 className="text-sm font-medium mb-2 text-yellow-400">모임앨범</h2>
        <p className="text-[22px] font-bold line leading-[30px] mb-[6px]">
          우리 모임만의
          <br />
          프라이빗한 앨범을 만들 수 있어요
        </p>
        <p className="text-sm text-gray-400">자유롭게 사진을 찍고 공유해요</p>
      </div>
      <Image src="/image2.svg" alt="Flags Icon" width={400} height={400} />
    </section>
  )
}

export default Section3
