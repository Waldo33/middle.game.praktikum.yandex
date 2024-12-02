import { useSelector } from 'react-redux'
import {
  selectFirstAuthCheck,
  selectIsAuthenticated,
} from '@shared/model/selectors'

export const useAuth = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const isFirstAuthCheck = useSelector(selectFirstAuthCheck)

  return { isAuthenticated, isFirstAuthCheck }
}
