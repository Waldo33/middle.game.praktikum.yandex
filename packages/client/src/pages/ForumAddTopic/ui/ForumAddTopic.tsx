import { FC } from 'react'
import { ForumForm } from './ForumForm'
import { ROUTES } from '@shared/config/routes'
import { Menu } from '@widgets/menu/Menu'

export const ForumAddTopic: FC = () => {
  return (
    <main>
      <Menu
        links={[
          { url: ROUTES.INDEX, label: 'на главную' },
          { url: ROUTES.PROFILE, label: 'профиль' },
          { url: ROUTES.LEADERBOARD, label: 'лидерборд' },
          { url: ROUTES.GAME, label: 'играть' },
          { url: ROUTES.FORUM, label: 'форум' },
        ]}
      />
      <h1>новый топик</h1>
      <ForumForm />
    </main>
  )
}
