import { FC } from 'react'
import { Link } from 'react-router-dom'

export const Menu: FC = () => {
  return (
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
  )
}
