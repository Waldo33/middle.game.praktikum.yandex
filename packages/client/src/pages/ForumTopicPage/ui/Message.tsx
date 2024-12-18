import { FC } from 'react'
import { MessageDetails } from './MessageDetails'
import { Topic } from '../model/types'
import { Card, CardContent, CardHeader } from '@shared/components/ui/card'

interface MessageProps {
  topic: Topic
}

export const Message: FC<MessageProps> = ({ topic }) => {
  return (
    <>
      <div className="my-12">
        <h1 className="mb-4">{topic.title}</h1>
        <MessageDetails date={topic.createdAt} author={topic.author} />
      </div>
      <div className="grid gap-6">{topic.content}</div>
      <div className="mt-12 lg:mt-16">
        <h3 className="bg-primary rounded-lg px-4 pt-2 pb-3">
          комментарии{' '}
          <span className="text-white">{topic.comments.length}</span>
        </h3>
        <div className="grid gap-4">
          {topic.comments.map(item => (
            <Card key={item.id}>
              <CardHeader>
                <MessageDetails
                  date={item.updatedAt}
                  author={item.author}
                  comment
                />
              </CardHeader>
              <CardContent className="grid gap-4">{item.content}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
