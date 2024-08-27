import Image, { ImageProps } from 'next/image'

const NextImage = ({ src, alt, ...props }: ImageProps) => (
  <Image src={src as string} alt={alt} {...props} />
)

export default NextImage
