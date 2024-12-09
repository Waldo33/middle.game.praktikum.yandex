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

  async create(comment: CommentCreationAttributes) {
    return this.commentRepository.create(comment)
  }
}
