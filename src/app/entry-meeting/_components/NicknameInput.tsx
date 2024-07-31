import { useState } from 'react'
import Image from 'next/image'

interface NicknameInputProps {
  onNicknameSubmit: () => void
}

function NicknameInput({ onNicknameSubmit }: NicknameInputProps) {
  const [isAdminChecked, setIsAdminChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsAdminChecked(!isAdminChecked)
  }

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mb-12">
          <Image src="/favicon.ico" alt="Logo" width={40} height={40} />
        </div>
      </div>

      <div className="flex justify-center mb-16">모임 이름</div>
      <form onSubmit={onNicknameSubmit} className="mb-8">
        <p className="mb-4">사용할 닉네임을 입력해주세요.</p>
        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />
        {isAdminChecked && (
          <>
            <p className="mb-4">관리자 인증키를 입력해주세요.</p>
            <input
              type="password"
              placeholder="관리자 인증키를 입력하세요"
              className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
          </>
        )}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md relative"
        >
          완료
        </button>
        <div className="flex justify-end mt-4">
          <input
            type="checkbox"
            id="admin-checkbox"
            checked={isAdminChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="nickname" className="ml-2">
            관리자 인증을 하시겠어요?
          </label>
        </div>
      </form>
    </div>
  )
}

export default NicknameInput
