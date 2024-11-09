import { configureStore } from '@reduxjs/toolkit'
import userReducer, { Auth } from '@processes/user/model/userSlice'

export interface Store {
  auth: Auth
}

export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: {
    auth: userReducer,
  },
})

export default store
