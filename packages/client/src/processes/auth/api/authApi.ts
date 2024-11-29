import { setAuthenticated, Signin, User } from '../model/authSlice'
import store from '@app/store'

export const BASE_AUTH_API = `${import.meta.env.VITE_API_URL}/auth`

export const signin = async (credentials: Signin) => {
  const response = await fetch(`${BASE_AUTH_API}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include',
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.reason)
  }

  return true
}

export const signup = async (credentials: User) => {
  const response = await fetch(`${BASE_AUTH_API}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include',
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.reason)
  }

  return true
}

export const getOAuthServiceId = async (redirectUri: string) => {
  try {
    const apiUrl = new URL(
      `${import.meta.env.VITE_API_URL}/oauth/yandex/service-id`
    )
    apiUrl.searchParams.set('redirect_url', redirectUri)

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const data = (await response.json()) as { service_id: string }

    if (data) {
      return data.service_id
    }

    throw new Error('Error getOAuthServiceId')
  } catch (error) {
    return
  }
}

export const signinWithOauthToken = async (
  code: string,
  redirectUri: string
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/oauth/yandex`,
      {
        method: 'POST',
        body: JSON.stringify({ code, redirect_uri: redirectUri }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    )

    if (!response.ok) {
      throw new Error('Error in signinWithOauthToken')
    }

    return true
  } catch (error) {
    return false
  }
}

export const logout = async () => {
  const response = await fetch(`${BASE_AUTH_API}/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.reason)
  }

  localStorage.removeItem('user')

  return true
}

export const user = async () => {
  const response = await fetch(`${BASE_AUTH_API}/user`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.reason)
  }

  localStorage.setItem('user', JSON.stringify(data))

  return data as User
}

export const authLoader = async () => {
  try {
    const data = await user()
    store.dispatch(setAuthenticated())
    return data
  } catch (error) {
    return null
  }
}
