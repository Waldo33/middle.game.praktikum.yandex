import { FC } from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shared/components/ui/avatar'
import { TableCell, TableRow } from '@shared/components/ui/table'
import { LeaderboardListProps } from '@pages/LeaderboardPage/types'

export const LeaderboardBody: FC<LeaderboardListProps> = ({ list }) => {
  return (
    <>
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
    </>
  )
}
