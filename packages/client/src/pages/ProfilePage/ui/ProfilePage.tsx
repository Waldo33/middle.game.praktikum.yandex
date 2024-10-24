import { FC } from 'react'
import './ProfilePage.scss'
import { ProfileData } from './ProfileData'
import { ProfilePassword } from './ProfilePassword'

export const ProfilePage: FC = () => {
  return (
    <div className="profile">
      <ProfileData />
      <ProfilePassword />
    </div>
  )
}
