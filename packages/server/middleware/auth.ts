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
    req.params.yandex_uuid = uuid
    req.params.yandex_auth_cookie = authCookie

    // @ts-expect-error
    req.customParams = {
      yandex_login: data.login,
      yandex_userId: String(data.id),
      yandex_uuid: uuid,
      yandex_auth_cookie: authCookie,
    }

    return next()
  } catch (error) {
    return res.status(403).json({ error: 'Unauthorized' })
  }
}
