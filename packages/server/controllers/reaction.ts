import { REACTION_ERRORS } from '../models/reaction'
import { RESPONSE_ERRORS } from '../constants'
import { ReactionService } from '../services/reaction'
import { Request, Response } from 'express'

export class ReactionController {
  private reactionService: ReactionService

  constructor(reactionService: ReactionService) {
    this.reactionService = reactionService
  }

  async getReactions(req: Request, res: Response) {
    try {
      const { topicId } = req.params

      if (!topicId) {
        return res.status(400).json({ error: REACTION_ERRORS.MISSINT_TOPIC })
      }

      const reactions = await this.reactionService.getAll(Number(topicId))

      return res.status(200).json(reactions)
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ error: RESPONSE_ERRORS.INTERNAL_SERVER_ERROR })
    }
  }

  async addReaction(req: Request, res: Response) {
    try {
      const { topicId } = req.params
      const { emoji } = req.body
      // @ts-expect-error подумать как доработать типы
      const userId = req.customParams.yandex_userId

      if (!topicId || !emoji) {
        return res
          .status(400)
          .json({ error: RESPONSE_ERRORS.MISSING_REQUIRED_FIELDS })
      }

      const existingReaction = await this.reactionService.isReactionExists({
        topicId,
        userId,
        emoji,
      })

      if (existingReaction) {
        return res.status(400).json({ error: REACTION_ERRORS.ALREADY_EXISTS })
      }

      const reaction = await this.reactionService.createReaction({
        topicId,
        userId,
        emoji,
      })

      return res.status(201).json(reaction)
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ error: RESPONSE_ERRORS.INTERNAL_SERVER_ERROR })
    }
  }
}
