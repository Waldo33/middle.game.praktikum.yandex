import { FC } from 'react'
import s from './ProfilePage.module.scss'
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
import { Entries } from '../types'

export const ProfileData: FC = () => {
  const user = useSelector(selectUser)
  if (!user) return null
  const firstName = user.first_name

  const userDataLabels = {
    login: 'Логин',
    second_name: 'Фамилия',
    display_name: 'Имя на форуме',
    email: 'E-mail',
    phone: 'Телефон',
  }

  const userFormFields = (
    Object.entries(userDataLabels) as Entries<typeof userDataLabels>
  )
    .map(([key, label]) => ({
      value: user[key],
      label,
    }))
    .filter(({ value }) => value !== '')

  return (
    <>
      <div className={s.profile__header}>
        <ProfileAvatar />
        <div className={s.profile__name}>{firstName}</div>
        <Button asChild className="mt-4">
          <Link to="/leaderboard">Лидерборд</Link>
        </Button>
      </div>

      <div className={s.profile__container}>
        <Table>
          <TableBody>
            {userFormFields.map(({ label, value }) => (
              <TableRow key={label}>
                <TableCell className="font-medium">{label}</TableCell>
                <TableCell className="text-right">{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
