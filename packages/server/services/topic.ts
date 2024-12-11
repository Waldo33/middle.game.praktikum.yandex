import { TOPIC_ERRORS, TopicCreationAttributes } from '../models/topic'
import { TopicRepository } from '../repositories/topic'

export class TopicService {
  private topicRepository: TopicRepository

  constructor(topicRepository: TopicRepository) {
    this.topicRepository = topicRepository
  }

  async getAllTopics() {
    return this.topicRepository.getAll()
  }

  async getTopicWithComments(topicId: number) {
    const topic = await this.topicRepository.getTopicWithComments(topicId)

    if (!topic) {
      throw new Error(TOPIC_ERRORS.NOT_FOUND)
    }

    return topic
  }

  async createTopic(topicDto: TopicCreationAttributes) {
    return this.topicRepository.create(topicDto)
  }
}
