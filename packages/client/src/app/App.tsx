import React, { useEffect, useState } from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'

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
import { useOAuthCodeHandle } from '@processes/auth'
import { ThemeSwitcher } from '@widgets/theme/theme'

export const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const userData: User | null | unknown = useLoaderData()
  const { isFirstAuthCheck } = useAuth()

  useOAuthCodeHandle()

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData))
    } else {
      dispatch(setError())
    }
  }, [userData, dispatch])

  usePage({ initPage: initAppPage })

  // apply theme
  const [theme, setTheme] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('theme') : 'default'
  )

  useEffect(() => {
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem('theme')
      setTheme(newTheme)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // update body class
  useEffect(() => {
    if (theme) {
      const body: HTMLBodyElement | null = document.querySelector('body')
      if (body) {
        body.className = ''
        body.classList.add(theme)
      }
    }
  }, [theme])

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
            <ThemeSwitcher />
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
