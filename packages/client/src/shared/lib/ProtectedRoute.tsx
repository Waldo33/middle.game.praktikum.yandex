import { selectIsAuthenticated } from '@processes/auth/model/selectors'
import { ROUTES } from '@shared/config/routes'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGNIN} replace />
  }

  return element
}

export default ProtectedRoute
