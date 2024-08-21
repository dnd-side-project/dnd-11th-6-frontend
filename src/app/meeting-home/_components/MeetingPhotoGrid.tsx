import React from 'react'
import Image from 'next/image'

const MeetingPhotoGrid = () => (
  <div className="grid grid-cols-2 gap-2 p-4">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="aspect-square relative">
        <Image
          src={`/placeholder-image-${index + 1}.jpg`}
          alt={`Photo ${index + 1}`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    ))}
  </div>
)
export default MeetingPhotoGrid
