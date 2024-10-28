import { FC } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@shared/components/ui/button'
import { ROUTES } from '@shared/config/routes'

import { ForumListItem } from '../model/types'
import { ForumTable } from './ForumTable'
import { ForumPagination } from './ForumPagination'

const mockForumData: ForumListItem[] = [
  {
    id: 1,
    author: 'арчибальд',
    title: 'как перестать играть и начать жить (никак)',
    date: 1729531467,
  },
  {
    id: 2,
    author: 'алексей',
    title: 'научиться программировать на react за неделю',
    date: 1729631467,
  },
  {
    id: 3,
    author: 'андрюха, по коням',
    title: 'как стать продуктивным в мемори',
    date: 1729731467,
  },
  {
    id: 4,
    author: 'марианна',
    title: 'эти эмодзи сейчас в одной с нами комнате?',
    date: 1729831467,
  },
  {
    id: 5,
    author: 'олег2014',
    title: 'делимся стратегиями игры! запоминать карточки - не предлагать',
    date: 1729931467,
  },
  {
    id: 6,
    author: 'прохор',
    title:
      'у меня подсело зрение и жена ушла, зато я возглавляю лидерборд!))))',
    date: 1730031467,
  },
  {
    id: 7,
    author: 'глеб',
    title: 'не могу уже',
    date: 1730131467,
  },
]

export const ForumPage: FC = () => {
  return (
    <main>
      <div className="grid sm:grid-cols-2 sm:items-center gap-6 mb-12 lg:mb-16">
        <h1 className="m-0">форум</h1>
        <div className="sm:text-right sm:mt-1">
          <Button asChild>
            <Link to={`${ROUTES.FORUM}/${ROUTES.FORUM_ADD}`}>
              создать тему →
            </Link>
          </Button>
        </div>
      </div>
      <ForumTable list={mockForumData} />
      <ForumPagination />
    </main>
  )
}
