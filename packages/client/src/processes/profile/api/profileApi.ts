const BASE_PROFILE_API = `${import.meta.env.VITE_API_URL}/user`

export interface Password {
  oldPassword: string
  newPassword: string
}

export const changePassword = async (credentials: Password) => {
  const response = await fetch(`${BASE_PROFILE_API}/password`, {
    method: 'PUT',
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
