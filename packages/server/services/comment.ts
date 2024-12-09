import { CommentCreationAttributes } from '../models/comment'
import { CommentRepository } from '../repositories/comment'

export class CommentService {
  private commentRepository: CommentRepository

  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository
  }

  async getAll() {
    return this.commentRepository.getAll()
  }

  async get(id: number) {
    return this.commentRepository.get(id)
  }

  async create(commentDto: CommentCreationAttributes) {
    return this.commentRepository.create(commentDto)
  }
}
