import { createTopic } from '@controllers/topicController'
import { getAllTopics } from '@controllers/topicController'
import { isAuthenticated } from '@middleware/authMiddleware'
import express from 'express'

const router = express.Router()

router.get('/', isAuthenticated, getAllTopics)
router.post('/', isAuthenticated, createTopic)

export default router
