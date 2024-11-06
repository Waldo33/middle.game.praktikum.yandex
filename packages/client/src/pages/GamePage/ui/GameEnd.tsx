import s from './GamePage.module.scss'
import { FC } from 'react'
import { Button } from '@shared/components/ui/button'
import { Menu } from '@widgets/menu/Menu'
import { useSelector } from 'react-redux'
import { selectUser } from '@shared/model/selectors'
import { ROUTES } from '@shared/config/routes'

type GameEndProps = {
  score: number
  bestScore: number
  onClick: () => void
}

export const GameEnd: FC<GameEndProps> = ({ score, bestScore, onClick }) => {
  const user = useSelector(selectUser),
    login = user?.login

  return (
    <>
      <h1>подводим итоги</h1>
      <div className={s['container']}>
        <div className={s['cell']}>
          <div className={s['box']}>
            <div className={s['subtitle']}>
              так держать,
              <div className={s['name']}>{login}!</div>
            </div>
            <div className={s['total']}>
              <div className={s['cell']}>
                а твой лучший
                <br />
                результат:
              </div>
              <div className={s['cell']}>{bestScore}</div>
            </div>
          </div>
          <div className={s['repeat']}>
            <Button onClick={onClick}>играть еще раз →</Button>
          </div>
          <Menu
            links={[
              { url: ROUTES.PROFILE, label: 'профиль' },
              { url: ROUTES.LEADERBOARD, label: 'лидерборд' },
              { url: ROUTES.FORUM, label: 'форум' },
            ]}
          />
        </div>
        <div className={s['final']}>
          <div className={s['num']}>{score}</div>
          твой счет
        </div>
      </div>
    </>
  )
}
