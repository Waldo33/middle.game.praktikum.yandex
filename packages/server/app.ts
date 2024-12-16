import express from 'express'
import cors from 'cors'
import apiRoutes from './routes/api'
import { sanitizeMiddleware } from './middleware/xss'
import { loggerMiddleware, errorLoggerMiddleware } from './middleware/logger'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
app.use(express.json())
app.use(sanitizeMiddleware)
app.use(loggerMiddleware)

app.use('/api', apiRoutes)

app.use(errorLoggerMiddleware)

export default app
