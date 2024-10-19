import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { selectIsAuthenticated } from '@processes/auth/model/selectors'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userThunk } from '@processes/auth/model/thunks'
import { LoadingSpinner } from '@shared/components/ui/loading-spinner'
import { Toaster } from '../components/ui/toaster'
import { AppDispatch } from './store'

export const App = () => {
  const dispatch: AppDispatch = useDispatch()
  const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
    dispatch(userThunk())
  }, [dispatch])

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      {isAuthenticated === undefined ? (
        <LoadingSpinner />
      ) : (
        <RouterProvider router={router} />
      )}
      <Toaster />
    </div>
  )
}
