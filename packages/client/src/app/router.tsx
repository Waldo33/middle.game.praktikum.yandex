import { ForumPage } from '@pages/ForumPage'
import { ForumTopicPage } from '@pages/ForumTopicPage'
import { GamePage } from '@pages/GamePage'
import { LeaderboardPage } from '@pages/LeaderboardPage'
import { MainPage } from '@pages/MainPage'
import { NotFoundPage } from '@pages/NotFoundPage'
import { ProfilePage } from '@pages/ProfilePage'
import { SignInPage } from '@pages/SignInPage'
import { SignUpPage } from '@pages/SignUpPage'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'game',
        element: <GamePage />,
      },
      {
        path: 'leaderboard',
        element: <LeaderboardPage />,
      },
      {
        path: 'forum',
        children: [
          {
            index: true,
            element: <ForumPage />,
          },
          {
            path: ':id',
            element: <ForumTopicPage />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
