import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Topic } from '../model/types'
import { Message } from './Message'
import { CommentForm } from './CommentForm'
import { ROUTES } from '@shared/config/routes'
import { Menu } from '@widgets/menu/Menu'
import { getTopicById } from '@processes/forum/api/forumApi'

export const ForumTopicPage: FC = () => {
  const routeParams = useParams(),
    currentRouteParam = routeParams.id
  const [topicByIdData, setTopicByIdData] = useState<Topic>()

  useEffect(() => {
    const fetchTopicById = async () => {
      const data = await getTopicById(Number(currentRouteParam))
      setTopicByIdData(data)
    }

    fetchTopicById()
  }, [])

  return (
    <main>
      <Menu
        links={[
          { url: ROUTES.INDEX, label: 'на главную' },
          { url: ROUTES.PROFILE, label: 'профиль' },
          { url: ROUTES.LEADERBOARD, label: 'лидерборд' },
          { url: ROUTES.GAME, label: 'играть' },
          { url: ROUTES.FORUM, label: 'форум' },
        ]}
      />
      {topicByIdData ? <Message topic={topicByIdData} /> : ''}
      <CommentForm />
    </main>
  )
}
