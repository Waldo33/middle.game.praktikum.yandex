import { FC } from 'react'
import { Card, CardContent, CardHeader } from '@shared/components/ui/card'
import s from './Rules.module.scss'
import RulesImg1 from './assets/rules-img-1.svg'
import RulesImg2 from './assets/rules-img-2.svg'
import RulesImg3 from './assets/rules-img-3.svg'

const rules: Rule[] = [
  {
    imageSrc: RulesImg1,
    imageAlt: 'начало игры',
    text: 'после старта таймера начни открывать пары карточек на игровом поле',
  },
  {
    imageSrc: RulesImg2,
    imageAlt: 'процесс игры',
    text: 'если изображения на карточках совпадают, они остаются открытыми',
  },
  {
    imageSrc: RulesImg3,
    imageAlt: 'конец игры',
    text: 'успей открыть все пары карточек до окончания таймера',
  },
]

type Rule = {
  imageSrc: string
  imageAlt: string
  text: string
}

export const Rules: FC = () => {
  return (
    <>
      {rules.map(({ imageSrc, imageAlt, text }, index) => (
        <Card className={s['riles__item']} key={index}>
          <CardHeader className="text-center pt-8">
            <img
              src={imageSrc}
              alt={imageAlt}
              className={s['rules__item_img']}
            />
          </CardHeader>
          <CardContent className="text-center pb-8">
            <p>{text}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
