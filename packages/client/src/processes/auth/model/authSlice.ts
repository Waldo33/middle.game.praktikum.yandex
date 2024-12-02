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
  isAuthenticated: boolean
  user: null | User
  error: undefined | string
  loading: boolean
  isFirstAuthCheck: boolean
}

const initialState: Auth = {
  isAuthenticated: false,
  user: null,
  error: '',
  loading: false,
  isFirstAuthCheck: false,
}

interface RejectedAction {
  payload: string | undefined
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    setError: state => {
      state.isAuthenticated = false
    },
    setAuthenticated: state => {
      state.isAuthenticated = true
    },
    setFirstAuthCheck: state => {
      state.isFirstAuthCheck = true
    },
  },
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

export const { setUser, setError, setAuthenticated, setFirstAuthCheck } =
  authSlice.actions

export default authSlice.reducer
