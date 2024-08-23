import Image from 'next/image'

interface FeatureItemProps {
  icon: string
  title: string
  subTitle: string
  description: string
  subDescription: string
}

function FeatureItem({
  icon,
  title,
  subTitle,
  description,
  subDescription,
}: FeatureItemProps) {
  return (
    <div>
      <Image
        src={icon}
        alt="Feature Icon"
        width={60}
        height={60}
        className="mb-4"
      />
      <h2 className="text-xl font-bold  ">{title}</h2>
      <h2 className="text-xl font-bold mb-2 ">{subTitle}</h2>
      <p className=" text-sm text-gray-400 ">{description}</p>
      <p className=" text-sm text-gray-400 ">{subDescription}</p>
    </div>
  )
}

export default FeatureItem
