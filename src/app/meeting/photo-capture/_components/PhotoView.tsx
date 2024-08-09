import Image from 'next/image'
import Refresh from '@/assets/Refresh.svg'
import Close from '@/assets/close.svg'
import downloadPhoto from '@/utils/imageUtils'

type PhotoViewProps = {
  photo: string
  onRetake: () => void
  goBack: () => void
}

function PhotoView({ photo, onRetake, goBack }: PhotoViewProps) {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex justify-between items-center h-12 w-full">
        <div className="flex-1">{}</div>
        <div className="flex-1 flex justify-center items-center">
          <div>촬영자님의 스냅</div>
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={goBack}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') goBack()
          }}
          className="flex-1 flex justify-end items-center cursor-pointer"
        >
          <Image src={Close} alt="Close Button" className="w-6 h-6" />
        </div>
      </div>
      <div className="h-11 rounded-[14px] px-[18px] py-[10px] bg-[#F2F5F5] mt-6">
        모임에서 가장 뫄뫄한 사람 찍기
      </div>
      <Image
        src={photo}
        alt="찍은 사진"
        className="w-[360px] h-[480px] rounded-[14px] mt-3"
        style={{ objectFit: 'cover' }}
      />
      <div className="text-[#888D91] mt-3">2024.08.06 PM 10:08</div>
      <div className="button-group flex w-full mt-20">
        <button
          type="button"
          onClick={onRetake}
          className="flex justify-center items-center rounded-[14px] border border-black w-20 h-14 mr-3"
        >
          <Image src={Refresh} alt="Retake Button" className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={() => downloadPhoto(photo)}
          className="bg-black text-white rounded-[14px] w-full h-14"
        >
          스냅 업로드하기
        </button>
      </div>
    </div>
  )
}

export default PhotoView
