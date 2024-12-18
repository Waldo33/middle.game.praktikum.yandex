import { createLogger, format, transports } from 'winston'
import expressWinston from 'express-winston'

const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message, meta }) => {
    const metaString = meta ? JSON.stringify(meta) : ''
    return `${timestamp} [${level.toUpperCase()}]: ${message} ${metaString}`
  })
)

const logger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
})

const errorLoggerMiddleware = expressWinston.errorLogger({
  winstonInstance: logger,
})

const loggerMiddleware = expressWinston.logger({
  winstonInstance: logger,
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: false,
  ignoreRoute: () => false,
})

export { loggerMiddleware, errorLoggerMiddleware }
