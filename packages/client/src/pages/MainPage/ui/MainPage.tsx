import { FC } from 'react'
import './MainPage.scss'

import { Button } from '@shared/components/ui/button'
import { Card, CardContent, CardHeader } from '@shared/components/ui/card'

import RulesImg1 from './assets/rules-img-1.svg'
import RulesImg2 from './assets/rules-img-2.svg'
import RulesImg3 from './assets/rules-img-3.svg'

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
              <a href="/signup">играть →</a>
            </Button>
          </div>
          <nav className="intro__nav">
            <ul>
              <li>
                <a href="/profile">профиль</a>
              </li>
              <li className="">&middot;</li>
              <li>
                <a href="/leaderboard">лидерборд</a>
              </li>
              <li className="">&middot;</li>
              <li>
                <a href="/forum">форум</a>
              </li>
            </ul>
          </nav>
        </section>
        <section id="rules" className="section rules">
          <h2 className="section__title">как играть</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="rules__item">
              <CardHeader className="text-center pt-8">
                <img
                  src={RulesImg1}
                  alt="начало игры"
                  className="rules__item_img"
                />
              </CardHeader>
              <CardContent className="text-center pb-8">
                <p>
                  после старта таймера начни открывать пары карточек на игровом
                  поле
                </p>
              </CardContent>
            </Card>
            <Card className="rules">
              <CardHeader className="text-center pt-8">
                <img
                  src={RulesImg2}
                  alt="процесс игры"
                  className="rules__item_img"
                />
              </CardHeader>
              <CardContent className="text-center">
                <p>
                  если изображения на карточках совпадают, они остаются
                  открытыми
                </p>
              </CardContent>
            </Card>
            <Card className="rules">
              <CardHeader className="text-center pt-8">
                <img
                  src={RulesImg3}
                  alt="конец игры"
                  className="rules__item_img"
                />
              </CardHeader>
              <CardContent className="text-center pb-8">
                <p>успей открыть все пары карточек до окончания таймера</p>
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="section cta">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <p>
                  это твой профиль.
                  <br />
                  новая аватарка каждый день? 🎉 да!
                </p>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <a href="/profile">профиль →</a>
                </Button>
              </CardContent>
            </Card>
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <p>а тут наши чемпионы 🏆 нет ли тут тебя?</p>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <a href="/leaderboard">лидерборд →</a>
                </Button>
              </CardContent>
            </Card>
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <p>
                  есть вопросы? задай их на форуме 🔮 интересно, что будоражит
                  умы наших игроков?
                </p>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <a href="/forum">форум →</a>
                </Button>
              </CardContent>
            </Card>
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
                <a href="/signup">играть →</a>
              </Button>
            </div>
          </div>
        </section>
        <section id="team" className="section team">
          <h4 className="section__title">команда</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 md:max-w-[600px] gap-4">
            <Card className="team__item">
              <CardHeader>
                <div className="team__item_img">[img]</div>
              </CardHeader>
              <CardContent>
                <p className="team__item_title">Николай Галицкий</p>
                <p className="team__item_descr">тим-лид, пишет код</p>
              </CardContent>
            </Card>
            <Card className="team__item">
              <CardHeader>
                <div className="team__item_img">[img]</div>
              </CardHeader>
              <CardContent>
                <p className="team__item_title">Мария Углова</p>
                <p className="team__item_descr">пишет код, изучает react</p>
              </CardContent>
            </Card>
            <Card className="team__item">
              <CardHeader>
                <div className="team__item_img">[img]</div>
              </CardHeader>
              <CardContent>
                <p className="team__item_title">Анна Хлыстова</p>
                <p className="team__item_descr">пишет код, изучает react</p>
              </CardContent>
            </Card>
            <Card className="team__item">
              <CardHeader>
                <div className="team__item_img">[img]</div>
              </CardHeader>
              <CardContent>
                <p className="team__item_title">Евгений Церковников</p>
                <p className="team__item_descr">пишет код, изучает бэкенд</p>
              </CardContent>
            </Card>
          </div>
        </section>
        <div className="footer">
          проект создан в рамках учебного курса яндекс.практикума в 2024 году
        </div>
      </main>
    </div>
  )
}
