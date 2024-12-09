import { TopicCreationAttributes } from '../models/topic'
import { CommentRepository } from '../repositories/comment'
import { TopicRepository } from '../repositories/topic'

export class TopicService {
  private topicRepository: TopicRepository
  private commentRepository: CommentRepository

  constructor(
    topicRepository: TopicRepository,
    commentRepository: CommentRepository
  ) {
    this.topicRepository = topicRepository
    this.commentRepository = commentRepository
  }
  async getAllTopics() {
    return this.topicRepository.getAll()
  }

  async getTopicWithCommentsById(topicId: number) {
    const topic = await this.topicRepository.getTopicById(topicId)

    if (!topic) {
      throw new Error('Topic not found')
    }

    const comments = await this.commentRepository.findByTopicId(topicId)
    return {
      ...topic.get(),
      comments,
    }
  }

  async createTopic(topic: TopicCreationAttributes) {
    return this.topicRepository.create(topic)
  }
}
