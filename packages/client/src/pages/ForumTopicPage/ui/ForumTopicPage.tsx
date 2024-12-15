import { FC } from 'react'
import { Comment, Topic } from '../model/types'
import { Comments } from './Comments'
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
  image: {
    url: 'https://picsum.photos/536/354',
    name: 'some-image.jpg',
  },
  content:
    '<p>сообщение топика</p>\n' +
    '          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias asperiores aspernatur debitis ea eius, eveniet fugiat ipsa libero magni, nihil nostrum numquam perferendis possimus quasi qui sint, totam ut vero!</p>\n' +
    '          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut delectus dicta error, eveniet fuga iure, labore magnam modi natus, nisi quis reiciendis sed veritatis. Alias dolore maxime saepe? Beatae, labore?</p>',
}

const comments: Comment[] = [
  {
    id: 1,
    date: '1729531467',
    author: 'назар',
    message:
      '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda autem laborum porro sed sint sunt? Accusamus beatae, dolorem error esse impedit repudiandae veritatis voluptatum. Dicta illum modi molestias nobis repellendus?</p>',
  },
  {
    id: 2,
    date: '1729531467',
    author: 'александр',
    message:
      '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda autem laborum porro sed sint sunt? Accusamus beatae, dolorem error esse impedit repudiandae veritatis voluptatum. Dicta illum modi molestias nobis repellendus?</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda consequuntur culpa doloribus fuga hic illum ipsam nemo nesciunt nobis, odio perferendis quis quisquam ratione soluta suscipit! Animi cupiditate labore natus.</p>',
  },
  {
    id: 3,
    date: '1729531467',
    author: '0-0',
    message: '<p>nice</p>',
    image: {
      url: 'https://picsum.photos/536/354',
      name: 'some-image.jpg',
    },
  },
  {
    id: 4,
    date: '1729531467',
    author: 'betty',
    message: '<p>🥹</p>',
  },
]

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
      <Message topic={message} />
      <Comments list={comments} />
      <CommentForm />
    </main>
  )
}
