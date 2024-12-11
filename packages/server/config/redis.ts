import { createClient } from 'redis'

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
  },
})

redisClient.on('connect', () => {
  console.log('✅ Redis connected')
})

redisClient.on('ready', () => {
  console.log('✅ Redis ready')
})

redisClient.on('error', err => {
  console.error('❌ Redis connection error:', err)
})

const connectRedis = async () => {
  await redisClient.connect()
}

export { redisClient, connectRedis }
