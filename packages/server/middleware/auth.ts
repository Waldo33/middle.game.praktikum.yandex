import { Request, Response, NextFunction } from 'express'

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: Продумать логику авторизации
  console.log('middleware isAuthenticated', req, res)
  next()
}
