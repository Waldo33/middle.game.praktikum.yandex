import { Outlet, useLoaderData } from 'react-router-dom'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Toaster } from '@shared/components/ui/toaster'
import { AppDispatch } from './store'
import { User, setUser, setError } from '@processes/user/model/userSlice'

import ErrorBoundary from '@shared/components/ErrorBoundary'

export const App = () => {
  const dispatch: AppDispatch = useDispatch()
  const userData: User | null | unknown = useLoaderData()

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData))
    } else {
      dispatch(setError())
    }
  }, [userData, dispatch])

  return (
    <div className="App">
      <ErrorBoundary>
        <Outlet />
        <Toaster />
      </ErrorBoundary>
    </div>
  )
}
