import express from 'express'
import topicRoutes from './topic'
import { isAuthenticated } from '../middleware/auth'

const router = express.Router()

router.use('/topics', isAuthenticated, topicRoutes)

export default router
