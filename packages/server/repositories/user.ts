import User from '../models/user'

export abstract class UserRepository {
  abstract getUserTheme(userId: number): Promise<number | null>
  abstract changeUserTheme(userId: number, themeId: number): Promise<User>
}

export class SequelizeUserRepository implements UserRepository {
  async getUserTheme(userId: number) {
    const user = await User.findByPk(userId)
    return user ? user.themeId : null
  }

  async changeUserTheme(userId: number, themeId: number) {
    const user = await User.findByPk(userId)
    if (user) {
      user.themeId = themeId
      await user.save()
      return user
    } else {
      throw new Error('User not found')
    }
  }
}
