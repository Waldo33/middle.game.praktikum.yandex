import { Request, Response } from 'express'
import { UserService } from '../services/user'
import { USER_ERRORS } from '../models/user'
import { RESPONSE_ERRORS } from '../constants'

export class UserController {
  private userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  async getUserTheme(req: Request, res: Response) {
    // @ts-expect-error не смогли победить типы ((
    const { yandex_uuid, yandex_auth_cookie } = req.customParams

    try {
      const yandexUser = await this.userService.getUserFromCache(
        yandex_uuid,
        yandex_auth_cookie
      )

      if (!yandexUser) {
        return res.status(400).json({ error: RESPONSE_ERRORS.INVALID_PARAMS })
      }

      const themeId = await this.userService.getUserTheme(yandexUser.id)
      return res.status(200).json({ theme_id: themeId })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error || USER_ERRORS.NOT_FOUND })
    }
  }

  async changeUserTheme(req: Request, res: Response) {
    // @ts-expect-error
    const { yandex_uuid, yandex_auth_cookie } = req.customParams
    const { theme_id } = req.params

    try {
      const yandexUser = await this.userService.getUserFromCache(
        yandex_uuid,
        yandex_auth_cookie
      )

      console.log('theme_id:', theme_id)

      if (!yandexUser || isNaN(Number(theme_id))) {
        return res.status(400).json({ error: RESPONSE_ERRORS.INVALID_PARAMS })
      }

      const user = await this.userService.changeUserTheme(
        yandexUser.id,
        Number(theme_id)
      )
      return res.status(200).json({ user })
    } catch (error) {
      console.log(error)
      return res.status(404).json({ error: error || USER_ERRORS.NOT_FOUND })
    }
  }
}
