import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../processes/auth/model/authSlice'

import ssrReducer from '../slices/ssrSlice'

import { combineReducers } from 'redux'

/* ... */
// Глобально декларируем в window наш ключ
// и задаем ему тип такой же, как у стейта в сторе
declare global {
  interface Window {
    APP_INITIAL_STATE: ReturnType<typeof reducer>
  }
}

export const reducer = combineReducers({
  auth: authReducer,
  ssr: ssrReducer,
})

export type Store = ReturnType<typeof reducer>

const store = configureStore({
  reducer,
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
})
export type AppDispatch = typeof store.dispatch

export default store
