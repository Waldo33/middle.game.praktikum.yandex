import { sequelize } from '../config/db'
import { DataTypes, Model, Optional } from 'sequelize'
import Topic from './topic'

export const COMMENT_ERRORS = {
  NOT_FOUND: 'Comment not found',
}

interface CommentAttributes {
  id: number
  author: string
  content: string
  topicId: number
  parentId: number | null
}

export interface CommentCreationAttributes
  extends Optional<CommentAttributes, 'id'> {}

class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  public id!: number
  public author!: string
  public content!: string
  public topicId!: number
  public parentId!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Topic,
        key: 'id',
      },
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Comment,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'comments',
    timestamps: true,
  }
)

Topic.hasMany(Comment, { foreignKey: 'topicId', as: 'comments' })
Comment.belongsTo(Topic, { foreignKey: 'topicId', as: 'topic' })

Comment.hasMany(Comment, { foreignKey: 'parentId', as: 'comments' })
Comment.belongsTo(Comment, { foreignKey: 'parentId', as: 'parent' })

export default Comment
