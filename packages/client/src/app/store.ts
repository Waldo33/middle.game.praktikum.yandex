import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../processes/auth/model/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

export default store
