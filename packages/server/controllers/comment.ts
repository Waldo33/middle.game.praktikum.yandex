import { Request, Response } from 'express'
import { CommentService } from '../services/comment'

export class CommentController {
  private commentService: CommentService

  constructor(commentService: CommentService) {
    this.commentService = commentService
  }

  async getByTopicId(req: Request, res: Response) {
    try {
      const { topicId } = req.query

      if (!topicId) {
        return res.status(400).json({ error: 'Missing required fields' })
      }

      const comments = await this.commentService.getAll()
      return res.status(200).json(comments)
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { content, author } = req.body
      const topicId = req.params.topicId

      if (!topicId || !content || !author) {
        return res.status(400).json({ error: 'Missing required fields' })
      }

      const parentId = Number(req.params.parentId) || null
      const parentComment = await this.commentService.get(Number(parentId))

      console.log(content, author, topicId, parentId, parentComment)

      if (parentId && !parentComment) {
        return res.status(400).json({ error: 'Parent comment not found' })
      }

      const comment = await this.commentService.create({
        content,
        author,
        topicId: Number(topicId),
        parentId,
      })

      return res.status(200).json(comment)
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
