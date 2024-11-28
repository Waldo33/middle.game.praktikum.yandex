import React from 'react'

import { Outlet, useLoaderData } from 'react-router-dom'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Toaster } from '@shared/components/ui/toaster'
import { AppDispatch } from './store'
import { User, setUser, setError } from '@processes/auth/model/authSlice'

import ErrorBoundary from '@shared/components/ErrorBoundary'
import { selectUser } from '@shared/model/selectors'
import { userThunk } from '@processes/auth/model/thunks'
import { PageInitArgs } from './router'
import { usePage } from '@shared/hooks/usePage'
import { LoadingSpinner } from '@shared/components/ui/loading-spinner'
import { useAuth } from '@shared/hooks/useAuth'

export const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const userData: User | null | unknown = useLoaderData()
  const { isFirstAuthCheck } = useAuth()

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData))
    } else {
      dispatch(setError())
    }
  }, [userData, dispatch])

  usePage({ initPage: initAppPage })

  return (
    <>
      {!isFirstAuthCheck && (
        <LoadingSpinner
          style={{ position: 'absolute', top: '50%', left: '50%' }}
          className="loader"
          size={40}
        />
      )}
      {isFirstAuthCheck && (
        <div className="App">
          <ErrorBoundary>
            <Outlet />
            <Toaster />
          </ErrorBoundary>
        </div>
      )}
    </>
  )
}

export const initAppPage = ({ dispatch, state, ctx }: PageInitArgs) => {
  const queue: Array<Promise<unknown>> = []
  if (!selectUser(state)) {
    queue.push(dispatch(userThunk(ctx.clientToken)))
  }
  return Promise.all(queue)
}
