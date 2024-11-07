import { createAsyncThunk } from '@reduxjs/toolkit'
import { user } from '../api/userApi'
import { User } from './userSlice'
import { getErrorMessageOrDefault } from '@shared/lib/errorHelpers'

interface RejectedValue {
  rejectValue: string
}

export const userThunk = createAsyncThunk<User, void, RejectedValue>(
  'auth/user',
  async (_, { rejectWithValue }) => {
    try {
      const response = await user()
      return response
    } catch (err) {
      return rejectWithValue(getErrorMessageOrDefault(err))
    }
  }
)
