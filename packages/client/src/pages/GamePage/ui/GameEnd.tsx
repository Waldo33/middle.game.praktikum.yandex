import s from './GamePage.module.scss'
import { FC } from 'react'
import { Button } from '@shared/components/ui/button'
import { Menu } from '@widgets/menu/Menu'
import { useSelector } from 'react-redux'
import { selectUser } from '@processes/auth/model/selectors'
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
      <div className={s['gamepage__container']}>
        <div className={s['gamepage__cell']}>
          <div className={s['gamepage__box']}>
            <div className={s['gamepage__subtitle']}>
              так держать,
              <div className={s['gamepage__name']}>{login}!</div>
            </div>
            <div className={s['gamepage__total']}>
              <div className={s['gamepage__total_cell']}>
                а твой лучший
                <br />
                результат:
              </div>
              <div className={s['gamepage__total_cell']}>{bestScore}</div>
            </div>
          </div>
          <div className={s['gamepage__repeat']}>
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
        <div className={s['gamepage__final']}>
          <div className={s['gamepage__final_num']}>{score}</div>
          твой счет
        </div>
      </div>
    </>
  )
}
