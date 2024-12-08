import { Request, Response } from 'express'
import { TopicService } from '@services/topic'

const getAllTopics = async (_req: Request, res: Response) => {
  try {
    const topics = await TopicService.getAllTopics()
    res.status(200).json(topics)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

const createTopic = async (_req: Request, _res: Response) => {
  throw new Error('Not implemented')
}

export const TopicController = {
  getAllTopics,
  createTopic,
}
