import { FC } from 'react'
import { MessageDetails } from './MessageDetails'
import { Figure } from './Figure'
import { Topic } from '../model/types'

interface MessageProps {
  topic: Topic
}

export const Message: FC<MessageProps> = ({ topic }) => {
  return (
    <>
      <div className="mb-12 lg:mb-16">
        <h1 className="mb-4">{topic.title}</h1>
        <MessageDetails date={topic.date} author={topic.author} />
      </div>
      <div className="grid gap-6">
        <div dangerouslySetInnerHTML={{ __html: topic.content }} />

        {topic.image && <Figure image={topic.image} />}
      </div>
    </>
  )
}
