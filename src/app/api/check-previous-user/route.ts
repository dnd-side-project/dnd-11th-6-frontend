import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const meetingId = searchParams.get('meetingId')

  const cookieStore = cookies()
  const accessToken = cookieStore.get(`ACCESS_TOKEN_${meetingId}`)
  const refreshToken = cookieStore.get(`REFRESH_TOKEN_${meetingId}`)

  const isPreviousUser = accessToken && refreshToken

  return NextResponse.json({ isPreviousUser })
}
