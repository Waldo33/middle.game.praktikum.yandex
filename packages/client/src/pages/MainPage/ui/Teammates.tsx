import { FC } from 'react'
import { Card, CardContent, CardHeader } from '@shared/components/ui/card'
import { SectionTeamProps } from '@pages/MainPage/types'

export const Teammates: FC<SectionTeamProps> = ({ list }) => {
  return (
    <>
      {list.map(({ name, about, imageAlt, imageSrc }) => (
        <Card className="team__item" key={name}>
          <CardHeader>
            <div className="team__item_img">
              {imageSrc ? <img src={imageSrc} alt={imageAlt} /> : imageAlt}
            </div>
          </CardHeader>
          <CardContent>
            <p className="team__item_title">{name}</p>
            <p className="team__item_descr">{about}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
