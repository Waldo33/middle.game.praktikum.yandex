import { sequelize } from '../config/db'
import { DataTypes, Model, Optional } from 'sequelize'

interface ReactionAttributes {
  id: number
  emoji: string
  topicId: string
  userId: string
}

interface ReactionCreationAttributes
  extends Optional<ReactionAttributes, 'id'> {}

class Reaction
  extends Model<ReactionAttributes, ReactionCreationAttributes>
  implements ReactionAttributes
{
  public id!: number
  public emoji!: string
  public topicId!: string
  public userId!: string
}

Reaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    emoji: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'reaction',
    timestamps: false,
  }
)

export default Reaction
