import { Request, Response, NextFunction } from 'express'
import { getYandexUser } from '../api/yandexPraktikum'

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uuid, authcookie } = req.headers

    if (!uuid || !authcookie) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    const data = await getYandexUser(uuid, authcookie)

    req.params.yandex_login = data.login
    req.params.yandex_userId = String(data.id)
    return next()
  } catch (error) {
    return res.status(403).json({ error: 'Unauthorized' })
  }
}
