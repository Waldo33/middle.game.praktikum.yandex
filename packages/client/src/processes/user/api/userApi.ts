const BASE_API = `${import.meta.env.VITE_API_URL}`

export interface Password {
  oldPassword: string
  newPassword: string
}

export const user = async () => {
  const response = await fetch(`${BASE_API}/auth/user`, {
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

export const changePassword = async (credentials: Password) => {
  try {
    const response = await fetch(`${BASE_API}/user/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include',
    })
    if (!response.ok) {
      await response.json()
    }
  } catch (err) {
    console.log(err)
  }

  return true
}
