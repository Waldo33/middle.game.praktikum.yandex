// /src/processes/auth/api/authApi.js

const API_DOMAIN = 'https://ya-praktikum.tech/api/v2/auth'

export const signin = async (credentials: any) => {
  const response = await fetch(`${API_DOMAIN}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error('Failed to log in')
  }

  const data = await response.json()
  return data
}

export const signup = async (credentials: any) => {
  const response = await fetch(`${API_DOMAIN}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error('Failed to log in')
  }

  const data = await response.json()
  return data
}

export const user = async (credentials: any) => {
  const response = await fetch(`${API_DOMAIN}/user`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error('Failed to log in')
  }

  const data = await response.json()
  return data
}
