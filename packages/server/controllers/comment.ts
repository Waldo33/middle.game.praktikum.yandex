import { Request, Response } from 'express'
import { CommentService } from '../services/comment'
import { RESPONSE_ERRORS } from '../constants'
import { COMMENT_ERRORS } from '../models/comment'

export class CommentController {
  private commentService: CommentService

  constructor(commentService: CommentService) {
    this.commentService = commentService
  }

  async create(req: Request, res: Response) {
    try {
      const { content } = req.body
      const author = req.params.yandex_login || req.body.author
      const topicId = req.params.topicId

      if (!topicId || !content || !author) {
        return res
          .status(400)
          .json({ error: RESPONSE_ERRORS.MISSING_REQUIRED_FIELDS })
      }

      const parentId = Number(req.params.parentId)
      const isParentExists = this.commentService.isExists(parentId)

      if (parentId && !isParentExists) {
        return res.status(400).json({ error: COMMENT_ERRORS.NOT_FOUND })
      }

      const comment = await this.commentService.create({
        content,
        author,
        topicId: Number(topicId),
        parentId: parentId || null,
      })

      return res.status(200).json(comment)
    } catch (error) {
      return res
        .status(500)
        .json({ error: RESPONSE_ERRORS.INTERNAL_SERVER_ERROR })
    }
  }
}
