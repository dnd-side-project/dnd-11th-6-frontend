const formatCaptureTime = (date: Date | null): string => {
  if (date === null) {
    return ''
  }
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const formattedHours = hours % 12 || 12

  return `${year}.${month}.${day} ${ampm} ${String(formattedHours).padStart(2, '0')}:${minutes}`
}

export default formatCaptureTime
