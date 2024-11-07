import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const meetingId = searchParams.get('meetingId')

  if (!meetingId) {
    return NextResponse.json(
      { error: 'Meeting ID is required' },
      { status: 400 },
    )
  }

  const cookieStore = cookies()
  const accessToken = cookieStore.get(`ACCESS_TOKEN_${meetingId}`)
  const refreshToken = cookieStore.get(`REFRESH_TOKEN_${meetingId}`)

  const hasTokens = !!(accessToken && refreshToken)

  return NextResponse.json({
    hasTokens,
    tokenStatus: {
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
    },
  })
}
