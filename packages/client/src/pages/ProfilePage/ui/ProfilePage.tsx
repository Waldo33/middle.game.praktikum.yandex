import { FC } from 'react'
import './ProfilePage.scss'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shared/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@shared/components/ui/table'
import { Camera } from 'lucide-react'

export const ProfilePage: FC = () => {
  return (
    <div className="profile">
      <div className="profile__header">
        <label className="profile__file">
          <Avatar className="profile__avatar">
            <AvatarImage src="https://avatars.githubusercontent.com/u/5285425" />
            <AvatarFallback>FF</AvatarFallback>
          </Avatar>
          <div className="profile__file-hover">
            <Camera color="white" size={48} />
          </div>
          <input type="file" name="file" />
        </label>
        <div className="profile__name">ВаняВася</div>
      </div>

      <Table className="profile__table">
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Имя</TableCell>
            <TableCell className="text-right">Иван</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Фамилия</TableCell>
            <TableCell className="text-right">Иванов</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Логин</TableCell>
            <TableCell className="text-right">ivan</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">E-mail</TableCell>
            <TableCell className="text-right">sdgrgtrg@mail.ru</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <a href="/leaderboard">Лидерборд</a>
    </div>
  )
}
