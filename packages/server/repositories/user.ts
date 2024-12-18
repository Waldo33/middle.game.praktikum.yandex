import User from '../models/user'

export abstract class UserRepository {
  abstract getUserTheme(userId: number): Promise<number | null>
  abstract changeUserTheme(userId: number, themeId: number): Promise<User>
  abstract getOrCreate(yandexUserId: number): Promise<User>
}

export class SequelizeUserRepository implements UserRepository {
  async getUserTheme(userId: number) {
    const user = await User.findOne({ where: { externalId: String(userId) } })
    return user ? user.themeId : null
  }

  async changeUserTheme(userId: number, themeId: number) {
    const user = await User.findOne({ where: { externalId: String(userId) } })
    if (user) {
      user.themeId = themeId
      await user.save()
      return user
    }

    const newUser = await User.create({ externalId: String(userId), themeId })
    return newUser
  }

  async getOrCreate(userId: number) {
    let user = await User.findOne({ where: { externalId: String(userId) } })

    console.log('getOrCreate:', user)

    if (!user) {
      user = await User.create({
        externalId: String(userId),
        themeId: 1,
      })
    }
    return user
  }
}
