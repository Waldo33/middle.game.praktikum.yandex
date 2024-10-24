import { FC } from 'react'
import './ProfilePage.scss'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@shared/components/ui/table'
import { ProfileAvatar } from './ProfileAvatar'
import { Link } from 'react-router-dom'
import { Button } from '@shared/components/ui/button'
import { useSelector } from 'react-redux'
import { selectUser } from '@processes/auth/model/selectors'

export const ProfileData: FC = () => {
  const user = useSelector(selectUser),
    login = user?.login,
    firstName = user?.first_name,
    secondName = user?.second_name,
    displayName = user?.display_name,
    email = user?.email,
    phone = user?.phone

  return (
    <>
      <div className="profile__header">
        <ProfileAvatar />
        <div className="profile__name">{firstName}</div>
        <Button asChild className="mt-4">
          <Link to="/leaderboard">Лидерборд</Link>
        </Button>
      </div>

      <div className="profile__container">
        <Table>
          <TableBody>
            {login && (
              <TableRow>
                <TableCell className="font-medium">Логин</TableCell>
                <TableCell className="text-right">{login}</TableCell>
              </TableRow>
            )}
            {secondName && (
              <TableRow>
                <TableCell className="font-medium">Фамилия</TableCell>
                <TableCell className="text-right">{secondName}</TableCell>
              </TableRow>
            )}
            {displayName && (
              <TableRow>
                <TableCell className="font-medium">Имя на форуме</TableCell>
                <TableCell className="text-right">{displayName}</TableCell>
              </TableRow>
            )}
            {email && (
              <TableRow>
                <TableCell className="font-medium">E-mail</TableCell>
                <TableCell className="text-right">{email}</TableCell>
              </TableRow>
            )}
            {phone && (
              <TableRow>
                <TableCell className="font-medium">Телефон</TableCell>
                <TableCell className="text-right">{phone}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
