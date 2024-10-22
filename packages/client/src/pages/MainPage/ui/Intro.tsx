import { FC } from 'react'
import { Button } from '@shared/components/ui/button'
import { Link } from 'react-router-dom'

export const Intro: FC = () => {
  return (
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
  )
}
