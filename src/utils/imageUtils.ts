function downloadPhoto(photo: string) {
  const link = document.createElement('a')
  link.href = photo
  link.download = `photo_${new Date().getTime()}.png`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default downloadPhoto
