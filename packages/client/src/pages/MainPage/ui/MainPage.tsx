import { FC } from 'react'
import './MainPage.scss'
import { Route, Rule, Teammate } from '@pages/MainPage/types'
import { Rules } from './Rules'
import { Cta } from './Cta'
import { Teammates } from '@pages/MainPage/ui/Teammates'
import { Intro } from '@widgets/intro/Intro'
import RulesImg1 from '@pages/MainPage/ui/assets/rules-img-1.svg'
import RulesImg2 from '@pages/MainPage/ui/assets/rules-img-2.svg'
import RulesImg3 from '@pages/MainPage/ui/assets/rules-img-3.svg'
import { Button } from '@shared/components/ui/button'
import { Link } from 'react-router-dom'

const rules: Rule[] = [
  {
    imageSrc: RulesImg1,
    imageAlt: 'начало игры',
    text: 'после старта таймера начни открывать пары карточек на игровом поле',
  },
  {
    imageSrc: RulesImg2,
    imageAlt: 'процесс игры',
    text: 'если изображения на карточках совпадают, они остаются открытыми',
  },
  {
    imageSrc: RulesImg3,
    imageAlt: 'конец игры',
    text: 'успей открыть все пары карточек до окончания таймера',
  },
]

const innerRoutes: Route[] = [
  {
    text: 'это твой профиль. новая аватарка каждый день? 🎉  да!',
    link: '/profile',
    linkTitle: 'профиль',
  },
  {
    text: 'а тут наши чемпионы 🏆 нет ли тут тебя?',
    link: '/leaderboard',
    linkTitle: 'лидерборд',
  },
  {
    text: 'есть вопросы? задай их на форуме 🔮   или помогай другим!',
    link: '/forum',
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
  return (
    <main className="index-wrapper">
      <Intro />

      <section id="rules" className="section rules">
        <h2 className="section__title">как играть</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Rules list={rules} />
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
