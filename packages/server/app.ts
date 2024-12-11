import express from 'express'
import cors from 'cors'
import apiRoutes from './routes/api'
import { sanitizeMiddleware } from './middleware/xss'
import { loggerMiddleware } from './middleware/logger'

const app = express()

app.use(cors())
app.use(express.json())
app.use(sanitizeMiddleware)
app.use(loggerMiddleware)

app.use('/api', apiRoutes)

export default app
