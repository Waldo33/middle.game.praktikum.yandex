import { TopicRepository } from '../repositories/topic'

export class TopicService {
  private repository: TopicRepository

  constructor(repository: TopicRepository) {
    this.repository = repository
  }
  async getAllTopics() {
    return this.repository.getAll()
  }
}
