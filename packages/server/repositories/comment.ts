import Comment from '../models/comment'
import { CommentCreationAttributes } from '../models/comment'

export abstract class CommentRepository {
  abstract create(comment: CommentCreationAttributes): Promise<Comment>
  abstract getAll(): Promise<Comment[]>
  abstract get(id: number): Promise<Comment | null>
}

export class SequelizeCommentRepository implements CommentRepository {
  async create(comment: CommentCreationAttributes) {
    return await Comment.create(comment)
  }
  async getAll() {
    return await Comment.findAll()
  }

  async get(id: number) {
    return await Comment.findByPk(id)
  }
}
