import { ReactionCreationAttributes } from '../models/reaction'
import { TOPIC_ERRORS } from '../models/topic'
import { ReactionRepository } from '../repositories/reaction'

export class ReactionService {
  private reactionRepository: ReactionRepository

  constructor(topicRepository: ReactionRepository) {
    this.reactionRepository = topicRepository
  }

  async isReactionExists(reactionDto: ReactionCreationAttributes) {
    return this.reactionRepository.getExistingReaction(reactionDto)
  }

  async getAll(topicId: number) {
    const topic = await this.reactionRepository.getReactions(topicId)

    if (!topic) {
      throw new Error(TOPIC_ERRORS.NOT_FOUND)
    }

    return topic
  }

  async createReaction(reactionDto: ReactionCreationAttributes) {
    return this.reactionRepository.create(reactionDto)
  }
}
