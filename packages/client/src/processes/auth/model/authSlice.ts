import { createSlice } from '@reduxjs/toolkit'
import { logoutThunk, signinThunk, signupThunk, userThunk } from './thunks'
import { Auth } from '@app/store'

const initialState: Auth = {
  isAuthenticated: undefined,
  user: null,
  error: null,
  loading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin(state) {
      state.isAuthenticated = undefined
      state.user = null
    },
    signup(state) {
      state.isAuthenticated = undefined
      state.user = null
    },
    logout(state) {
      state.isAuthenticated = undefined
      state.user = null
    },
  },
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
      .addCase(signinThunk.rejected, (state: any, action) => {
        state.loading = false
        state.error = action.payload
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
      .addCase(signupThunk.rejected, (state: any, action) => {
        state.loading = false
        state.error = action.payload
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
      .addCase(userThunk.rejected, (state: any, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.error = action.payload
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
      .addCase(logoutThunk.rejected, (state: any, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { signin, signup } = authSlice.actions
export default authSlice.reducer
