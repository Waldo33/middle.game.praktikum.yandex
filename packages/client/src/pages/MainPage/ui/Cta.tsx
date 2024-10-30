import { FC } from 'react'
import { Card, CardContent, CardHeader } from '@shared/components/ui/card'
import { Button } from '@shared/components/ui/button'
import { Link } from 'react-router-dom'
import { SectionCtaProps } from '@pages/MainPage/types'

export const Cta: FC<SectionCtaProps> = ({ list }) => {
  return (
    <>
      {list.map(({ text, link, linkTitle }) => (
        <Card className="flex flex-col justify-between" key={link}>
          <CardHeader>
            <p>{text}</p>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to={link}>{linkTitle} →</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
