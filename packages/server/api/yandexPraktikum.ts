import axios from 'axios'

type CookieValue = string | string[] | undefined

interface User {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  avatar: string
  email: string
  phone: string
}

export const getYandexUser = async (
  uuid?: CookieValue,
  authcookie?: CookieValue
): Promise<User> => {
  const { data } = await axios.get<User>(
    `${process.env.YANDEX_API_URL}/auth/user`,
    {
      headers: {
        Cookie: `uuid=${uuid};authCookie=${authcookie};`,
      },
    }
  )
  return data
}
