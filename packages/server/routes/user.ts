import { Router } from 'express'
import { UserController } from '../controllers/user'
import { SequelizeUserRepository } from '../repositories/user'
import { UserService } from '../services/user'

const router = Router()
const userService = new UserService(new SequelizeUserRepository())
const userController = new UserController(userService)

router.get('/theme', userController.getUserTheme.bind(userController))
router.post(
  '/theme/:theme_id',
  userController.changeUserTheme.bind(userController)
)

export default router
