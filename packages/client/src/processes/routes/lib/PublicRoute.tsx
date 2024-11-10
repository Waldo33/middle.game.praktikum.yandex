import { selectIsAuthenticated } from '@shared/model/selectors'
import { ROUTES } from '@shared/config/routes'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ element }: { element: React.ReactElement }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  if (isAuthenticated) {
    return <Navigate to={ROUTES.GAME} replace />
  }

  return element
}

export default PublicRoute
