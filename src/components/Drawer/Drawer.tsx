export interface DrawerProps {
  isVisible: boolean
  onClose: () => void
  children: React.ReactNode
}

function Drawer({ isVisible, onClose, children }: DrawerProps) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-white z-50 transition-transform duration-500 ${
        isVisible ? 'transform translate-x-0' : 'transform -translate-x-full'
      }`}
    >
      <button
        type="button"
        className="absolute top-5 right-5"
        onClick={onClose}
      >
        X
      </button>
      <div className="p-5">{children}</div>
    </div>
  )
}

export default Drawer
