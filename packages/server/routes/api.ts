import express from 'express'
import topicRoutes from './topic'
import { isAuthenticated } from '../middleware/auth'

const router = express.Router()

router.use(isAuthenticated)

router.use('/topics', topicRoutes)

export default router
