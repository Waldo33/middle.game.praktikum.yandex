import axios from 'axios'
import NodeCache from 'node-cache'
import user from '../models/user'

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

interface LocalUser {
  id: string | number
  externalId?: string
}

const cache = new NodeCache({ stdTTL: 60 * 5 })

export const getYandexUser = async (
  uuid?: CookieValue,
  authcookie?: CookieValue
): Promise<User> => {
  const cacheKey = `yandexUser_${uuid}`
  const cachedData = cache.get<User>(cacheKey)

  if (cachedData) {
    return cachedData
  }

  const { data } = await axios.get<User>(
    `${process.env.YANDEX_API_URL}/auth/user`,
    {
      headers: {
        Cookie: `uuid=${uuid};authCookie=${authcookie};`,
      },
    }
  )

  cache.set(cacheKey, data)

  return data
}

export const checkUser = async (yandexUser: LocalUser) => {
  let res = await user.findOne({ where: { externalId: yandexUser.id } })
  if (!res) {
    res = await user.create({
      externalId: String(yandexUser.id),
      themeId: 1,
    })
  }
  return res.id
}
