async function base64ToFile(
  base64String: string,
  filename: string,
): Promise<File> {
  const [, data] = base64String.split(',')
  const mimeString = base64String.split(',')[0].split(':')[1].split(';')[0]

  const byteCharacters = atob(data)
  const byteArrays = []
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512)
    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i += 1) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }
  const blob = new Blob(byteArrays, { type: mimeString })

  const img = await createImageBitmap(blob)

  const size = Math.min(img.width, img.height)
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Could not get 2D context')

  ctx.drawImage(
    img,
    (img.width - size) / 2,
    (img.height - size) / 2,
    size,
    size,
    0,
    0,
    size,
    size,
  )

  const croppedBlob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((newBlob) => {
      if (newBlob) resolve(newBlob)
    }, mimeString)
  })

  return new File([croppedBlob], filename, { type: mimeString })
}

export default base64ToFile
