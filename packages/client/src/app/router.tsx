import { ForumPage } from '@pages/ForumPage'
import { ForumTopicPage } from '@pages/ForumTopicPage'
import { GamePage } from '@pages/GamePage'
import { LeaderboardPage } from '@pages/LeaderboardPage'
import { MainPage } from '@pages/MainPage'
import { NotFoundPage } from '@pages/NotFoundPage'
import { ProfilePage } from '@pages/ProfilePage'
import { SignInPage } from '@pages/SignInPage'
import { SignUpPage } from '@pages/SignUpPage'
import ProtectedRoute from '@shared/lib/ProtectedRoute'
import PublicRoute from '@shared/lib/PublicRoute'
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
        element: <PublicRoute element={<SignInPage />} />,
      },
      {
        path: 'signup',
        element: <PublicRoute element={<SignUpPage />} />,
      },
      {
        path: 'profile',
        element: <ProtectedRoute element={<ProfilePage />} />,
      },
      {
        path: 'game',
        element: <ProtectedRoute element={<GamePage />} />,
      },
      {
        path: 'leaderboard',
        element: <ProtectedRoute element={<LeaderboardPage />} />,
      },
      {
        path: 'forum',
        children: [
          {
            index: true,
            element: <ProtectedRoute element={<ForumPage />} />,
          },
          {
            path: ':id',
            element: <ProtectedRoute element={<ForumTopicPage />} />,
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
