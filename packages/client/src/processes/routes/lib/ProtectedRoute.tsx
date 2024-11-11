import { ROUTES } from '@shared/config/routes'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@shared/hooks/useAuth'
import { useSelector } from 'react-redux'
import { selectUser } from '@shared/model/selectors'

const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
  const isAuthenticated = useAuth()
  const user = useSelector(selectUser)

  if (!navigator.onLine && user) {
    return element
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGNIN} replace />
  }

  return element
}

export default ProtectedRoute
