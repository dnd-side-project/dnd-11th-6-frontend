'use client'

import React from 'react'
import Link from 'next/link'
import RenderStep1 from './_components/RenderStep1'
import RenderStep2 from './_components/RenderStep2'
import useMeetingForm from './_hooks/useMeetingFom'

function CreateMeetingPage() {
  const { form, step, onSubmit } = useMeetingForm()

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <Link href="/" className="text-2xl">
          &lt;
        </Link>
        <h1 className="text-xl font-bold ml-4">
          {step === 1 ? '모임 정보 입력하기' : '모임 테마'}
        </h1>
      </div>
      {step === 1 ? (
        <RenderStep1 form={form} onSubmit={onSubmit} />
      ) : (
        <RenderStep2 form={form} onSubmit={onSubmit} />
      )}
    </div>
  )
}

export default CreateMeetingPage
