import { FC } from 'react'
import s from './ProfilePage.module.scss'
import { ProfileData } from './ProfileData'
import { ProfilePassword } from './ProfilePassword'
import { Menu } from '@widgets/menu/Menu'
import { ROUTES } from '@shared/config/routes'

export const ProfilePage: FC = () => {
  return (
    <div className={s.profile}>
      <Menu
        center
        links={[
          { url: ROUTES.INDEX, label: 'на главную' },
          { url: ROUTES.PROFILE, label: 'профиль' },
          { url: ROUTES.LEADERBOARD, label: 'лидерборд' },
          { url: ROUTES.FORUM, label: 'форум' },
        ]}
      />
      <ProfileData />
      <ProfilePassword />
    </div>
  )
}
