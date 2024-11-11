import { User } from '../model/authSlice'

export const getUserDataFromLocalStorage = () => {
  const userJSON = localStorage.getItem('user')
  const userData = JSON.parse(userJSON || '{}') as User

  if (!Object.hasOwn(userData, 'id')) {
    return null
  }

  return userData
}