const BASE_AVATAR_API = `${import.meta.env.VITE_API_URL}/user`

export const changeAvatar = async (data: FormData) => {
  const response = await fetch(`${BASE_AVATAR_API}/profile/avatar`, {
    method: 'PUT',
    body: data,
    credentials: 'include',
    mode: 'cors',
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.reason)
  }

  return true
}
