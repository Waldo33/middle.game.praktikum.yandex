import { configureStore } from '@reduxjs/toolkit'
import authReducer, { Auth } from '../processes/auth/model/authSlice'

export interface Store {
  auth: Auth
}

export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

export default store
