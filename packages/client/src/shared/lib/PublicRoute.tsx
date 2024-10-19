import { selectIsAuthenticated } from '@processes/auth/model/selectors'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ element }: { element: React.ReactElement }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/game" replace />
  }

  return element
}

export default PublicRoute
