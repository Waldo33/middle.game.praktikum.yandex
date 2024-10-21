import { createSlice } from '@reduxjs/toolkit'
import { logoutThunk, signinThunk, signupThunk, userThunk } from './thunks'

export interface Signin {
  login: string
  password: string
}

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
  isAuthenticated: undefined | boolean
  user: null | User
  error: undefined | string
  loading: boolean
}

const initialState: Auth = {
  isAuthenticated: undefined,
  user: null,
  error: undefined,
  loading: false,
}

interface RejectedAction {
  payload: string | undefined
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signinThunk.pending, state => {
        state.loading = true
        state.error = undefined
      })
      .addCase(signinThunk.fulfilled, state => {
        state.loading = false
        state.isAuthenticated = true
      })
      .addCase(signinThunk.rejected, (state, action: RejectedAction) => {
        console.log('here', action)
        state.loading = false
        state.error = action.payload
      })

    builder
      .addCase(signupThunk.pending, state => {
        state.loading = true
        state.error = undefined
      })
      .addCase(signupThunk.fulfilled, state => {
        state.loading = false
        state.isAuthenticated = true
      })
      .addCase(signupThunk.rejected, (state: Auth, action: RejectedAction) => {
        state.loading = false
        state.error = action.payload
      })

    builder
      .addCase(userThunk.pending, state => {
        state.loading = true
        state.error = undefined
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

    builder
      .addCase(logoutThunk.pending, state => {
        state.loading = true
        state.error = undefined
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
      })
      .addCase(logoutThunk.rejected, (state, action: RejectedAction) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default authSlice.reducer
