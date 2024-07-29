'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface SearchFormProps {
  redirectTo: string
}

function SearchForm({ redirectTo }: SearchFormProps) {
  const router = useRouter()
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push(redirectTo)
  }

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <p className="text-center mb-4">모임 링크를 입력해주세요.</p>
      <input
        type="text"
        placeholder="input"
        className="w-full p-3 border border-gray-300 rounded-md mb-4"
      />
      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-md relative"
      >
        검색하기
      </button>
    </form>
  )
}

export default SearchForm
