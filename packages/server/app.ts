import express from 'express'
import cors from 'cors'
import topicRoutes from './routes/topic'
import { sanitizeMiddleware } from './middleware/xss'
import { isAuthenticated } from './middleware/auth'

const app = express()

app.use(cors())
app.use(express.json())
app.use(sanitizeMiddleware)

app.use('/api/topics', isAuthenticated, topicRoutes)

export default app
