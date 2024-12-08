import { TopicController } from '@controllers/topic'
import { isAuthenticated } from '@middleware/auth'
import { SequelizeTopicRepository } from '@repositories/topic'
import { TopicService } from '@services/topic'
import express from 'express'

const router = express.Router()

const topicRepository = new SequelizeTopicRepository()
const topicService = new TopicService(topicRepository)
const topicController = new TopicController(topicService)

router.get('/', isAuthenticated, topicController.getAllTopics)

export default router
