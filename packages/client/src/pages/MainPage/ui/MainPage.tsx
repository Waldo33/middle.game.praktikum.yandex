import './MainPage.scss'

import { Route, Teammate } from '@pages/MainPage/types'
import { Teammates } from '@pages/MainPage/ui/Teammates'
import { Button } from '@shared/components/ui/button'
import { ROUTES } from '@shared/config/routes'
import { useNotifications } from '@shared/hooks/useNotifications'
import { Intro } from '@widgets/intro/Intro'
import { Rules } from '@widgets/rules/Rules'
import { FC, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Cta } from './Cta'

const innerRoutes: Route[] = [
  {
    text: 'это твой профиль. новая аватарка каждый день? 🎉  да!',
    link: ROUTES.PROFILE,
    linkTitle: 'профиль',
  },
  {
    text: 'а тут наши чемпионы 🏆 нет ли тут тебя?',
    link: ROUTES.LEADERBOARD,
    linkTitle: 'лидерборд',
  },
  {
    text: 'есть вопросы? задай их на форуме 🔮   или помогай другим!',
    link: ROUTES.FORUM,
    linkTitle: 'форум',
  },
]

const teammates: Teammate[] = [
  {
    name: 'Николай Галицкий',
    about: 'тим-лид, пишет код',
    imageAlt: '🤓',
    imageSrc: '',
  },
  {
    name: 'Мария Углова',
    about: 'пишет код, изучает react',
    imageAlt: '🤓',
    imageSrc: '',
  },
  {
    name: 'Анна Хлыстова',
    about: 'пишет код, изучает react',
    imageAlt: '🤓',
    imageSrc: '',
  },
  {
    name: 'Евгений Церковников',
    about: 'пишет код, изучает бэкенд',
    imageAlt: '🤓',
    imageSrc: '',
  },
]

export const MainPage: FC = () => {
  const { requestPermission, showNotification } = useNotifications()

  const location = useLocation()
  const from = location.state?.from || sessionStorage.getItem('from')

  useEffect(() => {
    const checkPermission = async () => {
      const result = await requestPermission()
      if (result === 'granted') {
        if (from === 'game') {
          showNotification('Neuronauts', {
            body: 'У нас появился режим игры с ботом',
          })
        } else if (from === 'signup') {
          showNotification('Neuronauts', { body: 'Добро пожаловать' })
        } else if (from === 'signin') {
          showNotification('Neuronauts', { body: 'С возвращением' })
        }
      }
    }

    checkPermission()
  }, [requestPermission, showNotification])

  return (
    <main className="index-wrapper">
      <Intro />

      <section id="rules" className="section rules">
        <h2 className="section__title">как играть</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Rules />
        </div>
      </section>

      <section className="section cta">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Cta list={innerRoutes} />
        </div>
      </section>

      <section id="why" className="section why">
        <h3 className="section__title text-primary">зачем играть</h3>
        <div className="why__descr">
          <p className="h5">
            игра развивает 🧠 память
            <br />и концентрацию
          </p>
          <p>
            а еще улучшает внимание,
            <br />
            что полезно для всех возрастов 🧒👵
          </p>
          <p className="h5 italic">Альцгеймер подождет!</p>
          <div>
            <Button asChild>
              <Link to="/game">играть →</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="team" className="section team">
        <h4 className="section__title">команда</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 md:max-w-[600px] gap-4">
          <Teammates list={teammates} />
        </div>
      </section>

      <div className="footer">
        проект создан в рамках учебного курса яндекс.практикума в 2024 году
      </div>
    </main>
  )
}
