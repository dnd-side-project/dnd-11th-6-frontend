function getUserErrorMessage(error: any): string {
  if (error.status === 400) {
    return '올바르지 않은 정보입니다.'
  }
  if (error.status === 401) {
    return '다시 로그인해주세요.'
  }
  if (error.status === 403) {
    return '권한이 없습니다.'
  }
  if (error.status === 404) {
    return '정보를 찾을 수 없습니다.'
  }
  if (error.status === 500) {
    return '서버 오류. 다시 시도해주세요.'
  }

  return '오류 발생. 다시 시도해주세요.'
}

export default getUserErrorMessage
