import Image from 'next/image'

interface PasswordInputProps {
  onPasswordSubmit: () => void
}

function PasswordInput({ onPasswordSubmit }: PasswordInputProps) {
  return (
    <div className="w-full">
      <div className="flex justify-center">
        {' '}
        <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mb-12">
          <Image src="/favicon.ico" alt="Logo" width={40} height={40} />
        </div>
      </div>

      <div className="flex justify-center mb-16">모임 이름</div>
      <form onSubmit={onPasswordSubmit} className="mb-8">
        <p className="mb-4">모임의 암호를 입력하세요.</p>
        <input
          type="password"
          placeholder="암호를 입력하세요"
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md relative"
        >
          입력하기
        </button>
      </form>
    </div>
  )
}

export default PasswordInput
