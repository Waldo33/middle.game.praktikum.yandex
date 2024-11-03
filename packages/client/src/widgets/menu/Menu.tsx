import { FC } from 'react'
import { Link } from 'react-router-dom'
import s from './Menu.module.scss'

type MenuItem = {
  url: string
  label: string
}

type MenuProps = {
  links: MenuItem[]
}

export const Menu: FC<MenuProps> = ({ links }) => {
  return (
    <nav className={s['menu']}>
      <ul>
        {links.map(({ url, label }, index) => (
          <li key={index}>
            <Link to={url}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
