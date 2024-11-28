import { FC } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table'
import { AvatarWidget } from '@widgets/avatar/avatar'
import s from '@pages/LeaderboardPage/ui/LeaderboardPage.module.scss'

export type Leaderboard = {
  login: string
  avatar?: string
  bestScore: number
}

export type LeaderboardListProps = {
  list: Leaderboard[]
}

export const LeaderboardTable: FC<LeaderboardListProps> = ({ list }) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Игрок</TableHead>
            <TableHead className="w-[150px]">Счет</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map(({ login, avatar, bestScore }, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <div className={s['cell']}>
                  <AvatarWidget login={login} avatar={avatar} />
                  <div className="ml-4 flex-auto">{login}</div>
                </div>
              </TableCell>
              <TableCell>{bestScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
