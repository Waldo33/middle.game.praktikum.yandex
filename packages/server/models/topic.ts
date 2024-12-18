import { sequelize } from '../config/db'
import { DataTypes, Model, Optional } from 'sequelize'

export const TOPIC_ERRORS = {
  NOT_FOUND: 'Topic not found',
}

interface TopicAttributes {
  id: number
  title: string
  content: string
  author: string
}

export interface TopicCreationAttributes
  extends Optional<TopicAttributes, 'id'> {}

class Topic
  extends Model<TopicAttributes, TopicCreationAttributes>
  implements TopicAttributes
{
  public id!: number
  public title!: string
  public content!: string
  public author!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Topic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'topics',
    timestamps: true,
  }
)

export default Topic
