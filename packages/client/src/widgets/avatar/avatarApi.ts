const BASE_AVATAR_API = `${__API_URL__}/user`

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
