import { FC } from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table'
import { Leaderboard } from '@pages/LeaderboardPage/types'
import { Intro } from '@pages/MainPage/ui/Intro'
import { LeaderboardBody } from '@pages/LeaderboardPage/ui/LeaderboardBody'

const players: Leaderboard[] = [
  {
    place: 1,
    playerName: 'username1',
    playerAvatar: 'https://github.com/shadcn.png',
    amount: 2500,
  },
  {
    place: 2,
    playerName: 'username2',
    playerAvatar: 'https://avatars.githubusercontent.com/u/3218960',
    amount: 2000,
  },
  {
    place: 3,
    playerName: 'username3',
    playerAvatar: 'https://avatars.githubusercontent.com/u/104268071',
    amount: 1500,
  },
  {
    place: 4,
    playerName: 'username4',
    playerAvatar: 'https://avatars.githubusercontent.com/u/835489',
    amount: 1000,
  },
  {
    place: 5,
    playerName: 'username5',
    playerAvatar: 'https://avatars.githubusercontent.com/u/5285425',
    amount: 500,
  },
]

export const LeaderboardPage: FC = () => {
  return (
    <main className="index-wrapper">
      <Intro />
      <h1>Лидерборд</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Игрок</TableHead>
            <TableHead className="w-[150px]">Счет</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <LeaderboardBody list={players} />
        </TableBody>
      </Table>
    </main>
  )
}
