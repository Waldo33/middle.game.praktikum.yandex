import { Request, Response, NextFunction } from 'express'
import { xssSanitize } from '../utils/xssSanitize'

export const sanitizeMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  req.body = xssSanitize(req.body)
  req.query = xssSanitize(req.query)
  req.params = xssSanitize(req.params)
  next()
}
