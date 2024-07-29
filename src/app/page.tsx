import Image from 'next/image'
import Link from 'next/link'
import SearchForm from '@/components/Form/Search/SearchForm'

function Home() {
  return (
    <>
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mb-2">
          <Image src="/favicon.ico" alt="Logo" width={40} height={40} />
        </div>
      </div>

      <SearchForm redirectTo="/meeting-entry" />

      <div className="text-center">
        <p className="mb-4">직접 모임을 만들어보시겠어요?</p>
        <Link
          href="/create-album"
          className="inline-block w-full py-3 bg-gray-200 text-gray-700 rounded-md text-center"
        >
          모임 앨범 만들기 &gt;
        </Link>
      </div>
    </>
  )
}

export default Home
