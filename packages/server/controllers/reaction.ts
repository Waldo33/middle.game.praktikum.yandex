import sequelize from 'sequelize'
import Reaction from '../models/reaction'
import { RESPONSE_ERRORS } from '../constants'

export class ReactionController {
  async getReactions(req, res) {
    try {
      const { topicId } = req.params

      if (!topicId) {
        return res.status(400).json({ error: 'Missing topic ID' })
      }

      const reactions = await Reaction.findAll({
        where: { topicId },
        attributes: [
          'emoji',
          [sequelize.fn('COUNT', sequelize.col('emoji')), 'count'],
        ],
        group: ['emoji'],
      })

      return res.status(200).json(reactions)
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ error: RESPONSE_ERRORS.INTERNAL_SERVER_ERROR })
    }
  }

  async addReaction(req, res) {
    try {
      const { topicId } = req.params
      const { emoji } = req.body
      const userId = req.user.id

      if (!topicId || !emoji) {
        return res
          .status(400)
          .json({ error: RESPONSE_ERRORS.MISSING_REQUIRED_FIELDS })
      }

      const existingReaction = await Reaction.findOne({
        where: { topicId, userId, emoji },
      })

      if (existingReaction) {
        return res.status(400).json({ error: 'Reaction already exists' })
      }

      const reaction = await Reaction.create({
        topicId,
        emoji,
        userId,
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
