import { createAsyncThunk } from '@reduxjs/toolkit'
import { logout, signin, signup, user } from '../api/authApi'
import { Signin, User } from './authSlice'

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
      return rejectWithValue((err as Error).message)
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
      return rejectWithValue((err as Error).message)
    }
  }
)

export const userThunk = createAsyncThunk<User, void, RejectedValue>(
  'auth/user',
  async (_, { rejectWithValue }) => {
    try {
      const response = await user()
      return response
    } catch (err) {
      return rejectWithValue((err as Error).message)
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
      return rejectWithValue((err as Error).message)
    }
  }
)
