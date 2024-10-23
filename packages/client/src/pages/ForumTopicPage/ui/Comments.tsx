import { FC } from 'react'
import { MessageDetails } from './MessageDetails'
import { CommentsList } from '../model/types'
import { Card, CardContent, CardHeader } from '@shared/components/ui/card'
import { Figure } from './Figure'

export const Comments: FC<CommentsList> = ({ list }) => {
  return (
    <div className="mt-12 lg:mt-16">
      <h3 className="bg-primary rounded-lg px-4 pt-2 pb-3">
        комментарии <span className="text-white">{list.length}</span>
      </h3>
      <div className="grid gap-4">
        {list.map(item => (
          <Card key={item.id}>
            <CardHeader>
              <MessageDetails date={item.date} author={item.author} comment />
            </CardHeader>
            <CardContent className="grid gap-4">
              <div dangerouslySetInnerHTML={{ __html: item.message }} />
              {item.image && <Figure image={item.image} />}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
