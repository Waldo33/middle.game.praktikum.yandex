import { createSlice } from '@reduxjs/toolkit'
import { logoutThunk, signinThunk, signupThunk } from './thunks'
import {
  Auth,
  RejectedAction,
  initialState,
} from '@processes/user/model/userSlice'
import { userThunk } from '@processes/user/model/thunks'

export interface Signin {
  login: string
  password: string
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signinThunk.pending, state => {
        state.loading = true
        state.error = ''
      })
      .addCase(signinThunk.fulfilled, state => {
        state.loading = false
        state.isAuthenticated = true
      })
      .addCase(signinThunk.rejected, (state, action: RejectedAction) => {
        state.loading = false
        state.error = action.payload
      })

    builder
      .addCase(signupThunk.pending, state => {
        state.loading = true
        state.error = ''
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

    builder
      .addCase(logoutThunk.pending, state => {
        state.loading = true
        state.error = ''
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
