import { YANDEX_API_URL } from '../../constants'

const BASE_AVATAR_API = `${YANDEX_API_URL}/user`

export const changeAvatar = async (data: FormData) => {
  try {
    const response = await fetch(`${BASE_AVATAR_API}/profile/avatar`, {
      method: 'PUT',
      body: data,
      credentials: 'include',
      mode: 'cors',
    })
    if (!response.ok) {
      await response.json()
    }
  } catch (err) {
    console.log(err)
  }

  return true
}
