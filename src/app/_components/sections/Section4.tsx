import FeatureItem from '../FeatureItem'

function Section4() {
  return (
    <section className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white snap-start">
      <div className="w-full px-4 text-left flex flex-col gap-8 opacity-0 transform translate-y-4 transition duration-1000 ease-in-out animate-fadeIn">
        <FeatureItem
          icon="./icons/lock-slash.svg"
          title="귀찮은 회원가입 없이"
          subTitle="누구나 간단하게 만들 수 있어요."
          description="모임 링크를 통해 간단하게 참여할 수 있어요."
          subDescription="보안을 위한 모임 암호만 입력하면 끝!"
        />
        <FeatureItem
          icon="./icons/photo.svg"
          title="모임의 순간을"
          subTitle="딱 10장만 찍을 수 있어요!"
          description="예쁜 사진을 위해 많은 시간을 쓰지마세요."
          subDescription="더욱 현장감 있는 사진으로 모임을 추억해보세요!"
        />
        <FeatureItem
          icon="./icons/magic-wand.svg"
          title="재밌게 사진을 찍을 수 있는"
          subTitle="랜덤미션을 제공해요."
          description="낯선 사람과도 어색함 없이"
          subDescription="더욱 재미있는 추억을 남길 수 있을 거예요."
          isLast
        />
      </div>
    </section>
  )
}

export default Section4
