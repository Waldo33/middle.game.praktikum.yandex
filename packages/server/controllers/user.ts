import { Request, Response } from 'express'
import { UserService } from '../services/user'
import { USER_ERRORS } from '../models/user'

export class UserController {
  private userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  async getUserTheme(req: Request, res: Response) {
    const { user_id } = req.params

    try {
      const themeId = await this.userService.getUserTheme(Number(user_id))
      return res.status(200).json({ success: true, theme_id: themeId })
    } catch (error) {
      return res.status(404).json({ error: error || USER_ERRORS.NOT_FOUND })
    }
  }

  async changeUserTheme(req: Request, res: Response) {
    const { user_id, theme_id } = req.params

    if (isNaN(Number(user_id)) || isNaN(Number(theme_id))) {
      return res.status(400).json({ error: 'Invalid parameters' })
    }

    try {
      const user = await this.userService.changeUserTheme(
        Number(user_id),
        Number(theme_id)
      )
      return res.status(200).json({ success: true, user })
    } catch (error) {
      return res.status(404).json({ error: error || USER_ERRORS.NOT_FOUND })
    }
  }
}
