import { FC } from 'react'
import { Details } from '../model/types'

export const MessageDetails: FC<Details> = ({ date, author, comment }) => {
  return (
    <div
      className={
        comment ? 'font-black italic text-xs' : 'font-black italic text-primary'
      }>
      {new Date(date).toLocaleString('ru-RU')}
      <span className="mx-3">&middot;</span>
      {author}
    </div>
  )
}
