import Topic, { TopicCreationAttributes } from '../models/topic'

export abstract class TopicRepository {
  abstract getAll(): Promise<Topic[]>
  abstract create(topic: TopicCreationAttributes): Promise<Topic>
  abstract getTopicById(topicId: number): Promise<Topic | null>
}

export class SequelizeTopicRepository implements TopicRepository {
  async getAll() {
    return await Topic.findAll()
  }

  async create(topic: TopicCreationAttributes) {
    return await Topic.create(topic)
  }

  async getTopicById(topicId: number) {
    return await Topic.findByPk(topicId)
  }
}
