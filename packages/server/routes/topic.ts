import { TopicController } from '../controllers/topic'
import { isAuthenticated } from '../middleware/auth'
import { SequelizeCommentRepository } from '../repositories/comment'
import { SequelizeTopicRepository } from '../repositories/topic'
import { TopicService } from '../services/topic'
import express from 'express'
import { CommentService } from '../services/comment'
import { CommentController } from '../controllers/comment'

const router = express.Router()

const topicRepository = new SequelizeTopicRepository()
const topicService = new TopicService(topicRepository)
const topicController = new TopicController(topicService)

router.get(
  '/',
  isAuthenticated,
  topicController.getAllTopics.bind(topicController)
)
router.get(
  '/:id',
  isAuthenticated,
  topicController.getTopicById.bind(topicController)
)
router.post(
  '/',
  isAuthenticated,
  topicController.createTopic.bind(topicController)
)

const commentRepository = new SequelizeCommentRepository()
const commentService = new CommentService(commentRepository)
const commentController = new CommentController(commentService)

router.post(
  '/:topicId/comments',
  commentController.create.bind(commentController)
)

router.post(
  '/:topicId/comments/:parentId/comments',
  commentController.create.bind(commentController)
)

export default router
