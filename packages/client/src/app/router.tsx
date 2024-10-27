import { ForumPage } from '@pages/ForumPage'
import { ForumTopicPage } from '@pages/ForumTopicPage'
import { ForumAddTopic } from '@pages/ForumAddTopic'
import { GamePage } from '@pages/GamePage'
import { LeaderboardPage } from '@pages/LeaderboardPage'
import { MainPage } from '@pages/MainPage'
import { NotFoundPage } from '@pages/NotFoundPage'
import { ProfilePage } from '@pages/ProfilePage'
import { SignInPage } from '@pages/SignInPage'
import { SignUpPage } from '@pages/SignUpPage'
import { ROUTES } from '@shared/config/routes'
import ProtectedRoute from '@shared/lib/ProtectedRoute'
import PublicRoute from '@shared/lib/PublicRoute'
import { createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { authLoader } from '@processes/auth/api/authApi'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: authLoader,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: ROUTES.SIGNIN,
        element: <PublicRoute element={<SignInPage />} />,
      },
      {
        path: ROUTES.SIGNUP,
        element: <PublicRoute element={<SignUpPage />} />,
      },
      {
        path: ROUTES.PROFILE,
        element: <ProtectedRoute element={<ProfilePage />} />,
      },
      {
        path: ROUTES.GAME,
        element: <ProtectedRoute element={<GamePage />} />,
      },
      {
        path: ROUTES.LEADERBOARD,
        element: <ProtectedRoute element={<LeaderboardPage />} />,
      },
      {
        path: ROUTES.FORUM,
        children: [
          {
            index: true,
            element: <ForumPage />,
          },
          {
            path: ':id',
            element: <ForumTopicPage />,
          },
          {
            path: ROUTES.FORUM_ADD,
            element: <ProtectedRoute element={<ForumAddTopic />} />,
          },
        ],
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFoundPage />,
      },
    ],
  },
])
