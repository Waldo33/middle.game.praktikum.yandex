import { createSlice } from '@reduxjs/toolkit'
import { userThunk } from './thunks'

export interface User {
  id?: number
  first_name: string
  second_name: string
  display_name?: string
  login: string
  email: string
  password: string
  phone: string
  avatar?: string
  reason?: string
}

export interface Auth {
  isAuthenticated: boolean
  user: null | User
  error: undefined | string
  loading: boolean
}

export const initialState: Auth = {
  isAuthenticated: false,
  user: null,
  error: '',
  loading: false,
}

export interface RejectedAction {
  payload: string | undefined
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    setError: state => {
      state.isAuthenticated = false
    },
  },
  extraReducers: builder => {
    builder
      .addCase(userThunk.pending, state => {
        state.loading = true
        state.error = ''
      })
      .addCase(userThunk.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(userThunk.rejected, (state, action: RejectedAction) => {
        state.loading = false
        state.isAuthenticated = false
        state.error = action.payload
      })
  },
})

export const { setUser, setError } = userSlice.actions

export default userSlice.reducer
