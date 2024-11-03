import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '@processes/auth/model/selectors'

export const useAuth = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  return isAuthenticated
}
