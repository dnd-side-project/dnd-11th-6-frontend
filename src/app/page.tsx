'use client'

import Button from '@/components/Button/Button'
import useStore from '@/state/useStore'

export default function Home() {
  const { count, increment, decrement } = useStore()

  return (
    <div>
      <h1>Count: {count}</h1>
      <Button bgColor="bg-blue-500" onClick={increment}>
        Increment
      </Button>
      <Button bgColor="bg-red-500" onClick={decrement}>
        Decrement
      </Button>
    </div>
  )
}
