import { createSlice } from '@reduxjs/toolkit'
import { logoutThunk, signinThunk, signupThunk, userThunk } from './thunks'
import { Auth } from '@app/store'

const initialState: Auth = {
  isAuthenticated: undefined,
  user: null,
  error: null,
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
        state.error = null
      })
      .addCase(signinThunk.fulfilled, state => {
        state.loading = false
        state.isAuthenticated = true
      })
      .addCase(signinThunk.rejected, (state, action: RejectedAction) => {
        console.log('here', action)
        state.loading = false
        state.error = action.payload || 'An unknown error occurred'
      })

    builder
      .addCase(signupThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(signupThunk.fulfilled, state => {
        state.loading = false
        state.isAuthenticated = true
      })
      .addCase(signupThunk.rejected, (state: Auth, action: RejectedAction) => {
        state.loading = false
        state.error = action.payload || 'An unknown error occurred'
      })

    builder
      .addCase(userThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(userThunk.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(userThunk.rejected, (state, action: RejectedAction) => {
        state.loading = false
        state.isAuthenticated = false
        state.error = action.payload || 'An unknown error occurred'
      })

    builder
      .addCase(logoutThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
      })
      .addCase(logoutThunk.rejected, (state, action: RejectedAction) => {
        state.loading = false
        state.error = action.payload || 'An unknown error occurred'
      })
  },
})

export default authSlice.reducer
