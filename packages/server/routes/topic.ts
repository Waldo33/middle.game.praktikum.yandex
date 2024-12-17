import { TopicController } from '../controllers/topic'
import { SequelizeCommentRepository } from '../repositories/comment'
import { SequelizeTopicRepository } from '../repositories/topic'
import { TopicService } from '../services/topic'
import express from 'express'
import { CommentService } from '../services/comment'
import { CommentController } from '../controllers/comment'
import { ReactionController } from '../controllers/reaction'
import { ReactionService } from '../services/reaction'
import { SequelizeReactionRepository } from '../repositories/reaction'

const router = express.Router()

const topicRepository = new SequelizeTopicRepository()
const topicService = new TopicService(topicRepository)
const topicController = new TopicController(topicService)

const commentRepository = new SequelizeCommentRepository()
const commentService = new CommentService(commentRepository)
const commentController = new CommentController(commentService)

const reactionRepository = new SequelizeReactionRepository()
const reactionService = new ReactionService(reactionRepository)
const reactionController = new ReactionController(reactionService)

router.get('/', topicController.getAllTopics.bind(topicController))
router.get('/:id', topicController.getTopicById.bind(topicController))
router.post('/', topicController.createTopic.bind(topicController))

router.post(
  '/:topicId/comments',
  commentController.create.bind(commentController)
)

router.post(
  '/:topicId/comments/:parentId/replies',
  commentController.create.bind(commentController)
)

router.post(
  '/:topicId/reactions',
  reactionController.addReaction.bind(reactionController)
)

router.get(
  '/:topicId/reactions',
  reactionController.getReactions.bind(reactionController)
)

export default router
