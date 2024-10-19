import { Signin, User } from '@app/store'

const BASE_AUTH_API = 'https://ya-praktikum.tech/api/v2/auth'

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

  return data
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

  return true
}
