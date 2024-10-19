import { FC } from 'react'
import './MainPage.scss'

import { Link } from 'react-router-dom'
import { Button } from '@shared/components/ui/button'
import { Card, CardContent, CardHeader } from '@shared/components/ui/card'

import RulesImg1 from './assets/rules-img-1.svg'
import RulesImg2 from './assets/rules-img-2.svg'
import RulesImg3 from './assets/rules-img-3.svg'

const rules = [
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

const innerRoutes = [
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

const teammates = [
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
    <div className="index-wrapper">
      <main>
        <section className="intro">
          <h1 className="intro__title">
            <span>привет,</span> username
          </h1>
          <div className="intro__score">
            <div className="intro__score_num">42</div>
            <div className="intro__score_descr">твой счет</div>
          </div>
          <div className="intro__btn">
            <Button asChild>
              <Link to="/game">играть →</Link>
            </Button>
          </div>
          <nav className="intro__nav">
            <ul>
              <li>
                <Link to="/profile">профиль</Link>
              </li>
              <li className="">&middot;</li>
              <li>
                <Link to="/leaderboard">лидерборд</Link>
              </li>
              <li className="">&middot;</li>
              <li>
                <Link to="/forum">форум</Link>
              </li>
            </ul>
          </nav>
        </section>
        <section id="rules" className="section rules">
          <h2 className="section__title">как играть</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rules.map(({ imageSrc, imageAlt, text }) => (
              <Card className="rules__item">
                <CardHeader className="text-center pt-8">
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="rules__item_img"
                  />
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <p>{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="section cta">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {innerRoutes.map(({ text, link, linkTitle }) => (
              <Card className="flex flex-col justify-between">
                <CardHeader>
                  <p>{text}</p>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                    <Link to={link}>{linkTitle} →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section id="why" className="section why">
          <h3 className="section__title text-primary">зачем играть</h3>
          <div className="why__descr">
            <p className="why__descr_title">
              игра развивает 🧠 память
              <br />и концентрацию
            </p>
            <p>
              а еще улучшает внимание,
              <br />
              что полезно для всех возрастов 🧒👵
            </p>
            <p className="why__descr_post">Альцгеймер подождет!</p>
            <div className="mt-8">
              <Button asChild>
                <Link to="/game">играть →</Link>
              </Button>
            </div>
          </div>
        </section>
        <section id="team" className="section team">
          <h4 className="section__title">команда</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 md:max-w-[600px] gap-4">
            {teammates.map(({ name, about, imageAlt, imageSrc }) => (
              <Card className="team__item" key={name}>
                <CardHeader>
                  <div className="team__item_img">
                    {imageSrc ? (
                      <img src={imageSrc} alt={imageAlt} />
                    ) : (
                      imageAlt
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="team__item_title">{name}</p>
                  <p className="team__item_descr">{about}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <div className="footer">
          проект создан в рамках учебного курса яндекс.практикума в 2024 году
        </div>
      </main>
    </div>
  )
}
