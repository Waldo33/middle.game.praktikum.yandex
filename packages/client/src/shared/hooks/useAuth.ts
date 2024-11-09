import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '@shared/model/selectors'

export const useAuth = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  return isAuthenticated
}
