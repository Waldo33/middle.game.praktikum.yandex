import { TopicController } from '@controllers/topic'
import { isAuthenticated } from '@middleware/auth'
import express from 'express'

const router = express.Router()

router.get('/', isAuthenticated, TopicController.getAllTopics)
router.post('/', isAuthenticated, TopicController.createTopic)

export default router
