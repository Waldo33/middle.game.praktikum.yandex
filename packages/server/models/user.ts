import { sequelize } from '../config/db'
import { DataTypes, Model, Optional } from 'sequelize'
import Theme from './theme'

export const USER_ERRORS = {
  NOT_FOUND: 'User not found',
  THEME_NOT_FOUND: 'Theme not found',
}

interface UserAttributes {
  id: number
  externalId: string
  themeId: number | null
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number
  public externalId!: string
  public themeId!: number | null
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    externalId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    themeId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      references: {
        model: Theme,
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
  }
)

User.belongsTo(Theme, { foreignKey: 'themeId', as: 'theme' })
Theme.hasMany(User, { foreignKey: 'themeId', as: 'users' })

export default User
