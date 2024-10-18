import { createSlice } from '@reduxjs/toolkit'
import { signinThunk } from './thunks'

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  error: null,
  loading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false
      state.token = null
      state.user = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signinThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(signinThunk.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.token = action.payload.token
        state.user = action.payload.user
      })
      .addCase(signinThunk.rejected, (state: any, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
