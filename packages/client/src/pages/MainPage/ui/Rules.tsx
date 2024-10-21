import { FC } from 'react'
import { Card, CardContent, CardHeader } from '@shared/components/ui/card'
import { SectionRulesProps } from '@pages/MainPage/types'

export const Rules: FC<SectionRulesProps> = ({ list }) => {
  return (
    <>
      {list.map(({ imageSrc, imageAlt, text }, index) => (
        <Card className="rules__item" key={index}>
          <CardHeader className="text-center pt-8">
            <img src={imageSrc} alt={imageAlt} className="rules__item_img" />
          </CardHeader>
          <CardContent className="text-center pb-8">
            <p>{text}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
