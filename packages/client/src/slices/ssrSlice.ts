import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Store } from '../app/store'

export interface SsrState {
  pageHasBeenInitializedOnServer: boolean
}

const initialState: SsrState = {
  pageHasBeenInitializedOnServer: false,
}

export const ssrSlice = createSlice({
  name: 'ssr',
  initialState,
  reducers: {
    setPageHasBeenInitializedOnServer: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.pageHasBeenInitializedOnServer = payload
    },
  },
})

export const selectPageHasBeenInitializedOnServer = (state: Store) =>
  state.ssr.pageHasBeenInitializedOnServer

export const { setPageHasBeenInitializedOnServer } = ssrSlice.actions

export default ssrSlice.reducer
