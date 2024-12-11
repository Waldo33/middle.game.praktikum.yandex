import { Request, Response } from 'express'
import { TopicService } from '../services/topic'
import { RESPONSE_ERRORS } from '../constants'
import { TOPIC_ERRORS } from '../models/topic'

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
      res.status(500).json({ error: RESPONSE_ERRORS.INTERNAL_SERVER_ERROR })
    }
  }

  async getTopicById(req: Request, res: Response) {
    try {
      const topicId = Number(req.params.id)

      if (!topicId) {
        return res
          .status(400)
          .json({ error: RESPONSE_ERRORS.MISSING_REQUIRED_FIELDS })
      }

      const topic = await this.topicService.getTopicWithComments(
        Number(topicId)
      )

      return res.status(200).json(topic)
    } catch (error: unknown) {
      if (error instanceof Error && error.message === TOPIC_ERRORS.NOT_FOUND) {
        return res.status(404).json({ error: TOPIC_ERRORS.NOT_FOUND })
      }

      return res
        .status(500)
        .json({ error: RESPONSE_ERRORS.INTERNAL_SERVER_ERROR })
    }
  }

  async createTopic(req: Request, res: Response) {
    try {
      const { title, content } = req.body
      const author = req.params.yandex_login || req.body.author

      if (!title || !content || !author) {
        return res
          .status(400)
          .json({ error: RESPONSE_ERRORS.MISSING_REQUIRED_FIELDS })
      }

      const topic = await this.topicService.createTopic({
        title,
        content,
        author,
      })
      return res.status(200).json(topic)
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ error: RESPONSE_ERRORS.INTERNAL_SERVER_ERROR })
    }
  }
}
