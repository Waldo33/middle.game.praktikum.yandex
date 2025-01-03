import { createAsyncThunk } from '@reduxjs/toolkit'
import { logout, signin, signup, user } from '../api/authApi'
import { Signin, User } from './authSlice'
import { getErrorMessageOrDefault } from '@shared/lib/errorHelpers'

interface RejectedValue {
  rejectValue: string
}

export const signinThunk = createAsyncThunk<boolean, Signin, RejectedValue>(
  'auth/signin',
  async (values, { rejectWithValue }) => {
    try {
      const response = await signin(values)
      return response
    } catch (err) {
      return rejectWithValue(getErrorMessageOrDefault(err))
    }
  }
)

export const signupThunk = createAsyncThunk<boolean, User, RejectedValue>(
  'auth/signup',
  async (values, { rejectWithValue }) => {
    try {
      const response = await signup(values)
      return response
    } catch (err) {
      return rejectWithValue(getErrorMessageOrDefault(err))
    }
  }
)

export const userThunk = createAsyncThunk<User, any, RejectedValue>(
  'auth/user',
  async (_: void, { rejectWithValue }) => {
    try {
      const userData = await user()
      return userData
    } catch (err) {
      return rejectWithValue(getErrorMessageOrDefault(err))
    }
  }
)

export const logoutThunk = createAsyncThunk<boolean, void, RejectedValue>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logout()
      return response
    } catch (err) {
      return rejectWithValue(getErrorMessageOrDefault(err))
    }
  }
)
