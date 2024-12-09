import { Request, Response } from 'express'
import { TopicService } from '../services/topic'

export class TopicController {
  private topicService: TopicService

  constructor(topicService: TopicService) {
    this.topicService = topicService
  }

  async getAllTopics(_req: Request, res: Response) {
    try {
      const topics = await this.topicService.getAllTopics()
      res.status(200).json(topics)
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  async getTopicById(req: Request, res: Response) {
    try {
      const topicId = Number(req.params.id)

      if (!topicId) {
        return res.status(400).json({ error: 'Missing required fields' })
      }

      const topic = await this.topicService.getTopicWithCommentsById(
        Number(topicId)
      )
      return res.status(200).json(topic)
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  async createTopic(req: Request, res: Response) {
    try {
      const { title, content, author } = req.body

      if (!title || !content || !author) {
        return res.status(400).json({ error: 'Missing required fields' })
      }

      const topic = await this.topicService.createTopic({
        title,
        content,
        author,
      })
      return res.status(200).json(topic)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
