import { Request, Response } from 'express'
import { TopicService } from '../services/topic'

export class TopicController {
  private service: TopicService

  constructor(service: TopicService) {
    this.service = service
  }

  async getAllTopics(_req: Request, res: Response) {
    try {
      const topics = await this.service.getAllTopics()
      res.status(200).json(topics)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}
