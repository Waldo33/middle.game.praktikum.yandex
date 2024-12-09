import express from 'express'
import cors from 'cors'
import topicRoutes from './routes/topic'
import { sanitizeMiddleware } from './middleware/xss'

const app = express()

app.use(cors())
app.use(express.json())
app.use(sanitizeMiddleware)

app.use('/api/topics', topicRoutes)

export default app
