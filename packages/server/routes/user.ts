import { Router } from 'express'
import { getUser, changeUser } from '../controllers/user'

const router = Router()

router.get('/', getUser)
router.post('/set/theme', changeUser)

export default router
