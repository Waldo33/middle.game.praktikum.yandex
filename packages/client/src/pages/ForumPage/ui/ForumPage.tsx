import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@shared/components/ui/button'
import { ROUTES } from '@shared/config/routes'

import { ForumListItem } from '../model/types'
import { ForumTable } from './ForumTable'
import { ForumPagination } from './ForumPagination'
import { Menu } from '@widgets/menu/Menu'
import { getAllTopics } from '@processes/forum/api/forumApi'

export const ForumPage: FC = () => {
  const [allTopicsData, setAllTopicsData] = useState<ForumListItem[]>([])

  useEffect(() => {
    const fetchAllTopics = async () => {
      const data = await getAllTopics()
      setAllTopicsData(data)
    }

    fetchAllTopics()
  }, [])

  return (
    <main>
      <Menu
        links={[
          { url: ROUTES.INDEX, label: 'на главную' },
          { url: ROUTES.PROFILE, label: 'профиль' },
          { url: ROUTES.LEADERBOARD, label: 'лидерборд' },
          { url: ROUTES.GAME, label: 'играть' },
        ]}
      />
      <div className="grid sm:grid-cols-2 sm:items-center gap-6 my-8 lg:my-12">
        <h1 className="m-0">форум</h1>
        <div className="sm:text-right sm:mt-1">
          <Button asChild>
            <Link to={`${ROUTES.FORUM}/${ROUTES.FORUM_ADD}`}>
              создать тему →
            </Link>
          </Button>
        </div>
      </div>
      {allTopicsData?.length ? <ForumTable list={allTopicsData} /> : ''}
      {/*<ForumPagination />*/}
    </main>
  )
}
