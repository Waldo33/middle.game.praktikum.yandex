import { sequelize } from '../config/db'
import { DataTypes, Model, Optional } from 'sequelize'

interface ThemeAttributes {
  id: number
  name: string
}

interface ThemeCreationAttributes extends Optional<ThemeAttributes, 'id'> {}

class Theme
  extends Model<ThemeAttributes, ThemeCreationAttributes>
  implements ThemeAttributes
{
  public id!: number
  public name!: string
}

Theme.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'themes',
    timestamps: false,
  }
)

export default Theme
