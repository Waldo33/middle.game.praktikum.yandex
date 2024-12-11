import { Request, Response } from 'express'
import { TopicService } from '../services/topic'
import { RESPONSE_ERRORS } from '../constants'
import { TOPIC_ERRORS } from '../models/topic'
import { redisClient } from '../config/redis'

export class TopicController {
  private topicService: TopicService
  private topicsCacheKey: string
  private redisClient: typeof redisClient

  constructor(topicService: TopicService) {
    this.topicService = topicService
    this.topicsCacheKey = 'topics'
    this.redisClient = redisClient
  }

  async getAllTopics(_req: Request, res: Response) {
    try {
      const cachedTopics = await this.redisClient.get(this.topicsCacheKey)

      if (cachedTopics) {
        return res.status(200).json(JSON.parse(cachedTopics))
      }

      const topics = await this.topicService.getAllTopics()

      this.redisClient.set(this.topicsCacheKey, JSON.stringify(topics))

      return res.status(200).json(topics)
    } catch (error) {
      return res
        .status(500)
        .json({ error: RESPONSE_ERRORS.INTERNAL_SERVER_ERROR })
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

      this.redisClient.del(this.topicsCacheKey)

      return res.status(200).json(topic)
    } catch (error) {
      return res
        .status(500)
        .json({ error: RESPONSE_ERRORS.INTERNAL_SERVER_ERROR })
    }
  }
}
