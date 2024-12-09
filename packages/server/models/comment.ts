import { sequelize } from '../config/db'
import { DataTypes, Model, Optional } from 'sequelize'
import Topic from './topic'

interface CommentAttributes {
  id: number
  author: string
  content: string
  topicId: number
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
  },
  {
    sequelize,
    tableName: 'comments',
    timestamps: true,
  }
)

Topic.hasMany(Comment, { foreignKey: 'topicId', as: 'comments' })
Comment.belongsTo(Topic, { foreignKey: 'topicId', as: 'topic' })

export default Comment
