import { Request, Response, NextFunction } from 'express'

export const isAuthenticated = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  // TODO: Продумать логику авторизации
  // console.log('middleware isAuthenticated', req, res)
  next()
}
