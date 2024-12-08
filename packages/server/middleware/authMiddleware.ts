import { Request, Response, NextFunction } from 'express'

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: Продумать логику
  if (!req.headers.authorization) {
    res.status(403).json({ message: 'Forbidden' })
    return
  }
  next()
}
