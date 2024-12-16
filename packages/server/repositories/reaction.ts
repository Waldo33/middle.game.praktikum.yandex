import sequelize from 'sequelize'
import Reaction, { ReactionCreationAttributes } from '../models/reaction'

export abstract class ReactionRepository {
  abstract getReactions(topicId: number): Promise<Reaction[]>
  abstract create(reaction: ReactionCreationAttributes): Promise<Reaction>
  abstract getExistingReaction(
    reaction: ReactionCreationAttributes
  ): Promise<Reaction | null>
}

export class SequelizeReactionRepository implements ReactionRepository {
  async create(reaction: ReactionCreationAttributes) {
    return await Reaction.create(reaction)
  }

  async getReactions(topicId: number) {
    return await Reaction.findAll({
      where: { topicId },
      attributes: [
        'emoji',
        [sequelize.fn('COUNT', sequelize.col('emoji')), 'count'],
      ],
      group: ['emoji'],
    })
  }

  async getExistingReaction(reaction: ReactionCreationAttributes) {
    return await Reaction.findOne({
      where: reaction,
    })
  }
}
