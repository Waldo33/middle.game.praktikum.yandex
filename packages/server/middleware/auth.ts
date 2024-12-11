import { Request, Response, NextFunction } from 'express'
import { getYandexUser } from '../api/yandexPraktikum'
import { getCookies } from '../utils/cookies'
import user from '../models/user'

interface YandexUser {
  id: string | number
  externalId?: string
}

async function getUser(yandexUser: YandexUser) {
  let res = await user.findOne({ where: { externalId: yandexUser.id } })
  if (!res) {
    res = await user.create({
      externalId: String(yandexUser.id),
      themeId: 1,
    })
  }
  return res.id
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uuid, authCookie } = getCookies(req.headers.cookie || '')

    if (!uuid || !authCookie) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    const data = await getYandexUser(uuid, authCookie)

    req.params.yandex_login = data.login
    req.params.yandex_userId = String(data.id)

    const userId = await getUser(data)
    req.params.user_id = String(userId)

    return next()
  } catch (error) {
    return res.status(403).json({ error: 'Unauthorized' })
  }
}
