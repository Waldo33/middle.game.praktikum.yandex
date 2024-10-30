import { FC } from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shared/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table'

export type Leaderboard = {
  place: number
  playerName: string
  playerAvatar: string
  amount: number
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
          {list.map(({ place, playerName, playerAvatar, amount }) => (
            <TableRow key={place}>
              <TableCell className="font-medium">{place}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Avatar>
                    <AvatarImage src={playerAvatar} />
                    <AvatarFallback>{playerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 flex-auto">{playerName}</div>
                </div>
              </TableCell>
              <TableCell>{amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
