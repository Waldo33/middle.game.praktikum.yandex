import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../processes/auth/model/authSlice'

export interface Signin {
  login: string
  password: string
}

export interface User {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  password: string
  phone: string
  avatar: string
  reason?: string
}

export interface Auth {
  isAuthenticated: undefined | boolean
  user: null | User
  error: null | string
  loading: boolean
}
export interface Store {
  auth: Auth
}

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

export default store
