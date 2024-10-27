import { FC } from 'react'
import { Button } from '@shared/components/ui/button'
import { Link } from 'react-router-dom'
import { Menu } from './Menu'

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
      <Menu />
    </section>
  )
}
