import { useMutation } from '@tanstack/react-query'

export default function usePhoto() {
  const uploadMutation = useMutation({
    mutationFn: async (photo: string) => {
      const response = await fetch(photo)
      const blob = await response.blob()

      const formData = new FormData()
      formData.append('photo', blob, 'photo.png')

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      return uploadResponse.json()
    },
    onSuccess: (data) => {
      console.log('Photo uploaded successfully:', data)
    },
    onError: (error) => {
      console.error('Error uploading photo:', error)
    },
  })

  const handleUpload = async (photo: string) => {
    try {
      await uploadMutation.mutateAsync(photo)
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  const handleDownload = (photo: string) => {
    const link = document.createElement('a')
    link.href = photo
    link.download = `photo_${new Date().getTime()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    uploadPhoto: handleUpload,
    downloadPhoto: handleDownload,
    isUploading: uploadMutation.isPending,
    uploadError: uploadMutation.error,
  }
}
