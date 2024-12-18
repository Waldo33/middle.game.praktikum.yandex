import { USER_ERRORS } from '../models/user'
import User from '../models/user'
// import { User as TUser } from '../api/yandexPraktikum'
import { UserRepository } from '../repositories/user'
import { getYandexUser } from '../api/yandexPraktikum'

export class UserService {
  private userRepository: UserRepository
  // private getYandexUser: (uuid?: CookieValue, authcookie?: CookieValue) => Promise<TUser>

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
    // this.getYandexUser = getYandexUser
  }

  async getUserFromCache(uuid: string, authCookie: string) {
    const yandex_user = await getYandexUser(uuid, authCookie)
    return yandex_user || null
  }

  async getUserTheme(userId: number) {
    const themeId = await this.userRepository.getUserTheme(userId)
    if (themeId === null) {
      throw new Error(USER_ERRORS.THEME_NOT_FOUND)
    }

    return themeId
  }

  async changeUserTheme(userId: number, themeId: number) {
    return this.userRepository.changeUserTheme(userId, themeId)
  }

  async checkUser(yandexUser: User) {
    return this.userRepository.getOrCreate(yandexUser.id)
  }
}
