import { FC } from 'react'
import { Button } from '@shared/components/ui/button'
import { Link } from 'react-router-dom'
import s from './Intro.module.scss'
import { cn } from '@shared/lib/utils'
import { Menu } from '@widgets/menu/Menu'
import { ROUTES } from '@shared/config/routes'
import { useSelector } from 'react-redux'
import { selectUser } from '@processes/auth/model/selectors'

export const Intro: FC = () => {
  const user = useSelector(selectUser)
  if (!user) return null
  const firstName = user.first_name

  return (
    <section className={s['intro']}>
      <h2 className={cn(s['title'], 'h1')}>
        <span>привет,</span> {firstName}
      </h2>
      <div className={s['score']}>
        <div className={s['num']}>42</div>
        <div className={s['descr']}>твой счет</div>
      </div>
      <div className={s['btn']}>
        <Button asChild>
          <Link to="/game">играть →</Link>
        </Button>
      </div>
      <Menu
        links={[
          { url: ROUTES.PROFILE, label: 'профиль' },
          { url: ROUTES.LEADERBOARD, label: 'лидерборд' },
          { url: ROUTES.FORUM, label: 'форум' },
        ]}
      />
    </section>
  )
}
