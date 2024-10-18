// /src/processes/auth/model/thunks.js

import { createAsyncThunk } from '@reduxjs/toolkit'
import { signin, signup, user } from '../api/authApi'

export const signinThunk: any = createAsyncThunk(
  'auth/signin',
  async (values: any, { rejectWithValue }) => {
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
  async (values: any, { rejectWithValue }) => {
    try {
      const response = await signup(values)
      return response
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  }
)
