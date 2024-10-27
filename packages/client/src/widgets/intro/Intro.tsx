import { FC } from 'react'
import { Button } from '@shared/components/ui/button'
import { Link } from 'react-router-dom'
import { Menu } from '@widgets/menu/Menu'
import s from './Intro.module.scss'
import { ROUTES } from '@shared/config/routes'

export const Intro: FC = () => {
  return (
    <section className={s['intro']}>
      <h1 className={s['intro__title']}>
        <span>привет,</span> username
      </h1>
      <div className={s['intro__score']}>
        <div className={s['intro__score_num']}>42</div>
        <div className={s['intro__score_descr']}>твой счет</div>
      </div>
      <div className={s['intro__btn']}>
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
