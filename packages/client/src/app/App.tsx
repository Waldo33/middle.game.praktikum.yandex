import { Outlet, useLoaderData } from 'react-router-dom'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Toaster } from '../shared/components/ui/toaster'
import { AppDispatch } from './store'
import { User, setUser, setError } from '@processes/auth/model/authSlice'
import { LoadingSpinner } from '@shared/components/ui/loading-spinner'
import { selectAuthLoading } from '@processes/auth/model/selectors'

export const App = () => {
  const dispatch: AppDispatch = useDispatch()
  const userData = useLoaderData() as User | null
  const loading = useSelector(selectAuthLoading)

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData))
    } else {
      dispatch(setError())
    }
  }, [userData, dispatch])

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      {loading ? <LoadingSpinner /> : <Outlet />}
      <Toaster />
    </div>
  )
}
