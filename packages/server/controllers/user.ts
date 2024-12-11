import { Request, Response } from 'express'
import User from '../models/user'
import { RESPONSE_ERRORS } from '../constants'

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user_id } = req.params

  try {
    const user = await User.findByPk(user_id)

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: RESPONSE_ERRORS.USER_NOT_FOUND })
    }

    return res.status(200).json({ success: true, user })
  } catch (error) {
    return res.status(404).json({ error })
  }
}

export const changeUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user_id, theme_id } = req.params

  try {
    const user = await User.findByPk(user_id)
    if (user) {
      user.themeId = Number(theme_id)
      await user.save()
    } else {
      throw new Error(RESPONSE_ERRORS.USER_NOT_FOUND)
    }

    return res.status(200).json({ success: true, user })
  } catch (error) {
    return res.status(404).json({ error })
  }
}
