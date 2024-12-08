import { Sequelize } from 'sequelize'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

export const sequelize = new Sequelize(
  POSTGRES_DB as string,
  POSTGRES_USER as string,
  POSTGRES_PASSWORD as string,
  {
    host: 'localhost',
    port: Number(POSTGRES_PORT),
    dialect: 'postgres',
    logging: false,
  }
)
