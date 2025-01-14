import { YANDEX_API_URL } from '../../../constants'

export const BASE_LEADERBOARD_API = `${YANDEX_API_URL}/leaderboard`

export interface UserLeaderboardBasicProps {
  bestScore: number
  login: string | undefined
  avatar?: string
}

export interface UserLeaderboardProps {
  data: UserLeaderboardBasicProps
  ratingFieldName: string
}

export interface LeaderboardProps {
  ratingFieldName: string
  cursor: number
  limit: number
}

export const addUserToLeaderboard = async (
  id: number | undefined,
  login: string | undefined,
  avatar: string | undefined
) => {
  const bestScore = Number(localStorage.getItem(`score-${id}`) || 0)
  const credentialsResultGame: UserLeaderboardProps = {
    data: {
      bestScore,
      login: login,
      avatar: avatar,
    },
    ratingFieldName: 'bestScore',
  }

  try {
    const response = await fetch(`${BASE_LEADERBOARD_API}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentialsResultGame),
      credentials: 'include',
    })
    if (!response.ok) {
      await response.json()
    }
  } catch (err) {
    console.log(err)
  }

  return true
}

export const getLeaderboard = async () => {
  const credentialsResultValues: LeaderboardProps = {
    ratingFieldName: 'bestScore',
    cursor: 0,
    limit: 10,
  }

  try {
    const response = await fetch(`${BASE_LEADERBOARD_API}/all`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentialsResultValues),
      credentials: 'include',
    })

    return await response.json()
  } catch (err) {
    console.log(err)
    return null
  }
}
