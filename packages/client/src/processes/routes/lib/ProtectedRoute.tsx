import { ROUTES } from '@shared/config/routes'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@shared/hooks/useAuth'
import { getUserDataFromLocalStorage } from '../../auth/lib/getUserDataFromLocalStorage'

const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
  const isAuthenticated = useAuth()

  const userDataFromLocalStorage = getUserDataFromLocalStorage()

  if (!navigator.onLine && userDataFromLocalStorage) {
    return element
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGNIN} replace />
  }

  return element
}

export default ProtectedRoute
