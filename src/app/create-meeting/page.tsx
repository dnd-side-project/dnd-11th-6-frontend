'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

const Page = dynamic(() => import('./_components/Page'), {
  ssr: false,
})

function CreateMeetingPage() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  )
}

export default CreateMeetingPage
