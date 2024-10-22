import { FC } from 'react'
import { Image } from '../types'

interface FigureProps {
  image: Image
}

export const Figure: FC<FigureProps> = ({ image }) => {
  return (
    <figure className="max-w-[350px]">
      <img src={image.url} alt={image.name} className="rounded" />
      <figcaption className="text-xs text-gray-500 mt-1">
        {image.name}
      </figcaption>
    </figure>
  )
}
