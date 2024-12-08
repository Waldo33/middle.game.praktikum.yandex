import express from 'express'
import cors from 'cors'
import topicRoutes from '@routes/topic'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/topics', topicRoutes)

export default app
