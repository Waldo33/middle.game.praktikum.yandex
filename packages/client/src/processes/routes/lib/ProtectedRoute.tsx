import { ROUTES } from '@shared/config/routes'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@shared/hooks/useAuth'

const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
  const isAuthenticated = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGNIN} replace />
  }

  return element
}

export default ProtectedRoute
