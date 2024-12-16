import { FC } from 'react'
import { Topic } from '../model/types'
import { Message } from './Message'
import { CommentForm } from './CommentForm'
import { ROUTES } from '@shared/config/routes'
import { Menu } from '@widgets/menu/Menu'
import { getTopicById } from '@processes/forum/api/forumApi'

const topicByIdData = await getTopicById(1)

const message: Topic = {
  title: 'название топика',
  date: 1729531467,
  author: 'арчибальд',
  content:
    '<p>сообщение топика</p>\n' +
    '          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores aspernatur debitis ea eius, eveniet fugiat ipsa libero magni, nihil nostrum numquam perferendis possimus quasi qui sint, totam ut vero!</p>\n' +
    '          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut delectus dicta error, eveniet fuga iure, labore magnam modi natus, nisi quis reiciendis sed veritatis. Alias dolore maxime saepe? Beatae, labore?</p>',

  comments: [
    {
      id: 1,
      author: 'назар',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda autem laborum porro sed sint sunt? Accusamus beatae, dolorem error esse impedit repudiandae veritatis voluptatum. Dicta illum modi molestias nobis repellendus?</p>',
      topicId: 1,
      parentId: 1,
      createdAt: '1729531467',
      updatedAt: '1729531467',
    },
    {
      id: 2,
      author: 'александр',
      content:
        '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda autem laborum porro sed sint sunt? Accusamus beatae, dolorem error esse impedit repudiandae veritatis voluptatum. Dicta illum modi molestias nobis repellendus?</p>',
      topicId: 1,
      parentId: 1,
      createdAt: '1729531467',
      updatedAt: '1729531467',
    },
  ],
}

export const ForumTopicPage: FC = () => {
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
      {topicByIdData?.length ? <Message topic={topicByIdData} /> : ''}
      <CommentForm />
    </main>
  )
}
