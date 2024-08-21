import QRCode from 'qrcode'

const generateQRCode = async (url: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(url)
  } catch (error) {
    console.error('Failed to generate QR code:', error)
    return ''
  }
}

export default generateQRCode
