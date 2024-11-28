import { ForumAddTopic } from '@pages/ForumAddTopic'
import { ForumPage } from '@pages/ForumPage'
import { ForumTopicPage } from '@pages/ForumTopicPage'
import { GamePage } from '@pages/GamePage'
import { LeaderboardPage } from '@pages/LeaderboardPage'
import { MainPage } from '@pages/MainPage'
import { NotFoundPage } from '@pages/NotFoundPage'
import { ProfilePage } from '@pages/ProfilePage'
import { SignInPage } from '@pages/SignInPage'
import { SignUpPage } from '@pages/SignUpPage'
import { authLoader } from '@processes/auth/api/authApi'
import ProtectedRoute from '@processes/routes/lib/ProtectedRoute'
import PublicRoute from '@processes/routes/lib/PublicRoute'
import { ROUTES } from '@shared/config/routes'
import {
  RouteObject,
  createBrowserRouter,
  createMemoryRouter,
} from 'react-router-dom'

import { App, initAppPage } from './App'
import { AppDispatch, Store } from './store'
import { initNotFoundPage } from '@pages/NotFoundPage/ui/NotFoundPage'

export type PageInitContext = {
  clientToken?: string
}

export type PageInitArgs = {
  dispatch: AppDispatch
  state: Store
  ctx: PageInitContext
}

const createRouter = (routes: RouteObject[]) => {
  if (typeof window !== 'undefined') {
    return createBrowserRouter(routes)
  }

  return createMemoryRouter(routes)
}

export const routes = [
  {
    path: '/',
    element: <App />,
    loader: authLoader,
    fetchData: initAppPage,
    children: [
      {
        index: true,
        element: <ProtectedRoute element={<MainPage />} />,
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
        fetchData: initNotFoundPage,
      },
    ],
  },
]
export const router = createRouter(routes)
