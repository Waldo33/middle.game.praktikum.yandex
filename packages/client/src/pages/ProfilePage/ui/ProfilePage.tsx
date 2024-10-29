import { FC } from 'react'
import s from './ProfilePage.module.scss'
import { ProfileData } from './ProfileData'
import { ProfilePassword } from './ProfilePassword'

export const ProfilePage: FC = () => {
  return (
    <div className={s.profile}>
      <ProfileData />
      <ProfilePassword />
    </div>
  )
}
