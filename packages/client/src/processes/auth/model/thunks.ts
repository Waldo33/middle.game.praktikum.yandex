import { createAsyncThunk } from '@reduxjs/toolkit'
import { logout, signin, signup, user } from '../api/authApi'
import { Signin, User } from '@app/store'

export const signinThunk: any = createAsyncThunk(
  'auth/signin',
  async (values: Signin, { rejectWithValue }) => {
    try {
      const response = await signin(values)
      return response
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

export const signupThunk: any = createAsyncThunk(
  'auth/signup',
  async (values: User, { rejectWithValue }) => {
    try {
      const response = await signup(values)
      return response
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

export const userThunk: any = createAsyncThunk(
  'auth/user',
  async (_, { rejectWithValue }) => {
    try {
      const response = await user()
      return response
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)

export const logoutThunk: any = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logout()
      return response
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)
