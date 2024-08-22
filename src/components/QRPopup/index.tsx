import Image from 'next/image'
import Close from 'public/icons/close.svg'

type QRPopupProps = {
  qrData: string
  meetingName: string
  themeColor?: string
  onClose: () => void
}

export function QRPopup({
  qrData,
  meetingName,
  themeColor,
  onClose,
}: QRPopupProps) {
  const themeColorClass = themeColor ? `bg-${themeColor}` : 'bg-point-mint'
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg">
      <div className="relative bg-white rounded-[14px] p-8 w-4/5 max-w-sm">
        <button
          onClick={onClose}
          className="absolute top-[-36px] right-2 text-gray-500 hover:text-gray-700"
        >
          <Image src={Close} alt="close" />
        </button>
        <div className="flex flex-col items-center">
          <div className="w-3/4 h-3/4 bg-gray-200 flex items-center justify-center mb-4">
            {/* QR 코드 */}
            <span className="text-gray-500">QR Code</span>
          </div>
          <div
            className={`text-center text-white text-heading1-semibold ${themeColorClass} px-5 py-[6px] rounded-full`}
          >
            {meetingName}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRPopup
