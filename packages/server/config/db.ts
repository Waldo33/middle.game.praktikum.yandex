import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
  database: process.env.POSTGRES_DB || '',
  username: process.env.POSTGRES_USER || '',
  password: process.env.POSTGRES_PASSWORD || '',
  host: process.env.POSTGRES_HOST || '',
  port: Number(process.env.POSTGRES_PORT || '5432'),
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
})
