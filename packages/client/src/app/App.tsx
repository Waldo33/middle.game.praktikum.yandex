import { Outlet, useLoaderData, useSearchParams } from 'react-router-dom'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Toaster } from '@shared/components/ui/toaster'
import { AppDispatch } from './store'
import { User, setUser, setError } from '@processes/auth/model/authSlice'

import ErrorBoundary from '@shared/components/ErrorBoundary'
import { signinWithOauthToken } from '@processes/auth/api/authApi'

export const App = () => {
  const dispatch: AppDispatch = useDispatch()
  const userData: User | null | unknown = useLoaderData()

  const [params, setParams] = useSearchParams()

  const signin = async (code: string) => {
    await signinWithOauthToken(
      code,
      `${window.location.protocol}//${window.location.host}`
    )
    setParams('')
  }

  useEffect(() => {
    const oAuthCode = params.get('code')

    if (oAuthCode) {
      signin(oAuthCode)
    }
  }, [params])

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
