import { Request, Response, NextFunction } from 'express'
import { getYandexUser } from '../api/yandexPraktikum'
import { getCookies } from '../utils/cookies'

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
    return next()
  } catch (error) {
    return res.status(403).json({ error: 'Unauthorized' })
  }
}
