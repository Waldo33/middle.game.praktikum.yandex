import { USER_ERRORS } from '../models/user'
import User from '../models/user'
import { UserRepository } from '../repositories/user'

interface LocalUser {
  id: string | number
  externalId?: string
}

export class UserService {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
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
}

export const checkUser = async (yandexUser: LocalUser) => {
  let res = await User.findOne({ where: { externalId: yandexUser.id } })
  if (!res) {
    res = await User.create({
      externalId: String(yandexUser.id),
      themeId: 1,
    })
  }
  return res.id
}
