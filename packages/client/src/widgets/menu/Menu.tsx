import { FC } from 'react'
import { Link } from 'react-router-dom'
import s from './Menu.module.scss'

type MenuItem = {
  url: string
  label: string
  state?: Record<string, any>
}

type MenuProps = {
  links: MenuItem[]
  center?: boolean
}

export const Menu: FC<MenuProps> = ({ links, center }) => {
  return (
    <nav className={`${s.menu}`}>
      <ul className={center ? s.center : ''}>
        {links.map(({ url, label, state }) => (
          <li key={url}>
            <Link to={url} state={state}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
