import Topic from '../models/topic'

export abstract class TopicRepository {
  abstract getAll(): Promise<Topic[]>
}

export class SequelizeTopicRepository implements TopicRepository {
  async getAll() {
    return await Topic.findAll()
  }
}
