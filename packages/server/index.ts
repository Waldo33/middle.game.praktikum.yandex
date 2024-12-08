import dotenv from 'dotenv'
import { createClientAndConnect } from '@config/db'
import app from './app'

dotenv.config()

const port = Number(process.env.SERVER_PORT) || 3001

;(async () => {
  try {
    await createClientAndConnect()
    console.log('✅ Database connected successfully')

    app.listen(port, () => {
      console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
    })
  } catch (error) {
    console.error('❌ Failed to connect to the database:', error)
  }
})()
