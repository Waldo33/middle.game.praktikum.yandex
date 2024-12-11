import axios from 'axios'
import { redisClient } from '../config/redis'

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
  const cacheKey = `yandexUser_${uuid}`
  const cachedData = await redisClient.get(cacheKey)

  const parsedCachedData = JSON.parse(cachedData || '')

  if (
    parsedCachedData &&
    typeof parsedCachedData === 'object' &&
    'id' in parsedCachedData
  ) {
    return parsedCachedData as User
  }

  const { data } = await axios.get<User>(
    `${process.env.YANDEX_API_URL}/auth/user`,
    {
      headers: {
        Cookie: `uuid=${uuid};authCookie=${authcookie};`,
      },
    }
  )

  await redisClient.set(cacheKey, JSON.stringify(data), { EX: 60 * 5 })

  return data
}
