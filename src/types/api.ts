export interface ApiResponse<T = null> {
  status: number
  data: T
}

export interface ApiError {
  status: number
  data: null
  error: {
    code: string
    message: string
  }
}
