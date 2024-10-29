import { FC } from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shared/components/ui/avatar'
import s from './avatar.module.scss'
import { AvatarWidgetProps } from './types'

export const AvatarWidget: FC<AvatarWidgetProps> = ({ login, avatar }) => {
  const getFullAvatarUrl = (url: string | undefined) =>
    `${import.meta.env.VITE_RESOURSES_URL}${url}`

  return (
    <Avatar className={s.avatar}>
      <AvatarImage src={getFullAvatarUrl(avatar)} />
      <AvatarFallback className={s.avatar__fallback}>
        {login.charAt(0)}
      </AvatarFallback>
    </Avatar>
  )
}
