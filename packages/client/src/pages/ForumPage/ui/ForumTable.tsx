import { FC } from 'react'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table'
import { ForumTopicList } from '../types'

export const ForumTable: FC<ForumTopicList> = ({ list }) => {
  return (
    <>
      <Table>
        <TableHeader className="hidden sm:table-header-group">
          <TableRow>
            <TableHead>тема и автор</TableHead>
            <TableHead className="sm:text-right">дата обновления</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map(item => (
            <TableRow key={item.id}>
              <TableCell>
                <Link
                  to={`/forum/${item.id}`}
                  className="underline underline-offset-2 hover:no-underline">
                  {item.title}
                </Link>
                <small className="block text-gray-500">{item.author}</small>
              </TableCell>
              <TableCell className="text-xs text-gray-500 align-top sm:text-right">
                {new Date(item.date).toLocaleString('ru-RU')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
