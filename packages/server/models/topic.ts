import { sequelize } from '../config/db'
import { DataTypes, Model, Optional } from 'sequelize'

interface TopicAttributes {
  id: number
  title: string
  content: string
}

interface TopicCreationAttributes extends Optional<TopicAttributes, 'id'> {}

class Topic
  extends Model<TopicAttributes, TopicCreationAttributes>
  implements TopicAttributes
{
  public id!: number
  public title!: string
  public content!: string

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
  },
  {
    sequelize,
    tableName: 'topics',
    timestamps: true,
  }
)

export default Topic
