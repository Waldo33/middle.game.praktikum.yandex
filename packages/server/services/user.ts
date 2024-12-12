import { USER_ERRORS } from '../models/user'
import { UserRepository } from '../repositories/user'

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
