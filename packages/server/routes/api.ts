import express from 'express'
import topicRoutes from './topic'
import userRoutes from './user'
import { isAuthenticated } from '../middleware/auth'

const router = express.Router()

router.use(isAuthenticated)

router.use('/topics', topicRoutes)
router.use('/user', userRoutes)

export default router
