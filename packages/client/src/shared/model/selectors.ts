import { Store } from '@app/store'

export const selectIsAuthenticated = (state: Store) =>
  state.auth.isAuthenticated
export const selectUser = (state: Store) => state.auth.user
export const selectAuthLoading = (state: Store) => state.auth.loading
export const selectAuthError = (state: Store) => state.auth.error
export const selectFirstAuthCheck = (state: Store) =>
  state.auth.isFirstAuthCheck
