import { sequelize } from '../config/db'
import { DataTypes, Model, Optional } from 'sequelize'
import Topic from './topic'

export const REACTION_ERRORS = {
  MISSINT_TOPIC: 'Missing topic ID',
  ALREADY_EXISTS: 'Reaction already exists',
}

interface ReactionAttributes {
  id: number
  emoji: string
  topicId: string
  userId: string
}

export interface ReactionCreationAttributes
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
      references: {
        model: Topic,
        key: 'id',
      },
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

Reaction.belongsTo(Topic, { foreignKey: 'topicId', as: 'topic' })

export default Reaction
