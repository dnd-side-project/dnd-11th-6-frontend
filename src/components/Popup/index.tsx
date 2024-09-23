import { Button } from '@/components/Button'
import CloseSvg from 'public/icons/CloseSvg'

export interface PopupProps {
  title: React.ReactNode
  onConfirm: () => void
  onCancel: () => void
  onClose?: () => void
  confirmText?: string
  cancelText?: string
  isOpen: boolean
  hasCloseButton?: boolean
  closeColor?: string
}

function Popup({
  title,
  onConfirm,
  onCancel,
  onClose,
  confirmText = '확인',
  cancelText = '취소',
  isOpen,
  hasCloseButton = false,
  closeColor = '#4E5256',
}: PopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-2xl w-[80%] max-w-sm">
        {hasCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-[-36px] right-2"
            aria-label="Close"
          >
            <CloseSvg fillColor={closeColor} size={24} />
          </button>
        )}

        <div className="p-5">
          <p className="text-center text-lg text-gray-700 font-medium mb-6">
            {title}
          </p>
          <div
            className={`flex ${cancelText !== '' && confirmText !== '' && 'space-x-2'} `}
          >
            {cancelText && (
              <Button variant="light" fullWidth onClick={onCancel}>
                {cancelText}
              </Button>
            )}
            {confirmText && (
              <Button
                variant="primary"
                fullWidth
                onClick={onConfirm}
                className="text-white"
              >
                {confirmText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup
