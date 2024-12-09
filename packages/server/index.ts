import dotenv from 'dotenv'
dotenv.config()
import { sequelize } from './config/db'
import app from './app'

;(async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ Database connected successfully')

    await sequelize.sync({ force: true })
    console.log('✅ Database synchronized')

    const port = Number(process.env.SERVER_PORT)

    app.listen(port, () => {
      console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
    })
  } catch (error) {
    console.error('❌ Failed to connect to the database:', error)
  }
})()
