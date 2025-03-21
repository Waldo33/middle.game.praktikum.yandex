import { YANDEX_API_URL } from '../../../constants'

const BASE_PROFILE_API = `${YANDEX_API_URL}/user`

export interface Password {
  oldPassword: string
  newPassword: string
}

export const changePassword = async (credentials: Password) => {
  try {
    const response = await fetch(`${BASE_PROFILE_API}/password`, {
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
